import React from "react";

export const metadata = {
    title: 'Users | CRM App',
  }

  async function getData() {
  }

  export default async function page() {
    const data = await getData();

    return (
      <div>
        <div className="text-4xl tracking-wider font-semibold">Contact Logs</div>
        <p className="text-sm text-muted-foreground">Add, view, edit or remove customer contact entries</p>
     
      </div>
    );
  }


