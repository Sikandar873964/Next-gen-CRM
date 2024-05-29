import { ThemeToggle } from "@/components/theme-button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
export default function Home() {
  return (
    <div className="flex flex-col space-x-2 space-y-2 md:flex-row items-center justify-center h-screen">
        <div className="absolute top-0 left-0 p-6">
        <ThemeToggle />
      </div>
      <Link href="/login"  className="w-1/3">
        <Card className="hover:bg-primary/10 dark:hover:bg-primary-foreground/50 transition-colors">
          <CardHeader className="font-bold text-2xl">Login</CardHeader>{" "}
          <CardContent>Login as an existing user to the CRM system</CardContent>
        </Card>
      </Link>
      <Link href="/signup" className="w-1/3">
        {" "}
        <Card className="hover:bg-primary/10 dark:hover:bg-primary-foreground/50 transition-colors">
          <CardHeader className="font-bold text-2xl">Signup</CardHeader>{" "}
          <CardContent>Sign up as a new company into the CRM</CardContent>
        </Card>
      </Link>
    </div>
  );
}
