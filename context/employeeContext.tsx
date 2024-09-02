"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { EmployeeListType } from "@/app/(application)/layout";
import { ProjectListType } from "@/components/columns";
import { MetricsType } from "@/components/metrics";
import { ProgressDataType } from "@/components/overallProgress";
import { ProjectWorkloadDataType } from "@/components/projectWorkload";
import { TaskListType } from "@/components/taskList";
import { NoteDataType } from "@/components/noteTabContent";
import { EmployeeSignInDetailsType } from "@/actions/auth-action";
import { getEmployeeByEmployeeIdAction, getEmployeeList } from "@/actions/employee";
import { verifyAuthAction } from "@/actions/auth-action";
import { useRouter } from "next/navigation";
import { getMetricsAction, getProjectAction, getProgressAction, getTaskListAssignedToMeAction, getTaskListAssignedByMeAction, getProjectWorkloadAction } from "@/actions/dashboard";
import { getNoteContentAction } from "@/actions/task";

type EmployeeContextProps = {
  employeeList: EmployeeListType[];
  project: ProjectListType[];
  metrics: MetricsType[];
  progress: ProgressDataType[];
  projectWorkloadList: ProjectWorkloadDataType[];
  task: TaskListType[];
  taskList: TaskListType[];
  employeeId: string;
  organisationId: string;
  employeeDetails: EmployeeSignInDetailsType;
  note: NoteDataType;
  isLoading: boolean;
};

