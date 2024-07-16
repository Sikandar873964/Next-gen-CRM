import React from "react";
import { ContactTable } from "./contactTable";
import { fetchEnquiries } from "@/app/lib/data";
import { auth } from "@/auth";

export const metadata = {
    title: 'Contact Logs | CRM App',
  }

  export default async function page() {

    const session = await auth();
    const companyID = session?.user?.companyID;

    async function getData() {
      const response = await fetchEnquiries("", companyID);
  
      const formattedData = response.enquiries
      .filter(enquiry => enquiry.companyID === companyID)
      .map((enquiry) => ({
        name: enquiry.customer.customername,
        id: enquiry._id.toString(),
        contactType: enquiry.type,
        phone: enquiry.customer.phone,
        email: enquiry.customer.email,
        status: enquiry.status,
        createdDate: enquiry.createdAt,
        product: enquiry?.product?.title || '--',
      })
    )
      return formattedData;
    }

    const data = await getData();

    return (
      <div>
        <div className="text-4xl tracking-wider font-semibold">Contact Logs</div>
        <p className="text-sm text-muted-foreground">Add, view, edit or remove customer contact entries</p>
     <ContactTable data={data} />
      </div>
    );
  }


