"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { signup } from "@/app/lib/actions";

export default function SignInForm() {
  const [state, formAction] = useFormState(signup, undefined);
  return (
    <form action={formAction}>
      {" "}
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">User Name</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="******" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="companyid">Company ID</Label>
              <Input
                id="companyid"
                type="companyid"
                name="companyid"
                placeholder="Enter alphanumeric string (ex: 123abc)"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                type="company"
                name="company"
                placeholder="Company name"
                required
              />
            </div>
            <div className="hidden items-center space-x-2">
                  <label
                    htmlFor="isAdmin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Is Admin
                  </label>
                  <Select name="isAdmin" id="isAdmin" defaultValue="true">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                      <SelectItem value="true">Yes</SelectItem>
                     
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
          <div className="mt-4 text-left text-sm text-primary/60">
         After creating an account you'll be redirected to the login page to log in using your new credentials
            
          </div>
        </CardContent>
      </Card>
      {state && state}
    </form>
  );
}
