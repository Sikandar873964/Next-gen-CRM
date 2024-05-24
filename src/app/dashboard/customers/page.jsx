import React from "react";
import { CustomerTable } from "./CustomerTable";
import { fetchCustomers } from "@/app/lib/data";

export const metadata = {
  title: "Customers | CRM App",
};
async function getData() {
  const response = await fetchCustomers();

  const formattedData = response.customers.map((customer) => ({
    name: customer.customername,
    id: customer._id.toString(),
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
    createdDate: customer.createdAt,
    product: customer.product.title, // Only take the product title
  }))

  return formattedData;
}

export default async function page() {
  const data = await getData();

  return (
    <div>
      <div className="text-4xl tracking-wider font-semibold">Customers</div>
      <p className="text-sm text-muted-foreground">
        Add, view, edit or remove Customers from the CRM
      </p>
      <CustomerTable data={data}/>
    </div>
  );
}
