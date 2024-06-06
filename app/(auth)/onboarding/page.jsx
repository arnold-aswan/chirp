import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");
  const userData = {
    id: user?.id,
    username: user.username,
    name: `${user.firstName} ${user.lastName}`,
    email: user.emailAddresses[0].emailAddress,
    bio: user.bio || "",
    image: user.imageUrl,
  };
  return (
    <main className="mx-auto flex flex-col justify-start max-w-3xl text-white">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-white font-bold">
        Complete your profile now to use Chirp
      </p>

      <section className="mt-9 p-10 bg-dark-brown rounded-xl">
        <AccountProfile user={userData} />
      </section>
    </main>
  );
};

export default page;
