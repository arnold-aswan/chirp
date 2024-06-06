import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { isOnboarded } from "@/lib/utils";

const page = async () => {
  const user = currentUser();
  if (!user) return null;
  // const userInfo = await fetchUser(user.id);
  // if (!userInfo?.onboarded) redirect("/onboarding");
  await isOnboarded(user.id);

  return <div>page</div>;
};

export default page;
