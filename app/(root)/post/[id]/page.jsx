import { currentUser } from "@clerk/nextjs/server";
import PostCard from "@/components/PostCard";
import { fetchPostById } from "@/lib/actions/post.action";
import Comment from "@/components/forms/Comment";

import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";

const Page = async ({ params }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const post = await fetchPostById(params.id);

  return (
    <section className="">
      <div>
        <PostCard
          key={post._id}
          id={post._id}
          currentUserId={user?.id}
          parentId={post.parentId}
          content={post.text}
          author={post.author}
          community={post.community}
          createdAt={post.createdAt}
          comments={post.children}
        />
      </div>

      <div className="mt-7">
        <Comment
          postId={post.id}
          currentUserImage={user.imageUrl}
          currentUserId={userInfo._id.toString()}
        />
      </div>

      <div className="mt-10 space-y-4">
        {post.children.map((childPost) => (
          <PostCard
            key={childPost._id}
            id={childPost._id}
            currentUserId={user?.id}
            parentId={childPost.parentId}
            content={childPost.text}
            author={childPost.author}
            community={childPost.community}
            createdAt={childPost.createdAt}
            comments={childPost.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
