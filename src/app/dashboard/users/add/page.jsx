import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function page() {
  return (
    <form>
      {" "}
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle className="text-xl">Add new user</CardTitle>
          <CardDescription>
            Enter information to create a new user account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Name*</Label>
                <Input id="first-name" placeholder="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password*</Label>
                <Input id="password" type="password" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="is admin" />
                  <label
                    htmlFor="terms2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Make admin
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="is admin" />
                  <label
                    htmlFor="terms2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Is active
                  </label>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="123-456-7890" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                type="text"
                placeholder="Type your address here."
              />
            </div>
            <Button type="submit" className="w-full">
              Create user account
            </Button>
          </div>
        </CardContent>
        <CardFooter> Fields marked with * are required.</CardFooter>
      </Card>
    </form>
  );
}