const EmployeeContext = createContext<EmployeeContextProps | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [employeeList, setEmployeeList] = useState<EmployeeListType[]>([]);
  const [project, setProject] = useState<ProjectListType[]>([]);
  const [metrics, setMetrics] = useState<MetricsType[]>([]);
  const [progress, setProgress] = useState<ProgressDataType[]>([]);
  const [projectWorkloadList, setProjectWorkloadList] = useState<ProjectWorkloadDataType[]>([]);
  const [task, setTask] = useState<TaskListType[]>([]);
  const [taskList, setTaskList] = useState<TaskListType[]>([]);
  const [employeeId, setEmployeeId] = useState("");
  const [organisationId, setOrganisationId] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState<EmployeeSignInDetailsType>({
    id: "",
    organisation_id: "",
    employee_name: "",
    employee_email: "",
    job_title: "",
  });
  const [note, setNote] = useState<NoteDataType>({
    id: 0,
    organisation_id: "",
    employee_id: "",
    note: "",
  });
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndFetchApplicationData = async () => {
      const result = await verifyAuthAction();
      if (!result.user) {
        router.push("/");
        return;
      }

      const employee_id = result.user.id;
      const employeeDetails = await getEmployeeByEmployeeIdAction(employee_id);
      const organisation_id = employeeDetails.organisation_id;

      // Fetch all necessary data in parallel
      const [employeeList, metrics, project, progress, taskListAssignedByMe, taskListAssignedToMe, projectWorkload, note] = await Promise.all([getEmployeeList(organisation_id), getMetricsAction(organisation_id), getProjectAction(organisation_id), getProgressAction(organisation_id), getTaskListAssignedByMeAction(organisation_id, employee_id), getTaskListAssignedToMeAction(organisation_id, employee_id), getProjectWorkloadAction(organisation_id), getNoteContentAction(organisation_id, employee_id)]);

      setIsLoading(false);

      // Update state
      setEmployeeId(employee_id);
      setOrganisationId(organisation_id);
      setEmployeeDetails(employeeDetails);
      setEmployeeList(employeeList);
      setMetrics(metrics);
      setProject(project);
      setProgress(progress);

      // Assign names to tasks
      const taskWithNames = taskListAssignedByMe.map((task) => ({
        ...task,
        assigned_to_name: employeeList.find((employee) => employee.id === task.assigned_to)?.employee_name || "Unknown",
      }));

      setTask(taskWithNames);
      setTaskList(taskListAssignedToMe);
      setProjectWorkloadList(projectWorkload);
      setNote(note);
    };

    checkAuthAndFetchApplicationData();
  }, []);

  console.log(organisationId, employeeId, employeeDetails, metrics, project, progress, task, taskList, projectWorkloadList, employeeList);

  useEffect(() => {
    const channel_employee_list = supabase
      .channel("create-project-form-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "employee" }, (payload) => {
        const newEmployee = payload.new as EmployeeListType;

        setEmployeeList((prevEmployee) => {
          let updatedEmployeeList;

          switch (payload.eventType) {
            case "INSERT":
              updatedEmployeeList = [newEmployee, ...prevEmployee];
              break;
            case "UPDATE":
              updatedEmployeeList = prevEmployee.map((employee) => (employee.id === newEmployee.id ? newEmployee : employee));
              break;
            case "DELETE":
              updatedEmployeeList = prevEmployee.filter((employee) => employee.id !== payload.old.id);
              break;
            default:
              updatedEmployeeList = prevEmployee;
          }
          return updatedEmployeeList;
        });
      })
      .subscribe();

    const channel_project = supabase
      .channel("project-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "project" }, (payload) => {
        const newProject = payload.new as ProjectListType;

        setProject((prevProjects) => {
          let updatedProjects;
          switch (payload.eventType) {
            case "INSERT":
              updatedProjects = [newProject, ...prevProjects];
              break;
            case "UPDATE":
              updatedProjects = prevProjects.map((project) => (project.project_id === newProject.project_id ? newProject : project));
              break;
            case "DELETE":
              updatedProjects = prevProjects.filter((project) => project.project_id !== payload.old.project_id);
              break;
            default:
              updatedProjects = prevProjects;
          }
          return updatedProjects;
        });
      })
      .subscribe();

    const channel_metrics = supabase
      .channel("metric-channel")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "metric" }, (payload) => {
        const newMetric = payload.new as MetricsType;

        setMetrics((prevMetrics) => {
          let updatedMetrics;

          updatedMetrics = prevMetrics.map((metric) => (metric.metric_id === newMetric.metric_id ? newMetric : metric));

          return updatedMetrics;
        });
      })
      .subscribe();

    const channel_progress = supabase
      .channel("progress-channel")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "progress" }, (payload) => {
        const newProgress = payload.new as ProgressDataType;

        setProgress((prevProgress) => {
          let updatedProgress;

          updatedProgress = prevProgress.map((progress) => (progress.id === newProgress.id ? newProgress : progress));

          return updatedProgress;
        });
      })
      .subscribe();

    const channel_project_workload = supabase
      .channel("projectWorkload-channel")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "project_workload" }, (payload) => {
        const newProjectWorkload = payload.new as ProjectWorkloadDataType;

        setProjectWorkloadList((prevProjectWorload) => {
          let projectWorkload;

          projectWorkload = prevProjectWorload.map((projectWorkload) => (projectWorkload.id === newProjectWorkload.id ? newProjectWorkload : projectWorkload));

          return projectWorkload;
        });
      })
      .subscribe();

    const channel_task_assigned_by_me = supabase
      .channel("task-assigned-by-me-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "task_list" }, async (payload) => {
        let newTask = payload.new as TaskListType;
        const assignedToEmployee = await getEmployeeByEmployeeIdAction(newTask.assigned_to);

        setTask((prevTasks) => {
          let updatedTasks;
          switch (payload.eventType) {
            case "INSERT":
              newTask = {
                ...newTask,
                assigned_to_name: assignedToEmployee.employee_name,
              };
              updatedTasks = [newTask, ...prevTasks];
              break;
            case "UPDATE":
              newTask = {
                ...newTask,
                assigned_to_name: assignedToEmployee.employee_name,
              };
              updatedTasks = prevTasks.map((task) => (task.task_id === newTask.task_id ? newTask : task));
              break;
            case "DELETE":
              updatedTasks = prevTasks.filter((task) => task.task_id !== payload.old.task_id);
              break;
            default:
              updatedTasks = prevTasks;
          }
          return updatedTasks;
        });
      })
      .subscribe();

    const channel_task_assigned_to_me = supabase
      .channel("task-assigned-to-me-channel")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "task_list" }, (payload) => {
        const newTask = payload.new as TaskListType;

        setTaskList((prevTask) => {
          let updatedTaskList;

          updatedTaskList = prevTask.map((task) => (task.task_id === newTask.task_id ? newTask : task));

          return updatedTaskList;
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel_employee_list);
      supabase.removeChannel(channel_project);
      supabase.removeChannel(channel_metrics);
      supabase.removeChannel(channel_progress);
      supabase.removeChannel(channel_project_workload);
      supabase.removeChannel(channel_task_assigned_by_me);
      supabase.removeChannel(channel_task_assigned_to_me);
    };
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        isLoading,
        employeeList,
        project,
        metrics,
        progress,
        projectWorkloadList,
        task,
        taskList,
        employeeId,
        organisationId,
        employeeDetails,
        note,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = (): EmployeeContextProps => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployeeContext must be used within an EmployeeProvider");
  }
  return context;
};
