import {updateUser } from "@/app/lib/actions";
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
import { fetchUser } from "@/app/lib/data";


export const metadata = {
  title: "Edit User | CRM App"
}


export default async function page(params) {
  console.log(params, "is the params")
  const { id } = params.params;
  console.log(id, "is the id")
  const user = await fetchUser(id);
  console.log(user);

  return (
    // Form to update user
    <form action={updateUser}>
      {" "}
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle className="text-xl">Update user: {user.username}</CardTitle>
          <CardDescription>
            Enter information to create a new user account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                {/* Label and input for username */}
                <Label htmlFor="username">Name*</Label>
                <Input id="username" placeholder="John Doe" name="username" required defaultValue={user.username} />
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
                  defaultValue={user.email}
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
                  defaultValue={user.img}
                />
              </div>
              <div className="flex gap-2 mx-auto">
                {/* Is Admin select */}
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="isAdmin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Is Admin
                  </label>
                  <Select name="isAdmin" id="isAdmin" defaultValue={user.isAdmin ? "true" : "false"}>
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
                {/* Is Active select */}
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="term2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Is active
                  </label>
                  <Select name="isActive" id="isActive" defaultValue={user.isActive ? "true" : "false"}>
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
              <Input id="phone" placeholder="123-456-7890" name="phone" defaultValue={user.phone} />
            </div>
            <div className="grid gap-2">
              {/* Label and input for address */}
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                type="text"
                placeholder="Type your address here."
                defaultValue={user.address}
              />
            </div>
            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Update user account
            </Button>
          </div>
        </CardContent>
        <CardFooter> Fields marked with * are required.</CardFooter>
      </Card>
    </form>
  );
}
