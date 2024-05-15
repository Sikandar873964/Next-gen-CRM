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
} from "lucide-react";

export default function Header() {
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
      link: "/dashboard/contact",
      tooltiptext: "Contact",
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
                <Image
                  src="/vercel.svg"
                  width={50}
                  height={50}
                  alt="company logo"
                />
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
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
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
              <AvatarImage src="https://th.bing.com/th/id/OIP.7PZ6Ag_krpcM1hfmCoZ1KgAAAA?rs=1&pid=ImgDetMain" />
              <AvatarFallback>EU</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Example User</DropdownMenuLabel>
            <DropdownMenuLabel>example@examplemail.com</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form>Logout</form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </nav>
    </>
  );
}
