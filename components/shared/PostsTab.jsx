import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import PostCard from "@/components/PostCard";

const PostsTab = async ({ currentUserId, accountId, accountType }) => {
  let results = await fetchUserPosts(accountId);
  if (!results) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {results.posts.map((post) => (
        <PostCard
          key={post._id}
          id={post._id}
          currentUserId={currentUserId}
          parentId={post.parentId}
          content={post.text}
          author={
            accountType === "User"
              ? {
                  fullname: results.fullname,
                  image: results.image,
                  id: results.id,
                }
              : {
                  fullname: post.author.fullname,
                  image: post.author.image,
                  id: post.author.id,
                }
          }
          community={post.community}
          createdAt={post.createdAt}
          comments={post.children}
        />
      ))}
    </section>
  );
};

export default PostsTab;
