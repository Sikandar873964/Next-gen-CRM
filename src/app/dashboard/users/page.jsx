import React from "react";
import { UserTable } from "./userTable";

export const metadata = {
    title: 'Users | CRM App',
  }

function page() {
  return (
    <div>
      <div className="text-4xl tracking-wider font-semibold"> Users</div>
      <p className="text-sm text-muted-foreground">Add, view, edit or remove users from the CRM</p>
      <UserTable />
    </div>
  );
}

export default page;
