import React from "react";
import { ProductTable } from "./productTable";
import { fetchProducts } from "@/app/lib/data";

export const metadata = {
  title: "Products | CRM App",
};

async function getData() {
  const response = await fetchProducts();

  const formattedData = response.products.map((product) => ({
    title: product.title,
    price: product.price,
    description: product.desc,
    stock: product.stock,
    createdAt: product.createdAt,
    color: product.color,
    id: product._id.toString(),
  }));

  return formattedData;
}

export default async function page() {
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
