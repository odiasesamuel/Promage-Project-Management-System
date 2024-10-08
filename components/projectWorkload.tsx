"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export type ProjectWorkloadDataType = {
  id: number;
  organisation_id: string;
  employee_id: string;
  employee_name: string;
  no_of_project: number;
};

type ProjectWorkloadProps = {
  projectWorkloadData: ProjectWorkloadDataType[];
};

const ProjectWorkload: React.FC<ProjectWorkloadProps> = ({ projectWorkloadData }) => {
  const [projectWorkloadList, setProjectWorkloadList] = useState(projectWorkloadData);

  useEffect(() => {
    const channel = supabase
      .channel("projectWorkload-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "project_workload" }, (payload) => {
        const newProjectWorkload = payload.new as ProjectWorkloadDataType;

        setProjectWorkloadList((prevProjectWorload) => {
          let updatedProjectWorkload;

          switch (payload.eventType) {
            case "INSERT":
              updatedProjectWorkload = [...prevProjectWorload, newProjectWorkload];
              break;
            case "UPDATE":
              updatedProjectWorkload = prevProjectWorload.map((projectWorkload) => (projectWorkload.id === newProjectWorkload.id ? newProjectWorkload : projectWorkload));
              break;
            default:
              updatedProjectWorkload = prevProjectWorload;
          }

          return updatedProjectWorkload;
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const maxProjects = projectWorkloadList.reduce((max, employee) => (employee.no_of_project > max ? employee.no_of_project : max), -Infinity);

  return (
    <div className="flex justify-between min-h-[230px] flex-wrap gap-y-3">
      {projectWorkloadList.map((employee) => {
        const noCircle = employee.no_of_project % 2 === 0 ? Math.floor(employee.no_of_project / 2) - 1 : Math.floor(employee.no_of_project / 2);
        const employeeName = employee.employee_name.split(" ");
        const firstName = employeeName[0];

        return (
          <div className="w-[13%] flex flex-col items-center justify-end" key={employee.id}>
            <div className={`w-[35px] h-[35px] rounded-full border ${employee.no_of_project === maxProjects ? "border-[#E65F2B] bg-[#E65F2B]" : "border-[#060606] bg-[#060606]"} flex items-center justify-center`}>
              <span className="text-white text-sm">{employee.no_of_project}</span>
            </div>
            {Array.from({ length: noCircle }).map((_, index) => (
              <div className="w-[35px] h-[35px] rounded-full border border-[#060606]" key={index}></div>
            ))}
            <span className="mt-2 text-xs text-[#9A9A9A]">{firstName}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectWorkload;
