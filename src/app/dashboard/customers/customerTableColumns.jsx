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
    import { toast
     } from "sonner";
     import { deleteCustomer } from "@/app/lib/actions";
     
// Define the columns for the customer table
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
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        // Customer delete handler
        const handleDeleteCustomerClick = async () => {
          try {
            await deleteCustomer(row.original.id);
            toast.success("Customer deleted successfully");
          } catch (error) {
            toast.error("Error deleting customer");
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
              <Link href={`/dashboard/customers/${row.original.id}`}>
                <DropdownMenuItem><EditIcon className="mr-2 size-4"/>Edit Customer</DropdownMenuItem>
              </Link>
  
              <DropdownMenuItem onSelect={handleDeleteCustomerClick}>
              <Trash2Icon className="mr-2 size-4"/>   Delete Customer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  