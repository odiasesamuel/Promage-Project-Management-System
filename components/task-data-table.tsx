"use client";

import { ColumnDef, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, TableMeta, RowData } from "@tanstack/react-table";
import { useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ReviewTaskForm from "./form/reviewTaskForm";
import { TaskListType } from "./taskList";
import { useEmployeeContext } from "@/context/employeeContext";

interface DataTableProps<TData extends TaskListType, TValue> {
  columns: ColumnDef<TaskListType, any>[];
  data?: TData[];
  className?: string;
}

export function DataTable<TData extends TaskListType, TValue>({ columns, className }: DataTableProps<TData, TValue>) {
  const { isLoading, task } = useEmployeeContext();
  const [sorting, setSorting] = useState<SortingState>([]);

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
  });

  return (
    <div className={className}>
      <div className="flex justify-end py-4 mr-10">
        <ReviewTaskForm />
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
                  {isLoading ? "Loading..." : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!isLoading && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
