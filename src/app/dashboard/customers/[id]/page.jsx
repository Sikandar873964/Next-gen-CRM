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
import { updateCustomer } from "@/app/lib/actions";
import { fetchCustomer } from "@/app/lib/data";
import { fetchProducts } from "@/app/lib/data";
import { auth } from "@/auth";

export const metadata = {
  title: "Edit customer | CRM App",
};

export default async function page(params) {

 // Authenticate the user and get the session
 const session = await auth();
 const companyID = session?.user?.companyID;

  // Extract the 'id' parameter from the 'params' object
  const { id } = params.params;
  console.log(id, "is the id");

  // Fetch the customer data using the 'id'
  const customer = await fetchCustomer(id);

  // Fetch the products data
  const productsData = await fetchProducts("", companyID);
  const products = productsData?.products;
  console.log(products, "are the products");

  return (
    <form action={updateCustomer}>
      {/* Card component */}
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          {/* Card title */}
          <CardTitle className="text-xl">Update customer: {customer.customername}</CardTitle>
          {/* Card description */}
          <CardDescription>
            Update existing customer account details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                {/* Label and input for customer name */}
                <Label htmlFor="customername">Name*</Label>
                <Input
                  id="customername"
                  placeholder="John Doe"
                  name="customername"
                  required
                  defaultValue={customer.customername}
                />
                {/* Hidden input for customer id */}
                <Input
                  id="id"
                  name="id"
                  type="hidden"
                  required
                  defaultValue={id}
                />
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
                  defaultValue={customer.email}
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
                  defaultValue={customer.img}
                />
              </div>
              <div className="flex gap-2 mx-auto w-full">
                <div className="w-full gap-2">
                  {/* Label and select for product */}
                  <Label htmlFor="product">Product*</Label>
                  <Select id="product" name="product" required>
                    <SelectTrigger>
                      {/* Placeholder for selected product */}
                      <SelectValue 
                      // placeholder={customer.product.title}
                      placeholder="Select a product"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup label="Products">
                        {/* Iterate over products and create select options */}
                        {products.map((product) => (
                          <SelectItem
                            key={product._id.toString()}
                            value={product._id.toString()}
                            defaultValue={customer.product._id.toString()}
                          >
                            {product.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              {/* Label and input for phone */}
              <Label htmlFor="phone">Phone*</Label>
              <Input
                id="phone"
                placeholder="123-456-7890"
                name="phone"
                defaultValue={customer.phone}
                required
              />
            </div>
            <div className="grid gap-2">
              {/* Label and textarea for address */}
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                type="text"
                placeholder="Type your address here."
                defaultValue={customer.address}
              />
            </div>
            {/* Submit button */}
            <Button type="submit" className="w-full">
              Update customer data
            </Button>
          </div>
        </CardContent>
        {/* Card footer */}
        <CardFooter> Fields marked with * are required.</CardFooter>
      </Card>
    </form>
  );
}
