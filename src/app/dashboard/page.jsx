import React from "react";
import {
  CircleUser,
  CreditCard,
  DollarSign,
  PhoneIcon,
  Users,
  UsersRoundIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchUsers } from "../lib/data";
import { fetchCustomers } from "../lib/data";
import { fetchProducts } from "../lib/data";
import { fetchEnquiries } from "../lib/data";
import { auth } from "@/auth";

async function page() {
  const session = await auth()
  const companyID = session?.user?.companyID;

  let users = await fetchUsers("", companyID);
  users = users.users.filter(user => user.companyID === companyID);
  let customers = await fetchCustomers("", companyID);
  customers = customers.customers.filter(customer => customer.companyID === companyID);
  let products = await fetchProducts("", companyID);
  products = products.products.filter(product => product.companyID === companyID);
  let enquiries = await fetchEnquiries("", companyID);
  enquiries = enquiries.enquiries.filter(enquiry => enquiry.companyID === companyID);

  // console.log(users, customers, products, enquiries);
  return (
    <div className="space-y-4">
      <h1
        className="text-3xl md:text-5xl font-semibold
      "
      >
        Dashboard
      </h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Enquiries
            </CardTitle>

            <PhoneIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enquiries.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersRoundIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />


          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-2 mt-4">
        {" "}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
             Authorization Levels
            </CardTitle>
            <CircleUser className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Role Based Access Control</div>
            <CardDescription className="mt-2">
             Role based access control ensures only authorized users can access the data.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dynamic Updates
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Real-time Data</div>
            <CardDescription className="mt-2">
              Everything is updated fast and in real time using Next.js' server actions!
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Supports everyone
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Multi Tenant Architecture</div>
            <CardDescription className="mt-2">
              Multi tenant architecture of the database ensures only your data is visible to you.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default page;
