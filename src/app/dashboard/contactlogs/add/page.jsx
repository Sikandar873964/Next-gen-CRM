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
import { fetchProducts, fetchCustomers } from "@/app/lib/data";

export const metadata = {
  title: "Add Enquiry | CRM App",
};

export default async function page() {
  const productsData = await fetchProducts();
  const products = productsData?.products;

  const customersData = await fetchCustomers();
  const customers = customersData?.customers;
  console.log(customers);

  return (
    <div className="flex justify-center items-center">
      <form action={addEnquiry}>
        {" "}
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
                <Label htmlFor="customer">customer Name</Label>
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
                <Label htmlFor="product">Product Name</Label>
                <Select id="product" name="product" required>
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
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex gap-2 mx-auto">
                  <div className="flex items-center space-x-2">
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
                  </div>
                </div>
              </div>

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
