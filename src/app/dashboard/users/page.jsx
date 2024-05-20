import React from "react";
import { UserTable } from "./userTable";
import { fetchUsers } from "@/app/lib/data";

export const metadata = {
    title: 'Users | CRM App',
  }

  async function getData() {
    const response = await fetchUsers();

    const formattedData = response.users.map((user) => ({
      role: user.isAdmin ? 'Administrator' : 'not admin',
      email: user.email,
      name: user.username,
      profile_Picture: user.img,
      status: user.isActive ? 'active' : 'inactive',
      createdDate: user.createdAt,
      id: user._id.toString(),
    }));
  console.log(formattedData, "is the formatted data");
    return formattedData;
  }

  export default async function page() {
    const data = await getData();

    return (
      <div>
        <div className="text-4xl tracking-wider font-semibold"> Users</div>
        <p className="text-sm text-muted-foreground">Add, view, edit or remove users from the CRM</p>
        <UserTable data={data} />
      </div>
    );
  }


