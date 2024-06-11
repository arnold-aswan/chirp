import Image from "next/image";
import Link from "next/link";

import { FaRegHeart } from "react-icons/fa6";
import { BsChatDots, BsReply } from "react-icons/bs";

const PostCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}) => {


  return (
    <article className={`flex w-full flex-col rounded-xl bg-dark-2 p-7`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4 items-center">
          <Link href={`/profile/${author?.id}`} className="relative size-9">
            <Image
              src={author?.image}
              alt="profile photo"
              fill
              className="cursor-pointer rounded-full"
            />
          </Link>

          <Link href={`/profile/${author?.id}`} className=" w-fit">
            <h4 className="text-white">{author?.fullname}</h4>
          </Link>
        </div>
      </div>

      <article className="mt-3 ml-10">
        <div>
          <p className="text-white">{content}</p>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <div className="flex gap-4 text-gray-500">
            <FaRegHeart className="cursor-pointer" />
            <BsChatDots className="cursor-pointer" />
            <Link href={`/post/${id}`}>
              <BsReply className="cursor-pointer" />
            </Link>
          </div>

          {isComment && comments?.length > 0 && (
            <Link href={`/post/${id}`}>
              <p className="text-white">{comments.length} replies</p>
            </Link>
          )}
        </div>
      </article>
    </article>
  );
};

export default PostCard;
