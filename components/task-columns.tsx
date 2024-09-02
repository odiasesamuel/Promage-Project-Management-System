"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { TaskListType } from "./taskList";
import ReviewTaskForm from "./form/reviewTaskForm";

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
    cell: ({ row }) => {
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

      return <ReviewTaskForm editableTaskData={editableTaskData} />;
    },
  },
];
