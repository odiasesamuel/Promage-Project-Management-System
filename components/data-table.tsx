"use client";

import * as React from "react";
import { ColumnDef, ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
}

export function DataTable<TData, TValue>({ columns, data, className }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  const customFilterFunction = (row: any, columnId: string, filterValue: string) => {
    const name = row.original.name.toLowerCase();
    const projectManager = row.original.projectManager.toLowerCase();
    const searchValue = filterValue.toLowerCase();

    return name.includes(searchValue) || projectManager.includes(searchValue);
  };

  const table = useReactTable({
    data,
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

  return (
    <div className={className}>
      <div className="flex items-center justify-between py-4">
        <h1 className="font-semibold">Project summary</h1>
        <Input placeholder="Filter project..." value={globalFilter} onChange={handleFilterChange} className="h-10 w-[300px] pl-12 pr-5 text-sm placeholder:text-sm rounded-full bg-white focus:outline-none" />
      </div>
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b-2 border-[#D8D1CD]">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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


// [![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=Odiasesamuel&layout=compact&theme=vision-friendly-dark)](https://github.com/anuraghazra/github-readme-stats)

// [![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=Odiasesamuel&layout=compact)](https://github.com/Odiasesamuel/github-readme-stats)

// [![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=Odiasesamuel&layout=compact&theme=vision-friendly-dark)](https://github.com/Odiasesamuel/github-readme-stats)
