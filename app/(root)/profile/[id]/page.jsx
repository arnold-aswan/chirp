import { currentUser } from "@clerk/nextjs/server";

import ProfileHeader from "@/components/shared/ProfileHeader";
import PostsTab from "@/components/shared/PostsTab";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants/data";

import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";

const page = async ({ params }) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <div>
      <h1 className="head-text">Profile</h1>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.fullname}
        imageUrl={userInfo.image}
        bio={userInfo.bio}
        username={userInfo.username}
      />

      <div className="mt-9 ">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="bg-dark-3 flex justify-between">
            {profileTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="flex gap-2 w-full">
                {tab.icon}
                <p className="hidden md:flex">{tab.label}</p>
                {tab.label === "Posts" && (
                  <p className="bg-purple text-white rounded-lg px-2 text-[10px]">
                    {userInfo?.posts?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent key={tab.label} value={tab.value}>
              <PostsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default page;
