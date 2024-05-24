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
export const metadata = {
  title: "Edit customer | CRM App",
};

export default async function page(params) {
  // console.log(params, "is the params");
  const { id } = params.params;
  // console.log(id, "is the id");
  const customer = await fetchCustomer(id);
  // console.log(customer, "is the customer");

  const productsData = await fetchProducts();
  const products = productsData?.products;
  // console.log(products);

  return (
    <form action={updateCustomer}>
      {" "}
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle className="text-xl">Update customer: {customer.customername}</CardTitle>
          <CardDescription>
           Update existing customer account details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="customername">Name*</Label>
                <Input
                  id="customername"
                  placeholder="John Doe"
                  name="customername"
                  required
                  defaultValue={customer.customername}
                />
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
                  defaultValue={customer.email}
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
                  defaultValue={customer.img}
                />
              </div>
              <div className="flex gap-2 mx-auto w-full">
                <div className="w-full gap-2">
                  <Label htmlFor="product">Product*</Label>
                  <Select id="product" name="product" required>
                    <SelectTrigger>
                      <SelectValue 
                      // placeholder={customer.product.title}
                      placeholder="Select a product"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup label="Products">
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
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                type="text"
                placeholder="Type your address here."
                defaultValue={customer.address}
              />
            </div>
            <Button type="submit" className="w-full">
              Update customer data
            </Button>
          </div>
        </CardContent>
        <CardFooter> Fields marked with * are required.</CardFooter>
      </Card>
    </form>
  );
}
