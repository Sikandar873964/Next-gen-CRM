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
import HomePageGreeting from "@/components/ui/homePageGreeting";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function page() {
  const session = await auth();
  const companyID = session?.user?.companyID;

  async function getCustomerData() {
    const response = await fetchCustomers("", companyID);
    const formattedData = response.customers
      .filter((customer) => customer.companyID === companyID)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map((customer) => ({
        profile_Picture: customer.img,
        name: customer.customername,
        id: customer._id.toString(),
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        createdDateTime: new Date(customer.createdAt).toLocaleString(),
        product: customer?.product?.title || '--',
      }));
  
    return formattedData;
  }

  async function getEnquiryData() {
    const response = await fetchEnquiries("", companyID);
    const formattedData = response.enquiries
      .filter((enquiry) => enquiry.companyID === companyID)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map((enquiry) => ({
        product: enquiry.product?.title || '--',
        type: enquiry.type,
        status: enquiry.status,
        dateTime: new Date(enquiry.createdAt).toLocaleString(),
        email: enquiry.customer?.email || '--',
      }));
  console.log(formattedData);
    return formattedData;
  }

  const [users, customers, products, enquiries, customerData, enquiryData] = await Promise.all([
    fetchUsers("", companyID),
    fetchCustomers("", companyID),
    fetchProducts("", companyID),
    fetchEnquiries("", companyID),
    getCustomerData(),
    getEnquiryData(),
  ]);

  const filteredUsers = users.users.filter((user) => user.companyID === companyID);
  const filteredCustomers = customers.customers.filter((customer) => customer.companyID === companyID);
  const filteredProducts = products.products.filter((product) => product.companyID === companyID);
  const filteredEnquiries = enquiries.enquiries.filter((enquiry) => enquiry.companyID === companyID);

  return (
    <div className="space-y-4">
      {/* <h1 className="text-3xl md:text-5xl font-semibold">Dashboard</h1> */}
      <HomePageGreeting />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 overflow-auto">
        {/* Enquiries Card */}
        <Link href="/dashboard/contactlogs">
          {" "}
          <Card className="hover:bg-secondary/40 dark:hover:bg-primary-foreground/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enquiries</CardTitle>
              <PhoneIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{filteredEnquiries.length}</div>
            </CardContent>
          </Card>
        </Link>
        {/* Users Card */}
        <Link href="/dashboard/users">
          {" "}
          <Card className="hover:bg-secondary/40 dark:hover:bg-primary-foreground/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <UsersRoundIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredUsers.length}</div>
            </CardContent>
          </Card>
        </Link>

        {/* Products Card */}
        <Link href="/dashboard/products">
          {" "}
          <Card className="hover:bg-secondary/40 dark:hover:bg-primary-foreground/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredProducts.length}</div>
            </CardContent>
          </Card>
        </Link>
        {/* Customers Card */}
        <Link href="/dashboard/customers">
          {" "}
          <Card className="hover:bg-secondary/40 dark:hover:bg-primary-foreground/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredCustomers.length}</div>
            </CardContent>
          </Card>
        </Link>

        {/* Recent Customers Card */}
</div>
<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Customers</CardTitle>
              <CardDescription>Recent customers added to the database</CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/dashboard/customers">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden xl:table-cell">Product</TableHead>
                  <TableHead className="hidden xl:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerData.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={customer.profile_Picture} alt={customer.name} />
                          <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-xs text-muted-foreground">{customer.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">{customer.product}</TableCell>
                    <TableCell className="hidden xl:table-cell"> <div>
                <div className="font-medium">{customer.createdDateTime.split(',')[0]}</div>
                <div className="text-xs text-muted-foreground">{customer.createdDateTime.split(',')[1]}</div>
              </div></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

     {/* Recent Enquiries Card */}
<Card className="xl:col-span-2">
  <CardHeader className="flex flex-row items-center">
    <div className="grid gap-2">
      <CardTitle>Enquiries</CardTitle>
      <CardDescription>Recently posted product enquiries</CardDescription>
    </div>
    <Button asChild size="sm" className="ml-auto gap-1">
      <Link href="/dashboard/contactlogs">
        View All
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </Button>
  </CardHeader>
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {enquiryData.map((enquiry, index) => (
          <TableRow key={index}>
            <TableCell>
              <div>
                <div className="font-medium">{enquiry.product}</div>
                <div className="text-xs text-muted-foreground">by {enquiry.email}</div>
              </div>
            </TableCell>
            <TableCell>{enquiry.type}</TableCell>
            <TableCell>
              <Badge className="text-xs" variant="outline">
                {enquiry.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">{enquiry.dateTime.split(',')[0]}</div>
                <div className="text-xs text-muted-foreground">{enquiry.dateTime.split(',')[1]}</div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardContent>
</Card>
      </div>
    </div>
  );
}

export default page;
