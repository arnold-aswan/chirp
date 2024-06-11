import { currentUser } from "@clerk/nextjs/server";
import AddPost from "@/components/forms/AddPost";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
    // return null;
  }

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Add a Post</h1>

      <AddPost userId={userInfo._id.toString()} />
    </>
  );
};

export default page;
