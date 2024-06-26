"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import formatDateInProjectSummary from "@/utils/dateUtils";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Button } from "@/components/ui/button";
import { Badge, BadgeProps } from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  name: string;
  projectManager: string;
  dueDate: string;
  status: string;
  progress: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "projectManager",
    header: "Project Manager",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "dueDate",
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
      const status = info.getValue();
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

      return <Badge variant={variant}>{status as string}</Badge>;
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const perString = row.getValue("progress") as string;
      const percentageArr = perString.split("");
      percentageArr.pop();
      const percentage = +percentageArr.join("");

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
];
