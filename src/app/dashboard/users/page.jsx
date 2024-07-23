import React from "react";
import { fetchUsers } from "@/app/lib/data";
import { auth } from "@/auth";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/dashboard/users/userTableColumns"

export const metadata = {
  title: "Users | CRM App",
};

// Define the page component
export default async function page() {
  // Authenticate the user
  const session = await auth();
  const companyID = session?.user?.companyID;

  // Function to fetch and format user data
  async function getData() {
    const response = await fetchUsers("", companyID);

    const formattedData = response.users.map((user) => ({
      role: user.isAdmin ? "Administrator" : "not admin",
      email: user.email,
      name: user.username,
      profile_Picture: user.img,
      status: user.isActive ? "active" : "inactive",
      createdDate: user.createdAt,
      id: user._id.toString(),
    }));
    return formattedData;
  }

  // Fetch the data
  const data = await getData();

  // Render the page
  return (
    <div>
      {/* Page title */}
      <div className="text-4xl tracking-wider font-semibold"> Users</div>
      {/* Page description */}
      <p className="text-sm text-muted-foreground">
        Add, view, edit or remove users from the CRM
      </p>

      {/* User table */}
      <DataTable
        data={data}
        columns={columns}
        addNewLink="/dashboard/users/add/"
        addNewText="Add new user"
      />
    </div>
  );
}
