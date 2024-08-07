import { addEnquiry } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { fetchProducts, fetchCustomers } from "@/app/lib/data";
import { auth } from "@/auth";

export const metadata = {
  title: "Add Enquiry | CRM App",
};

export default async function page() {
  const session = await auth();
  const companyID = session?.user?.companyID;
  
  // Fetch products data
  const productsData = await fetchProducts("", companyID);
  const products = productsData?.products;

  // Fetch customers data
  const customersData = await fetchCustomers("", companyID);
  const customers = customersData?.customers;

  return (
    <div className="flex justify-center items-center md:py-10">
      <form action={addEnquiry}>
        {/* Add an Enquiry Card */}
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            <CardTitle className="text-xl">Add an Enquiry</CardTitle>
            <CardDescription>
              Create a contact log for a new enquiry.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                {/* Select customer */}
                <Label htmlFor="customer">Customer Name</Label>
                <Select id="customer" name="customer" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup label="customer">
                      {customers &&
                        customers.map((customer) => (
                          <SelectItem
                            key={customer._id.toString()}
                            value={customer._id.toString()}
                          >
                            {customer.customername}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                {/* Select product */}
                <Label htmlFor="product">Product Name</Label>
                {products && products.length > 0 ? (
                  <Select id="product" name="product">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup label="Products">
                        {products.map((product) => (
                          <SelectItem
                            key={product._id.toString()}
                            value={product._id.toString()}
                          >
                            {product.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-xs underline">No products are added.</p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex gap-2 mx-auto">
                  <div className="flex items-center space-x-2">
                    {/* Select enquiry type */}
                    <label
                      htmlFor="type"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Enquiry Type
                    </label>
                    <Select name="type" id="type">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Enquiry">Enquiry</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Support">Support</SelectItem>
                          <SelectItem value="Referral">Referral</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {/* Hidden input for company ID */}
                    <Input
                      id="companyID"
                      name="companyID"
                      type="hidden"
                      value={companyID}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex gap-2 mx-auto">
                  <div className="flex items-center space-x-2">
                    {/* Select enquiry status */}
                    <label
                      htmlFor="status"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Enquiry Status
                    </label>
                    <Select name="status" id="status">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="In Process">In Process</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <Button type="submit" className="w-full">
                Create New Enquiry Log
              </Button>
            </div>
          </CardContent>
          <CardFooter> All fields are mandatory</CardFooter>
        </Card>
      </form>
    </div>
  );
}
