import { redirect } from "next/navigation";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";

const page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activities = await getActivity(userInfo._id);
  console.log(activities);
  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      {activities?.length > 0 ? (
        <section className="mt-10 flex flex-col gap-5">
          {activities.map((activity) => (
            <Link key={activity._id} href={`/post/${activity.parentId}`}>
              <article>
                <Image
                  src={activity.author.image}
                  alt="profile photo"
                  width={20}
                  height={20}
                  className="rounded-full object-cover"
                />
              </article>
            </Link>
          ))}
        </section>
      ) : (
        <p className="text-white">No activity yet</p>
      )}
    </section>
  );
};

export default page;
