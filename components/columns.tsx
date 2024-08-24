"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { formatDateInProjectSummary } from "@/utils/dateUtils";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Button } from "@/components/ui/button";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import CreatNewProject from "./creatNewProject";
import { EmployeeListType } from "@/actions/employee";

export type ProjectListType = {
  project_id: number;
  organisation_id: string;
  project_name: string;
  project_manager: string;
  revenue: number;
  due_date: string;
  status: string;
  progress: number;
  project_team: string[];
};

export type EditableProjectData = {
  project_id: number;
  projectName: string;
  projectManager: string;
  status: "Completed" | "On going" | "Delayed" | "At risk";
  revenue: number;
  progress: number;
  dueDate: Date;
  projectTeam: string;
};

const ReviewProjectButton: React.FC<{ employeeList: EmployeeListType[]; editableProjectData: EditableProjectData }> = ({ employeeList, editableProjectData }) => {
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

const ActionsCell: React.FC<{ row: any; table: any }> = ({ row, table }) => {
  const pathname = usePathname();
  const employeeList = table.options.meta?.employeeList as EmployeeListType[];

  const project_id: number = row.getValue("project_id");
  const projectName: string = row.getValue("project_name");
  const projectManager: string = row.getValue("project_manager");
  const status: "Completed" | "On going" | "Delayed" | "At risk" = row.getValue("status");
  const revenue: number = row.getValue("revenue");
  const progress: number = row.getValue("progress");
  const dueDate: Date = row.getValue("due_date");
  const projectTeam: string = row.getValue("project_team");

  const editableProjectData = {
    project_id,
    projectName,
    projectManager,
    status,
    revenue,
    progress,
    dueDate,
    projectTeam,
  };

  return <>{pathname === "/project" && <ReviewProjectButton employeeList={employeeList} editableProjectData={editableProjectData} />}</>;
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
          <ArrowUpDown className="ml-1 h-4 w-4" />
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
    accessorKey: "project_id",
    header: () => null,
    cell: () => null,
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "revenue",
    header: () => null,
    cell: () => null,
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "project_team",
    header: () => null,
    cell: () => null,
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: (props) => <ActionsCell {...props} />,
  },
];
