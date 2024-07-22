"use client";
import React from "react";
import { LayoutDashboardIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Footer() {
  const { data: session } = useSession();
  console.log (session);

  return (
    <div>
      <footer className="border-t w-full bottom-0 text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col justify-between space-y-3">
          <div>
            <LayoutDashboardIcon className="h-8 w-8 bg-primary text-white dark:text-black p-1 rounded-full inline mx-2 md:mx-0" />
            <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4 inline">
              © {new Date().getFullYear()} Next-CRM
            </p>
          </div>
          {session ? (
            <p className="text-center">Session valid until: {session.expires && new Date(session.expires).toLocaleString('en-GB')}</p>
          ) : (
            <p>No active session</p>
          )}
        </div>
      </footer>
    </div>
  );
}
