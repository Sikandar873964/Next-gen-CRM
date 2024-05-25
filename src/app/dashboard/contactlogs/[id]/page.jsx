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
import {
  fetchProducts,
  fetchCustomer,
  fetchEnquiry,
  fetchProduct,
} from "@/app/lib/data";
import { updateEnquiry } from "@/app/lib/actions";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Update Enquiry | CRM App",
};

export default async function page(params) {
  // console.log(params, "is the params");
  const { id } = params.params;
  // console.log(id, "is the id");

  const productsData = await fetchProducts();
  const products = productsData?.products;

  const enquiryData = await fetchEnquiry(id);
  // const enquiry = enquiryData?.enquiry;
  // console.log(enquiryData, "is the enquiry data");

  const productID = enquiryData.product.toString();
  const product = await fetchProduct(productID);
  const productTitle = product.title;
  // console.log(productTitle, "is the product title");
  // console.log(product, "is the product data");

  const customerData = await fetchCustomer(enquiryData.customer.toString());
  // console.log(customerData, "is the customer data");

  async function handleEdit(formData) {
    try {
      await updateEnquiry(formData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex justify-center items-center md:py-14">
      <form action={updateEnquiry}>
        {" "}
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            <CardTitle className="text-xl">
              Update Enquiry for: {customerData.customername}
            </CardTitle>
            <CardDescription>
              Update contact log information for existing enquiry.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <input
                  type="hidden"
                  name="customer"
                  value={enquiryData.customer.toString()}
                />
                <input
                  type="hidden"
                  name="id"
                  value={enquiryData._id.toString()}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="product">Product Name</Label>
                <Select id="product" name="product" required>
                  <SelectTrigger>
                    <SelectValue placeholder={productTitle} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup label="Products">
                      {products.map((product) => (
                        <SelectItem
                          key={product._id.toString()}
                          value={product._id.toString()}
                          defaultValue={product.title}
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
                        <SelectValue placeholder={enquiryData.type} />
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
              <div className="grid grid-cols-1 gap-4">
                <div className="flex gap-2 mx-auto">
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor="status"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Enquiry Status
                    </label>
                    <Select name="status" id="status">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={enquiryData.status} />
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

              <Button type="submit" className="w-full">
                Update exisitng Enquiry Log
              </Button>
            </div>
          </CardContent>
          <CardFooter> All fields are mandatory</CardFooter>
        </Card>
      </form>
    </div>
  );
}
