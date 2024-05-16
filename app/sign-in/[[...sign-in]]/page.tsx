import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <SignIn path="/sign-in" />
    </main>
  );
};

export default Page;
