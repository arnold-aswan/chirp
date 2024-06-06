import { currentUser } from "@clerk/nextjs/server";
import AddPost from "@/components/forms/AddPost";
import { isOnboarded } from "@/lib/utils";

const page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await isOnboarded(user.id);
  if (!userInfo) return null;

  return (
    <>
      <h1 className="head-text">Add a Post</h1>

      <AddPost userId={userInfo._id.toString()} />
    </>
  );
};

export default page;
