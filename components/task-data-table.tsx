"use client";

import * as React from "react";
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, TableMeta, RowData } from "@tanstack/react-table";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import { getEmployeeByEmployeeIdAction } from "@/actions/employee";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    employeeList: EmployeeListType[] | undefined;
  }
}

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EmployeeListType } from "@/app/(application)/layout";
import ReviewTaskForm from "./form/reviewTaskForm";
import { TaskListType } from "./taskList";

interface DataTableProps<TData extends TaskListType, TValue> {
  columns: ColumnDef<TaskListType, any>[];
  data: TData[];
  employeeList?: EmployeeListType[];
  className?: string;
  assigned_by: string;
}

export function DataTable<TData extends TaskListType, TValue>({ columns, data, employeeList, className, assigned_by }: DataTableProps<TData, TValue>) {
  const [task, setTask] = useState<TaskListType[]>(data);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  useEffect(() => {
    const channel = supabase
      .channel("custom-all-channel")
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

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const table = useReactTable({
    data: task,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
    meta: {
      employeeList,
    },
  });

  return (
    <div className={className}>
      <div className="flex justify-end py-4 mr-10">
        <ReviewTaskForm employeeList={employeeList!} assigned_by={assigned_by} />
      </div>
      <div className="rounded-md">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b-2 border-[#D8D1CD]">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-left px-2">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <TableCell key={cell.id} className={cellIndex === 2 ? "px-8" : cellIndex === 3 ? "px-4" : "px-2"}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}
