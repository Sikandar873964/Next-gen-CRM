import React from "react";
import { ProductTable } from "./productTable";

export const metadata = {
  title: 'Products | CRM App',
}

function page() {
  return (
    <div>
      <div className="text-4xl tracking-wider font-semibold">Products</div>
      <p className="text-sm text-muted-foreground">
        Add, view, edit or remove Products from the CRM
      </p>
      <ProductTable />
    </div>
  );
}

export default page;
