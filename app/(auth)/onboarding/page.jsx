import AccountProfile from "@/components/forms/AccountProfile";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const user = await currentUser();
  console.log(user);
  const userInfo = {};
  const userData = {
    id: user?.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses.emailAddress,
    bio: user.bio || "",
    image: user.imageUrl,
  };
  return (
    <main className="mx-auto flex flex-col justify-start max-w-3xl">
      <h1>Onboarding</h1>
      <p>Complete your profile now to use Chirp</p>

      <section className="mt-9 p-10 bg-gray-100">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
};

export default page;
