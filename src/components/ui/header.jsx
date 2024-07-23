import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Home,
  PanelLeft,
  Search,
  Settings,
  Users2,
  Package,
  ContactRoundIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import { auth, signOut } from "@/auth";

export default async function Header() {
  const { user } = await auth();

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
      id: 3,
      name: "contact",
      link: "/dashboard/contactlogs",
      tooltiptext: "Contact Logs",
      logo: <ContactRoundIcon className="h-5 w-5" />,
    },
  ];

  return (
    <>
      <nav className="sm:pl-20 py-4 sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-transparent text-lg font-semibold text-primary-foreground md:text-base"
              >
                <div>
                  <LayoutDashboardIcon className="h-8 w-8 bg-primary text-white dark:text-black p-1 rounded-full inline mx-2 md:mx-0" />
                </div>
                <span className="sr-only">company logo</span>
              </Link>
              {sidebarItems.map((item, index) => (
                <Link
                  href={item.link}
                  key={item.id}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  {item.logo} {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex">
          {" "}
          {/* This div is for breadcrumbs */}
        </div>

        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer size-9">
              <AvatarImage src={user.img || "/noavatar.png"} />
              <AvatarFallback>EU</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <span className="text-primary/70">Username: </span>
              {user.username}
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <span className="text-primary/70">Email:</span> {user.email}
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <span className="text-primary/70">Company ID:</span>{" "}
              {user.companyID}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form
                className="w-full"
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button className="w-full text-left hover:text-red-500 transition">
                  {" "}
                  Logout
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </nav>
    </>
  );
}
