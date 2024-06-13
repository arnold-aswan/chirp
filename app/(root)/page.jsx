import { fetchPosts } from "@/lib/actions/post.action";
import { currentUser } from "@clerk/nextjs/server";
import PostCard from "@/components/cards/PostCard";

export default async function Home() {
  const results = await fetchPosts(1, 20);
  const user = await currentUser();
  
  return (
    <main className="">
      <h1 className="head-text">Home </h1>
      <section className="mt-9 flex flex-col gap-10">
        {results.posts.length === 0 ? (
          <p className="mt-9 text-white">No posts found</p>
        ) : (
          <section className="flex flex-col items-center gap-5">
            {results.posts.map((post) => (
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
                media={post.media}
              />
            ))}
          </section>
        )}
      </section>
    </main>
  );
}
