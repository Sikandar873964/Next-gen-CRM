"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MonitorDotIcon} from "lucide-react"

export function ThemeToggle() {
  const { setTheme } = useTheme() // Access the `setTheme` function from the `useTheme` hook

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <SunIcon className="mr-2"/>Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
         <MoonIcon className="mr-2"/> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
        <MonitorDotIcon className="mr-2 h-[1.2rem] w-[1rem] dark:rotate-0 dark:scale-100"/>System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
