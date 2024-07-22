import React from "react";
// import { ContactTable } from "./contactTable";
import { fetchEnquiries } from "@/app/lib/data";
import { auth } from "@/auth";
import { DataTable
 } from "@/components/ui/data-table";
import { columns } from "./contactTableColumns";
export const metadata = {
  title: "Contact Logs | CRM App",
};

// Define the page component as an async function
export default async function page() {
  const session = await auth();
  const companyID = session?.user?.companyID;

  // Define a helper function to fetch and format the data
  async function getData() {
    const response = await fetchEnquiries("", companyID);

    const formattedData = response.enquiries
      .filter((enquiry) => enquiry.companyID === companyID)
      .map((enquiry) => ({
        name: enquiry.customer.customername,
        id: enquiry._id.toString(),
        contactType: enquiry.type,
        phone: enquiry.customer.phone,
        email: enquiry.customer.email,
        status: enquiry.status,
        createdDate: enquiry.createdAt,
        product: enquiry?.product?.title || "--",
      }));

    return formattedData;
  }

  // Call the getData function to fetch the data
  const data = await getData();

  // Render the page content
  return (
    <div>
      {/* Page title */}
      <div className="text-4xl tracking-wider font-semibold">Contact Logs</div>
      {/* Page description */}
      <p className="text-sm text-muted-foreground">
        Add, view, edit or remove customer contact entries
      </p>
      {/* Render the ContactTable component with the fetched data */}
      <DataTable
        data={data}
        columns={columns}
        addNewLink="/dashboard/contactlogs/add/"
        addNewText="Add new contact log"
      />
    </div>
  );
}
