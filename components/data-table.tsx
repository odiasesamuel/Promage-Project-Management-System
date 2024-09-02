"use client";

import * as React from "react";
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, TableMeta, RowData } from "@tanstack/react-table";

import { usePathname } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { exportProjectReport } from "@/utils/exportProjectReport";
import { ProjectListType } from "@/components/columns";
import { useEmployeeContext } from "@/context/employeeContext";
import { Loader2 } from "lucide-react";

interface DataTableProps<TData extends ProjectListType, TValue> {
  columns: ColumnDef<ProjectListType, any>[];
  data?: TData[];
  dataTableHeading?: string;
  className?: string;
}

export function DataTable<TData extends ProjectListType, TValue>({ columns, dataTableHeading, className }: DataTableProps<TData, TValue>) {
  const { isLoading, project } = useEmployeeContext();
  const pathname = usePathname();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  const customFilterFunction = (row: any, columnId: string, filterValue: string) => {
    const projectName = row.original.project_name.toLowerCase();
    const projectManager = row.original.project_manager.toLowerCase();
    const searchValue = filterValue.toLowerCase();

    return projectName.includes(searchValue) || projectManager.includes(searchValue);
  };

  const table = useReactTable({
    data: project,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    globalFilterFn: customFilterFunction,
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(event.target.value);
  };

  const exportReportHandler = () => {
    exportProjectReport(project);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between py-4">
        <h1 className="font-semibold">{dataTableHeading}</h1>
        <div className="flex items-center">
          {pathname === "/project" && <Button onClick={exportReportHandler}>Export</Button>}
          <Input placeholder="Filter project..." value={globalFilter} onChange={handleFilterChange} className="h-10 w-[300px] pl-12 ml-8 pr-5 text-sm placeholder:text-sm rounded-full bg-white focus:outline-none" />
        </div>
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-2">
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
