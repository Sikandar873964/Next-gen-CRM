import Link from "next/link";
import { addUser } from "@/app/lib/actions";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export const metadata = {
  title: "Add User | CRM App"
}


export default function page() {
  return (
    <form action={addUser}>
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
                <Label htmlFor="username">Name*</Label>
                <Input id="username" placeholder="John Doe" name="username" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password*</Label>
                <Input id="password" type="password" name="password" placeholder="...." />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Profile Picture URL</Label>
                <Input
                  id="img"
                  type="url"
                  name="img"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="flex gap-2 mx-auto">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="isAdmin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Is Admin
                  </label>
                  <Select name="isAdmin" id="isAdmin">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                      <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="term2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Is active
                  </label>
                  <Select name="isActive" id="isActive">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="123-456-7890" name="phone" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
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
