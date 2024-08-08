"use client";

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
import { TaskListType } from "./taskList";
import { getEmployeeByEmployeeId } from "@/lib/employee";
import ReviewTaskForm from "./form/reviewTaskForm";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProjectListType = {
  project_id: number;
  organisation_id: string;
  project_name: string;
  project_manager: string;
  revenue: number;
  due_date: string;
  status: string;
  progress: number;
  project_team: string;
};

export type EditableTaskData = {
  task_id: number;
  taskDescription: string;
  assignedTo: string;
  checked: "Yes" | "No";
  status: "Approved" | "On going" | "In review";
};

export const columns: ColumnDef<TaskListType>[] = [
  {
    accessorKey: "description",
    header: "Task description",
    cell: (info) => info.getValue(),
  },
  // {
  //   accessorKey: "assigned_to",
  //   header: "Assigned to",
  //   cell: (info) => info.getValue(),
  // },
  {
    accessorKey: "assigned_to_name",
    header: "Assigned to",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "checked",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Checked
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => {
      let variant: BadgeProps["variant"] = "onGoing";
      const checked = info.getValue() as string;
      switch (checked) {
        case "Yes":
          variant = "success";
          break;
        case "No":
          variant = "onGoing";
          break;
        default:
          variant = "onGoing";
      }

      return <Badge variant={variant}>{checked}</Badge>;
    },
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
        case "Approved":
          variant = "success";
          break;
        case "In review":
          variant = "warning";
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
    // Hidden column for task id
    accessorKey: "task_id",
    header: () => null,
    cell: () => null,
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    // Hidden column for assigned to employee id
    accessorKey: "assigned_to",
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

      const task_id: number = row.getValue("task_id");
      const taskDescription: string = row.getValue("description");
      const assignedTo: string = row.getValue("assigned_to");
      const checked: "Yes" | "No" = row.getValue("checked");
      const status: "Approved" | "On going" | "In review" = row.getValue("status");

      const editableTaskData = {
        task_id,
        taskDescription,
        assignedTo,
        checked,
        status,
      };

      // return <>{<ReviewTaskButton employeeList={employeeList} editableProjectData={editableProjectData} />}</>;

      return <ReviewTaskForm editableTaskData={editableTaskData} employeeList={employeeList} />;
    },
  },
];

// export const ReviewTaskButton: React.FC<{ employeeList: EmployeeListType[]; editableProjectData: EditableProjectData }> = ({ employeeList, editableProjectData }) => {
//   const projectFormHeading = "Review project";
//   return (
//     <>
//       <CreatNewProject employeeList={employeeList} projectFormHeading={projectFormHeading} editableProjectData={editableProjectData}>
//         <Button variant="secondary" size="sm" className="bg-inherit text-xs border border-[#0000001f] text-black font-normal">
//           Review
//         </Button>
//       </CreatNewProject>
//     </>
//   );
// };
