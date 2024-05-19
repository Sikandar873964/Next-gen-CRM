"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  PlusCircleIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { deleteCustomer } from "@/app/lib/actions";

//   {
//     id: "m5gr84i9",
//     header: "John Doe",
//     amount: 316,
//     status: "Active",
//     email: "ken99@yahoo.com",
//     createdDate: "2022-01-01",
//     role: "Administrator",
//     date: new Date("2022-01-01"),
//   },
//   {
//     id: "3u1reuv4",
//     name: "Jane Smith",
//     amount: 242,
//     status: "Active",
//     email: "Abe45@gmail.com",
//     createdDate: "2022-01-02",
//     role: "client",
//     date: new Date("2022-01-02"),
//   },
//   {
//     id: "derv1ws0",
//     name: "Michael Johnson",
//     amount: 837,
//     status: "Inactive",
//     email: "Monserrat44@gmail.com",
//     createdDate: "2022-01-03",
//     role: "Administrator",
//     date: new Date("2022-01-03"),
//   },
//   {
//     id: "5kma53ae",
//     name: "Emily Davis",
//     amount: 874,
//     status: "Active",
//     email: "Silas22@gmail.com",
//     createdDate: "2022-01-04",
//     role: "client",
//     date: new Date("2022-01-04"),
//   },
//   {
//     id: "bhqecj4p",
//     name: "David Brown",
//     amount: 721,
//     status: "Inactive",
//     email: "carmella@hotmail.com",
//     createdDate: "2022-01-05",
//     role: "Administrator",
//     date: new Date("2022-01-05"),
//   },
//   // Add 10 more mock data elements here
//   {
//     id: "8j2k9d3s",
//     name: "Sarah Johnson",
//     amount: 523,
//     status: "Active",
//     email: "sarah.johnson@example.com",
//     createdDate: "2022-01-06",
//     role: "client",
//     date: new Date("2022-01-06"),
//   },
//   {
//     id: "4h7f2e1d",
//     name: "Robert Smith",
//     amount: 632,
//     status: "Active",
//     email: "robert.smith@example.com",
//     createdDate: "2022-01-07",
//     role: "Administrator",
//     date: new Date("2022-01-07"),
//   },
//   {
//     id: "9g3h5j2k",
//     name: "Jessica Davis",
//     amount: 421,
//     status: "Inactive",
//     email: "jessica.davis@example.com",
//     createdDate: "2022-01-08",
//     role: "client",
//     date: new Date("2022-01-08"),
//   },
//   {
//     id: "6f4d2s1a",
//     name: "Michael Johnson",
//     amount: 837,
//     status: "Active",
//     email: "michael.johnson@example.com",
//     createdDate: "2022-01-09",
//     role: "Administrator",
//     date: new Date("2022-01-09"),
//   },
//   {
//     id: "3a1s2d4f",
//     name: "Emily Brown",
//     amount: 874,
//     status: "Inactive",
//     email: "emily.brown@example.com",
//     createdDate: "2022-01-10",
//     role: "client",
//     date: new Date("2022-01-10"),
//   },
//   {
//     id: "5j3k9d2s",
//     name: "Daniel Smith",
//     amount: 721,
//     status: "Active",
//     email: "daniel.smith@example.com",
//     createdDate: "2022-01-11",
//     role: "Administrator",
//     date: new Date("2022-01-11"),
//   },
// ];

export const columns = [
  {
    accessorKey: "profile_Picture",
    header: "Profile Picture",
    cell: ({ row }) => {
      return (
        <img
        src={row.original.profile_Picture || "/noavatar.png"}
          alt="Customer profile picture"
          className="w-10 h-10 rounded-full border"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Contact Number",
  },
  {
    accessorKey: "createdDate",
    header: "Created On",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Customer</DropdownMenuItem>
            <form action={deleteCustomer}>
              <DropdownMenuItem>
                <Input type="hidden" name="id" value={row.original.id} />
                <button type="submit" className="text-red-500 text-left w-full">
                  {" "}
                  Delete Customer
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function CustomerTable(data) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: data.data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search by name..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/dashboard/customers/add/" className="ml-2">
          <Button>
            Add new customer <PlusCircleIcon className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
