import React from "react";
import { CustomerTable } from "./customerTable";
import { fetchCustomers } from "@/app/lib/data";
import { auth } from "@/auth";

export const metadata = {
  title: "Customers | CRM App",
};

export default async function page() {

const session = await auth();
const companyID = session?.user?.companyID;

  async function getData() {
    const response = await fetchCustomers("", companyID);

    const formattedData = response.customers.map((customer) => ({
      name: customer.customername,
      id: customer._id.toString(),
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      createdDate: customer.createdAt,
      product: customer?.product?.title || '--',
    }));

    return formattedData;
  }
  
  const data = await getData();

  return (
    <div>
      <div className="text-4xl tracking-wider font-semibold">Customers</div>
      <p className="text-sm text-muted-foreground">
        Add, view, edit or remove Customers from the CRM
      </p>
      <CustomerTable data={data} />
    </div>
  );
}
