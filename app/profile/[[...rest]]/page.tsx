import { UserProfile } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  return (
    <main className="min-h-screen flex w-full justify-center items-center my-6">
      <UserProfile path="/profile" />
    </main>
  );
};

export default Page;
