import React from "react";
import { ContactTable } from "./contactTable";
import { fetchEnquiries } from "@/app/lib/data";

export const metadata = {
    title: 'Contact Logs | CRM App',
  }

  async function getData() {
    const response = await fetchEnquiries();
    console.log(response, "is the response");

    const formattedData = response.enquiries.map((enquiry) => ({
      name: enquiry.customername,
      id: enquiry._id.toString(),
      phone: enquiry.phone,
      email: enquiry.email,
      address: enquiry.address,
      createdDate: enquiry.createdAt,
      product: enquiry.product.title, // Only take the product title
    })
  )
    return formattedData;
  }

  export default async function page() {
    const data = await getData();

    return (
      <div>
        <div className="text-4xl tracking-wider font-semibold">Contact Logs</div>
        <p className="text-sm text-muted-foreground">Add, view, edit or remove customer contact entries</p>
     <ContactTable data={data} />
      </div>
    );
  }


