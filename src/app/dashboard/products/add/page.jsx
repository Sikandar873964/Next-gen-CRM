import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PoundSterlingIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { addProduct } from "@/app/lib/actions";
import { auth } from "@/auth";

export const metadata = {
  title: "Add Product | CRM App",
};

// Define the page component
export default async function page() {

  // Authenticate the user
  const session = await auth();
  const companyID = session?.user?.companyID;

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <form
        action={addProduct}
        className="mx-auto grid max-w-full flex-1 auto-rows-max gap-4"
      >
        <div className="flex items-center gap-4">
          {/* Back button */}
          <Button variant="outline" size="icon" className="h-7 w-7" onclick="">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          {/* Page title */}
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            New Product
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            {/* Discard button */}
            <Button variant="outline" size="sm">
              Discard
            </Button>
            {/* Save button */}
            <Button size="sm" type="submit">
              Save Product
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>
                  Add details about the product here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    {/* Product name input */}
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      className="w-full"
                      placeholder="Enter product's name"
                      required
                    />
                    {/* Company ID input */}
                    <Input
                      id="companyID"
                      name="companyID"
                      type="hidden"
                      value={companyID}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    {/* Product description textarea */}
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="desc"
                      name="desc"
                      placeholder="Enter product's description"
                      className="min-h-32"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
                <CardDescription>
                  Enter additional details about the product here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* Size input */}
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  name="size"
                  type="string"
                  className="w-full"
                  placeholder="Size"
                />
                <div>
                  {/* Color input */}
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    name="color"
                    type="string"
                    className="w-full"
                    placeholder="Enter product's color"
                  />
                </div>

                {/* Category select */}
                {/* <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category" aria-label="Select category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mobiles">Mobiles</SelectItem>
                      <SelectItem value="computers">Computers</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Stock</CardTitle>
                <CardDescription>
                  Add number of stock units here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    {/* Stock input */}
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      className="w-full"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
                <CardDescription>Add a link to the image here</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Image input */}
                <Input
                  id="image"
                  name="image"
                  type="text"
                  className="w-full"
                  placeholder="https://example.com/image.jpg"
                />
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Product Price</CardTitle>
                <CardDescription>Add a link to the image here</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row items-center">
                {/* Pound sterling icon */}
                <PoundSterlingIcon className="h-6 w-6 mr-2 text-muted-foreground" />
                {/* Price input */}
                <Input
                  id="price"
                  name="price"
                  type="number"
                  className="w-full"
                  placeholder="0"
                  required
                />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          {/* Discard and save buttons */}
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm" type="submit">Save Product</Button>
        </div>
      </form>
    </main>
  );
}
