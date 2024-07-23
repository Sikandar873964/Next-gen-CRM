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
import { auth } from "@/auth";

export const metadata = {
  title: "Update Enquiry | CRM App",
};

export default async function page(params) 
{
  const session = await auth();
  console.log(session, "is the recieved session");
  const companyID = session?.user?.companyID;

  // Extract the 'id' parameter from the 'params' object
  const { id } = params.params;

  // Fetch products data
  const productsData = await fetchProducts("", companyID);
  const products = productsData?.products;

  // Fetch enquiry data based on the 'id'
  const enquiryData = await fetchEnquiry(id);

  // Fetch product data based on the product ID from the enquiry data
  const productID = enquiryData.product.toString();
  const product = await fetchProduct(productID);
  const productTitle = product?.title;

  // Fetch customer data based on the customer ID from the enquiry data
  const customerData = await fetchCustomer(enquiryData.customer.toString());

  // Handle form submission to update the enquiry
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
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            {/* Display the customer name */}
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
                {/* Hidden input fields for customer and enquiry ID */}
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
                {/* Select input for product */}
                <Select id="product" name="product" required>
                  <SelectTrigger>
                    <SelectValue placeholder={productTitle} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup label="Products">
                      {/* Render select options for products */}
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
                    {/* Select input for enquiry type */}
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
                    {/* Select input for enquiry status */}
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

              {/* Button to submit the form */}
              <Button type="submit" className="w-full">
                Update existing Enquiry Log
              </Button>
            </div>
          </CardContent>
          <CardFooter> All fields are mandatory</CardFooter>
        </Card>
      </form>
    </div>
  );
}
