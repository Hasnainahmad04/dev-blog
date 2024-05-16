import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <SignUp path="/sign-up" />
    </main>
  );
};

export default Page;
