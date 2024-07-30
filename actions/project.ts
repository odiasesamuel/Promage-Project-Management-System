"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EmployeeOptions } from "@/components/form/newProjectForm";
import { getAllEmployee } from "@/lib/employee";
import { MultiValue } from "react-select";

import { storeNewProject, reviewProject } from "@/lib/project";

export type newProjectFormValueType = {
  organisation_id: string;
  dueDate: string;
  projectName: string;
  projectManager: string;
  revenue: number;
  status: "Completed" | "On going" | "Delayed" | "At risk";
  progress: number;
};

export type EmployeeListType = {
  id: string;
  organisation_id: string;
  employee_name: string;
  employee_email: string;
  job_title: string;
};

export const createNewProject = async (values: newProjectFormValueType, projectTeam: MultiValue<EmployeeOptions> | undefined, projectManagerId: string | undefined) => {
  try {
    await storeNewProject(values, projectTeam, projectManagerId);
    revalidatePath("/dashboard");
  } catch (error) {
    throw new Error("Failed to create new project");
  }
};

export const reviewProjectAction = async (values: newProjectFormValueType, projectTeam: MultiValue<EmployeeOptions> | undefined, projectManagerId: string | undefined, project_id: number) => {
  console.log(values);
  try {
    await reviewProject(values, projectTeam, projectManagerId, project_id);
    revalidatePath("/project");
  } catch (error) {
    throw new Error("Failed to review project");
  }
};

export const getEmployeeList = async (organisation_id: string) => {
  const employeeList: EmployeeListType[] = getAllEmployee(organisation_id);

  return employeeList;
};
