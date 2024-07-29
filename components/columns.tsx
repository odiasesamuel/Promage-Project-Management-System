"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { formatDateInProjectSummary } from "@/utils/dateUtils";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Button } from "@/components/ui/button";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import CreatNewProject from "./creatNewProject";
import { useState, useEffect } from "react";
import { getEmployeeList, EmployeeListType } from "@/actions/project";

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProjectListType = {
  project_id: number;
  organisation_id: string;
  project_name: string;
  project_manager: string;
  due_date: string;
  status: string;
  progress: number;
  project_team: string;
};

export type EditableProjectData = {
  projectName: string;
  projectManager: string;
  status: "Completed" | "On going" | "Delayed" | "At risk";
  progress: number;
  dueDate: Date;
  projectTeam: string;
};

export const columns: ColumnDef<ProjectListType>[] = [
  {
    accessorKey: "project_name",
    header: "Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "project_manager",
    header: "Project Manager",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
    cell: (info) => formatDateInProjectSummary(info.getValue() as string),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => {
      let variant: BadgeProps["variant"] = "onGoing";
      const status = info.getValue() as string;
      switch (status) {
        case "Completed":
          variant = "success";
          break;
        case "Delayed":
          variant = "warning";
          break;
        case "At risk":
          variant = "danger";
          break;
        case "On going":
          variant = "onGoing";
          break;
        default:
          variant = "onGoing";
      }

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const percentage = row.getValue("progress") as number;

      const status = row.getValue("status");
      let pathColor = "";
      switch (status) {
        case "Completed":
          pathColor = "#1A932E";
          break;
        case "Delayed":
          pathColor = "#E5AE21";
          break;
        case "At risk":
          pathColor = "#EE201C";
          break;
        case "On going":
          pathColor = "#EC8760";
          break;
        default:
          pathColor = "#EC8760";
      }

      return (
        <div className="w-8 h-8">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textSize: "30px",
              textColor: "#000000",
              trailColor: "#d6d6d6",
              pathColor: `${pathColor}`,
            })}
            strokeWidth={10}
          />
        </div>
      );
    },
  },
  {
    // Hidden column for project Team
    accessorKey: "project_team",
    header: () => null,
    cell: () => null,
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const pathname = usePathname();
      const employeeList = table.options.meta?.employeeList as EmployeeListType[];

      const projectName: string = row.getValue("project_name");
      const projectManager: string = row.getValue("project_manager");
      const status: "Completed" | "On going" | "Delayed" | "At risk" = row.getValue("status");
      const progress: number = row.getValue("progress");
      const dueDate: Date = row.getValue("due_date");
      const projectTeam: string = row.getValue("project_team");

      const editableProjectData = {
        projectName,
        projectManager,
        status,
        progress,
        dueDate,
        projectTeam,
      };
      console.log(editableProjectData);

      return <>{pathname === "/project" && <ReviewProjectButton employeeList={employeeList} editableProjectData={editableProjectData} />}</>;
    },
  },
];

export const ReviewProjectButton: React.FC<{ employeeList: EmployeeListType[]; editableProjectData: EditableProjectData }> = ({ employeeList, editableProjectData }) => {
  const reviewProjecctHandler = () => {};
  const projectFormHeading = "Review project";
  return (
    <>
      <CreatNewProject employeeList={employeeList} projectFormHeading={projectFormHeading} editableProjectData={editableProjectData}>
        <Button variant="secondary" size="sm" className="bg-inherit text-xs border border-[#0000001f] text-black font-normal">
          Review
        </Button>
      </CreatNewProject>
    </>
  );
};
