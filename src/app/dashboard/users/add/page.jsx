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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { auth } from "@/auth";

export const metadata = {
  title: "Add User | CRM App"
}

// Define the page component
export default async function page() {

  // Authenticate the user
  const session = await auth();
  const companyID = session?.user?.companyID;

  return (
    <form action={addUser}>
      {/* Card component */}
      <Card className="mx-auto max-w-xl">
        {/* Card header */}
        <CardHeader>
          <CardTitle className="text-xl">Add new user</CardTitle>
          <CardDescription>
            Enter information to create a new user account.
          </CardDescription>
        </CardHeader>
        {/* Card content */}
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                {/* Label and input for username */}
                <Label htmlFor="username">Name*</Label>
                <Input id="username" placeholder="John Doe" name="username" required />
              </div>
              <div className="grid gap-2">
                {/* Label and input for password */}
                <Label htmlFor="password">Password*</Label>
                <Input id="password" type="password" name="password" placeholder="...." />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                {/* Label and input for email */}
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
                {/* Label and input for profile picture URL */}
                <Label htmlFor="email">Profile Picture URL</Label>
                <Input
                  id="img"
                  type="url"
                  name="img"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {/* Hidden input for company ID */}
              <Input
                id="companyID"
                name="companyID"
                type="hidden"
                value={companyID}
                required
              />
              <div className="flex gap-2 mx-auto">
                <div className="flex items-center space-x-2">
                  {/* Label and select for isAdmin */}
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
                  {/* Label and select for isActive */}
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
              {/* Label and input for phone */}
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="123-456-7890" name="phone" />
            </div>
            <div className="grid gap-2">
              {/* Label and textarea for address */}
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                type="text"
                placeholder="Type your address here."
              />
            </div>
            {/* Submit button */}
            <Button type="submit" className="w-full">
              Create user account
            </Button>
          </div>
        </CardContent>
        {/* Card footer */}
        <CardFooter> Fields marked with * are required.</CardFooter>
      </Card>
    </form>
  );
}
