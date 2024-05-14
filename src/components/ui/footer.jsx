import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <div>
      <footer className="border-t w-full bottom-0 text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <Image
            src="/next.svg"
            width={50}
            height={50}
            alt="CRM Logo"
            className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
          />

          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © {new Date().getFullYear()} Next-CRM
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center items-center sm:justify-start">
            <p> A work in progress by Sikandar </p>
          </span>
        </div>
      </footer>
    </div>
  );
}
