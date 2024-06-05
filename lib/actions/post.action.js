"use server";
import { connectToDB } from "@/lib/mongoose";
import Post from "../models/post.model";
import { revalidatePath } from "next/cache";

export const createPost = async ({ text, author, image, community, path }) => {
  try {
    await connectToDB();

    const createdPost = await Post.create({
      text,
      author,
      image,
      community: null,
    });

    // update user model with ids of posts created by that user
    await User.findByIdAndUpdate(author, { $push: { posts: createdPost._id } });

    revalidatePath(path);
  } catch (error) {
    throw new Error(`Could not create post:: ${error.message}`);
  }
};
