import React from "react";
import { fetchCustomers } from "@/app/lib/data";
import { auth } from "@/auth";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./customerTableColumns";

export const metadata = {
  title: "Customers | CRM App",
};

export default async function page() {
  // Authenticate the user and get the session
  const session = await auth();
  const companyID = session?.user?.companyID;

  // Function to fetch and format customer data
  async function getData() {
    const response = await fetchCustomers("", companyID);

    const formattedData = response.customers.map((customer) => ({
      profile_Picture: customer.img,
      name: customer.customername,
      id: customer._id.toString(),
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      createdDate: customer.createdAt,
      product: customer?.product?.title || "--",
    }));

    return formattedData;
  }

  // Fetch the data
  const data = await getData();

  return (
    <div className="flex flex-col">
      {/* Heading */}
      <div className="text-4xl tracking-wider font-semibold">Customers</div>

      {/* Description */}
      <p className="text-sm text-muted-foreground">
        Add, view, edit or remove Customers from the CRM
      </p>

      {/* Render the customer table */}

      <DataTable
        data={data}
        columns={columns}
        addNewLink="/dashboard/customers/add/"
        addNewText="Add new customer"
      />
    </div>
  );
}
