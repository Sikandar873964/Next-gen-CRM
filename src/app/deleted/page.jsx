//Global 404 error page for the application

import { ThemeToggle } from "@/components/theme-button";
import React from "react";
import { Button } from "@/components/ui/button";


export const metadata = {
    title: 'Company Deleted',
  }

function page() {

  return (
    <div>
      <div className="absolute top-0 left-0 p-6">
        <ThemeToggle />
      </div>
      <div className="grid h-screen place-content-center px-4">
        <div className="text-center">
          <h1 className="text-9xl mb-4 font-black flex justify-center items-center text-gray-600 dark:text-gray-200">
            :(
          </h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-400 sm:text-4xl">
            Your company has been Deleted
          </p>

          <p className="mt-4 text-gray-500">
       Changed your mind?
          </p>

          <Button className="w-1/2 my-6">
            <a
              href="/signup"
              
            >{" "}
            Sign up again</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
