"use client";
import Link from "next/link";
import React from "react";
import DropDownandInput from "./DropDownandInput";


const UsersPage = () => {
  return (
    <>
      <div className="flex flex-col justify-between">
        <h1 className="py-10 text-center bg-teal-300 mb-6 text-2xl">
          UsersPage
        </h1>
        <DropDownandInput />
        <Link href="/" className="bg-black link-accent my-3">
          Go back to Home
        </Link>
      </div>
    </>
  );
};

export default UsersPage;
