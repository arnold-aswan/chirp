import React from "react";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import UserCard from "@/components/cards/UserCard";

const page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const results = await fetchUsers({
    userId: userInfo.id,
    searchTerm: "",
    pageNumber: 1,
    pageSize: 20,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* SearchBar */}

      <div className="mt-14 flex flex-col gap-9">
        {results.users.length === 0 ? (
          <p className="text-white">No Users</p>
        ) : (
          <>
            {results.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                fullname={person.fullname}
                username={person.username}
                image={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default page;
