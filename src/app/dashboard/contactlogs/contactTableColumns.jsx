"use client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Trash2Icon, EditIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { deleteEnquiry } from "@/app/lib/actions";

// Define the columns for the table
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
    header: "Type",
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
      // Enquiry delete handler
      const handleDeleteEnquiryClick = async () => {
        try {
          await deleteEnquiry(row.original.id);
          toast.success("Enquiry deleted successfully");
        } catch (error) {
          toast.error("Error deleting enquiry");
        }
      };

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
              <DropdownMenuItem>
                <EditIcon className="mr-2 size-4" /> Edit Enquiry
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onSelect={handleDeleteEnquiryClick}>
              <Trash2Icon className="mr-2 size-4" /> Delete Enquiry
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
