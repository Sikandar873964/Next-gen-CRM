"use client";
import {
    ArrowUpDown,
    ChevronDown,
    EditIcon,
    MoreHorizontal,
    PlusCircleIcon,
    Trash2Icon,
  } from "lucide-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { useSession } from "next-auth/react";
  import { useState } from "react";
  import Link from "next/link";

// Define the columns for the user table
export const columns = [
    {
      accessorKey: "profile_Picture",
      header: "Profile Picture",
      cell: ({ row }) => {
        return (
          <img
            src={row.original.profile_Picture || "/noavatar.png"}
            alt="User profile picture"
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("role")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
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
        const { data: session } = useSession();
  
        const [isAlertOpen, setIsAlertOpen] = useState(false);
  
        const handleDeleteClick = async () => {
          if (session.user.username === row.original.name) {
            setIsAlertOpen(true);
          } else {
            try {
              await deleteUser(row.original.id);
              // Handle successful deletion
              toast.success("User deleted successfully");
            } catch (error) {
              toast.error("Error deleting user");
              // Handle error (e.g., show an error message)
            }
          }
        };
  
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild={true}>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open Menu</span>
                  <span>
                    <MoreHorizontal />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
  
                <Link href={`/dashboard/users/${row.original.id}`}>
                  <DropdownMenuItem><EditIcon className="mr-2 size-4"/>Edit User</DropdownMenuItem>
                </Link>
  
                {session?.user?.username === row.original.name ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Trash2Icon className="mr-2 size-4"/>    Delete User
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Cannot Delete Logged In User
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Please ask another administrator account to delete this user. 
                          </AlertDialogDescription>
                          <AlertDialogDescription>
                          If this is the only user in the company, please use the{" "}
                          <span className="text-red-500">'Delete Company'</span>{" "}
                          method instead.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Understood</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <DropdownMenuItem onSelect={handleDeleteClick}>
                   <Trash2Icon className="mr-2 size-4"/> Delete User
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
  