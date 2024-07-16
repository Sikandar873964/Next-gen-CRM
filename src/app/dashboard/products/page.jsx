import React from "react";
import { ProductTable } from "./productTable";
import { fetchProducts } from "@/app/lib/data";
import { auth } from "@/auth";

export const metadata = {
  title: "Products | CRM App",
};

export default async function page() {

  const session = await auth();
  const companyID = session?.user?.companyID;

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
  const data = await getData();

  return (
    <div>
      <div className="text-4xl tracking-wider font-semibold">Products</div>
      <p className="text-sm text-muted-foreground">
        Add, view, edit or remove Products from the CRM
      </p>
      <ProductTable data={data} />
    </div>
  );
}
