import React from "react";
import { fetchProducts } from "@/app/lib/data";
import { auth } from "@/auth";
import { columns } from "./productTableColumns";
import { DataTable } from "@/components/ui/data-table";

export const metadata = {
  title: "Products | CRM App",
};

// Define the page component as an async function
export default async function page() {
  const session = await auth();
  const companyID = session?.user?.companyID;

  // Define a nested async function to fetch and format the data
  async function getData() {
    const response = await fetchProducts("", companyID); // Pass an empty string as query and the companyID

    const formattedData = response.products.map((product) => ({
      title: product.title,
      price: product.price,
      description: product.desc,
      stock: product.stock,
      createdAt: product.createdAt,
      color: product.color,
      size: product.size,
      id: product._id.toString(),
    }));

    return formattedData;
  }

  // Call the nested function to get the data
  const data = await getData();

  // Render the page component
  return (
    <div>
      {/* Heading */}
      <div className="text-4xl tracking-wider font-semibold">Products</div>
      {/* Description */}
      <p className="text-sm text-muted-foreground">
        Add, view, edit or remove Products from the CRM
      </p>
      {/* Render the ProductTable component with the data */}

      <DataTable
        data={data}
        columns={columns}
        addNewLink="/dashboard/products/add/"
        addNewText="Add new product"
      />
    </div>
  );
}
