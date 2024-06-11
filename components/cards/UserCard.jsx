"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const UserCard = ({ id, fullname, username, image, personType }) => {
  const router = useRouter();
  return (
    <article className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={image}
          alt="profile photo"
          width={48}
          height={48}
          className="rounded-full"
        />

        <div className="text-white text-sm">
          <h4>{fullname}</h4>
          <p className="text-gray-500">@{username}</p>
        </div>
      </div>

      <Button
        className="bg-purple"
        onClick={() => router.push(`/profile/${id}`)}>
        View
      </Button>
    </article>
  );
};

export default UserCard;
