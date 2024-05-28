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
  const users = await fetchUsers();
  const customers = await fetchCustomers();
  const products = await fetchProducts();
  const enquiries = await fetchEnquiries();

  const session = await auth()
  console.log(session, "session")
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
            <div className="text-2xl font-bold">{enquiries.count}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersRoundIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.count}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.count}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />


          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.count}</div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-2 mt-4">
        {" "}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Customer Support
            </CardTitle>
            <CircleUser className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24/7 Live Chat</div>
            <CardDescription className="mt-2">
              Our CRM app provides 24/7 live chat support to assist you with any
              questions or issues you may have.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sales Analytics
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
      </div>
    </div>
  );
}

export default page;
