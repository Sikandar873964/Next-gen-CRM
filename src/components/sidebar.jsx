"use client";
import React from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ContactRoundIcon,
  DoorOpen,
  Home,
  LayoutDashboardIcon,
  Package,
  TrashIcon,
  TriangleAlertIcon,
  UserCircle2Icon,
  Users2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { deleteCompanyRecords } from "@/app/lib/actions";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Sidebar() {
  const sidebarItems = [
    {
      id: 1,
      name: "Home",
      link: "/dashboard",
      tooltiptext: "Home",
      logo: <Home className="h-5 w-5" />,
    },
    {
      id: 2,
      name: "Products",
      link: "/dashboard/products",
      tooltiptext: "Products",
      logo: <Package className="h-5 w-5" />,
    },
    {
      id: 3,
      name: "Customers",
      link: "/dashboard/customers",
      tooltiptext: "Customers",
      logo: <Users2 className="h-5 w-5" />,
    },
    {
      id: 4,
      name: "Users",
      link: "/dashboard/users",
      tooltiptext: "Users",
      logo: <UserCircle2Icon className="h-5 w-5" />,
    },
    {
      id: 5,
      name: "contact",
      link: "/dashboard/contactlogs",
      tooltiptext: "Contact",
      logo: <ContactRoundIcon className="h-5 w-5" />,
    },
  ];

  const inactiveLink =
    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8";

  const activeLink =
    "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8";

  const pathname = usePathname();

  // const [state, formAction] = useFormState(deleteCompanyRecords, undefined);

  const { data: session } = useSession();

  const [inputCompanyID, setInputCompanyID] = useState("");

  const handleInputChange = (e) => {
    setInputCompanyID(e.target.value);
  };

  const isDeleteDisabled = inputCompanyID !== session?.user?.companyID;

  return (
    <div>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            href="/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-transparent text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            {/* <Image src="" width={50} height={50} alt="App logo" /> */}
            <LayoutDashboardIcon className="h-8 w-8 bg-primary text-white dark:text-black  p-1 rounded-full" />
            <span className="sr-only">CRM Logo</span>
          </Link>
          {sidebarItems.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link
                  href={item.link}
                  key={item.id}
                  className={pathname === item.link ? activeLink : inactiveLink} // Change here
                >
                  {item.logo}
                  <span className="sr-only">{item.tooltiptext}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.tooltiptext}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          {" "}
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DoorOpen className="h-5 w-5 hover:text-red-600 transition-colors cursor-pointer" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <form action={deleteCompanyRecords}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Company</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you absolutely sure? Doing so will permanently
                          delete this company from the database.
                        </AlertDialogDescription>
                        <AlertDialogDescription className="bg-red-200 w-full dark:bg-red-800/20 text-red-500 rounded py-1 px-1 flex items-center gap-3">
                          <TriangleAlertIcon />
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogDescription className="mt-2">
                        Type your company ID '
                        <span className="text-red-500 font-semibold">
                          {session?.user?.companyID}
                        </span>
                        ' in the below input field to confirm.
                        <Input
                          id="inputCompanyID"
                          className="col-span-3 my-2"
                          value={inputCompanyID}
                          onChange={handleInputChange}
                        />
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button type="submit" disabled={isDeleteDisabled}>
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </form>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">Delete Company</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </div>
  );
}
