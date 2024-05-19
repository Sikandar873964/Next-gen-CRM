import { addCustomer } from "@/app/lib/actions";
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
import { fetchProducts } from "@/app/lib/data";

export const metadata = {
  title: "Add Customer | CRM App",
};

export default async function page() {
  const productsData = await fetchProducts();
  const products = productsData?.products;
  console.log(products);

  return (
    <form action={addCustomer}>
      {" "}
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle className="text-xl">Add new customer</CardTitle>
          <CardDescription>
            Enter information to create a new customer log.
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
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone*</Label>
                <Input
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder="123-456-7890"
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
                  required
                />
              </div>
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
              <div className="grid gap-2">
              <Label htmlFor="product">Product*</Label>
              <Select id="product" name="product" required>
                <SelectTrigger>
                <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup label="Products">
                    {products.map((product) => (
                      <SelectItem key={product._id.toString()} value={product._id.toString()}>
                        {product.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
              Create customer
            </Button>
          </div>
        </CardContent>
        <CardFooter> Fields marked with * are required.</CardFooter>
      </Card>
    </form>
  );
}
