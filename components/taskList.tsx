"use client";

import { useState } from "react";
import taskList from "@/data/taskList.json";
import { Badge, BadgeProps } from "./ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export type TaskListType = {
  task_id: number;
  organization_id: string;
  assigned_to: string;
  description: string;
  checked: string;
  approval: string;
};

type TasklistProps = {
  data: TaskListType[];
};

const TaskList: React.FC<TasklistProps> = ({ data }) => {
  const rowsPerPage = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const pageCount = Math.ceil(data.length / rowsPerPage);

  const paginationPrevousHandler = () => {
    setStartIndex(startIndex - rowsPerPage);
    setEndIndex(endIndex - rowsPerPage);
  };

  const paginationNextHadler = () => {
    setStartIndex(startIndex + rowsPerPage);
    setEndIndex(endIndex + rowsPerPage);
  };

  return (
    <ul>
      {data.slice(startIndex, endIndex).map(({ task_id, description, checked, approval }) => {
        const variant: BadgeProps["variant"] = approval === "Approved" ? "success" : approval === "In review" ? "danger" : approval === "On going" ? "onGoing" : "onGoing";

        return (
          <li className="flex items-center mb-3 w-[85%]" key={task_id}>
            <Checkbox id={`${task_id}`} defaultChecked={checked === "Yes"} />
            <label htmlFor={`${task_id}`} className="ml-2 text-sm">
              {description}
            </label>
            <Badge variant={variant} className="ml-auto">
              {approval}
            </Badge>
          </li>
        );
      })}
      {pageCount > 1 && (
        <Pagination className="py-3">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious className={`${startIndex === 0 ? "pointer-events-none opacity-50" : undefined}`} onClick={paginationPrevousHandler} />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext className={endIndex === data.length ? "pointer-events-none opacity-50" : undefined} onClick={paginationNextHadler} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </ul>
  );
};

export default TaskList;
