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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { deleteEnquiry } from "@/app/lib/actions";

// const data = [
//   {
//     name: "John Doe",
//     email: "johndoe@example.com",
//     product: "Product A",
//     contactType: "Type 1",
//     createdDate: "2022-01-01",
//   },
//   {
//     name: "Jane Smith",
//     email: "janesmith@example.com",
//     product: "Product B",
//     contactType: "Type 2",
//     createdDate: "2022-01-02",
//   },
// {
//   name: "John Smith",
//   email: "johnsmith@example.com",
//   product: "Product C",
//   contactType: "Type 3",
//   createdDate: "2022-01-03",
// },
// {
//   name: "Jane Doe",
//   email: "janedoe@example.com",
//   product: "Product D",
//   contactType: "Type 4",
//   createdDate: "2022-01-04",
// },
// {
//   name: "Mike Johnson",
//   email: "mikejohnson@example.com",
//   product: "Product E",
//   contactType: "Type 5",
//   createdDate: "2022-01-05",
// },
// {
//   name: "Emily Brown",
//   email: "emilybrown@example.com",
//   product: "Product F",
//   contactType: "Type 6",
//   createdDate: "2022-01-06",
// },
// {
//   name: "David Wilson",
//   email: "davidwilson@example.com",
//   product: "Product G",
//   contactType: "Type 7",
//   createdDate: "2022-01-07",
// },
// {
//   name: "Sarah Davis",
//   email: "sarahdavis@example.com",
//   product: "Product H",
//   contactType: "Type 8",
//   createdDate: "2022-01-08",
// },
// {
//   name: "Michael Taylor",
//   email: "michaeltaylor@example.com",
//   product: "Product I",
//   contactType: "Type 9",
//   createdDate: "2022-01-09",
// },
// {
//   name: "Olivia Anderson",
//   email: "oliviaanderson@example.com",
//   product: "Product J",
//   contactType: "Type 10",
//   createdDate: "2022-01-10",
// },
// {
//   name: "James Martinez",
//   email: "jamesmartinez@example.com",
//   product: "Product K",
//   contactType: "Type 11",
//   createdDate: "2022-01-11",
// },
// {
//   name: "Sophia Thompson",
//   email: "sophiathompson@example.com",
//   product: "Product L",
//   contactType: "Type 12",
//   createdDate: "2022-01-12",
// }
// ];

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "contactType",
    header: "Contact Type",
    cell: ({ row }) => {
      return <Badge>{row.original.contactType}</Badge>;
    },
  },
  {
    accessorKey: "createdDate",
    header: "Created On",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdDate"));
      const formattedDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      return (
        <div>
          {formattedDate} {formattedTime}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <Badge>{row.original.status}</Badge>;
    },
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
            <Link href={`/dashboard/contactlogs/${row.original.id}`}>
              <DropdownMenuItem>Edit Log</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <form action={deleteEnquiry}>
                <Input
                  className="hidden"
                  type="hidden"
                  name="id"
                  value={row.original.id}
                />
                <button type="submit" className="text-red-500 text-left w-full">
                  {" "}
                  Delete Log
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function ContactTable(data) {
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
        {/* <DropdownMenu
        >
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Toggle contact type <ChevronDown className="ml-2 h-4 w-4" />
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
                    {column.contactType}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}

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
        <Link href="/dashboard/contactlogs/add/" className="ml-2">
          <Button>
            Add new Log <PlusCircleIcon className="ml-2 h-4 w-4" />
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
