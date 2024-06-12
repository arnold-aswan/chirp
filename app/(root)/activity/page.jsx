import { redirect } from "next/navigation";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

const page = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activities = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      {activities?.length > 0 ? (
        <section className="mt-10 flex flex-col gap-4">
          {activities.map((activity) => (
            <Link key={activity._id} href={`/post/${activity.parentId}`}>
              <article className="bg-dark-4 rounded-lg py-2 px-3 flex justify-between gap-3 text-white">
                <div className="flex items-center gap-3">
                  <Image
                    src={activity.author.image}
                    alt="profile photo"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="text-sm">
                    <span className="text-purple">
                      {activity.author.fullname}{" "}
                    </span>
                    replied to your post
                  </p>
                </div>
                <small className="text-purple text-[10px]">
                  {formatDistanceToNow(new Date(activity.createdAt), {
                    addSuffix: true,
                  })}
                </small>
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
