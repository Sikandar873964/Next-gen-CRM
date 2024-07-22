"use client";
"use client";
import {
    ArrowUpDown,
    EditIcon,
    MoreHorizontal,
    Trash2Icon,
  } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import Link from "next/link";

// Define the columns for the product table
export const columns = [
    {
      accessorKey: "title",
      header: "Product Name",
    },
  
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "stock",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("stock")}</div>,
    },
    {
      accessorKey: "color",
      header: "Color",
    },
    {
      accessorKey: "size",
      header: "Size (inches)",
    },
    {
      accessorKey: "createdAt",
      header: "Added on",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
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
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
  
        // Format the price as a dollar price
        const formatted = new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(price);
  
        return <div className="text-left font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        // Product delete handler
        const handleDeleteProductClick = async () => {
          try {
            await deleteProduct(row.original.id);
            toast.success("Product deleted successfully");
          } catch (error) {
            toast.error("Error deleting product");
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
              <Link href={`/dashboard/products/${row.original.id}`}>
                <DropdownMenuItem>
                  <EditIcon className="mr-2 size-4" />
                  Edit Product
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onSelect={handleDeleteProductClick}>
                <Trash2Icon className="mr-2 size-4" /> Delete Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];