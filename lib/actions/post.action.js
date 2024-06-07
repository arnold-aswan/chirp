"use server";
import { connectToDB } from "@/lib/mongoose";
import Post from "../models/post.model";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";

export const createPost = async ({ text, author, community, path }) => {
  try {
    await connectToDB();

    const createdPost = await Post.create({
      text,
      author,
      // image,
      community: null,
    });

    // update user model with ids of posts created by that user
    await User.findByIdAndUpdate(author, { $push: { posts: createdPost._id } });

    revalidatePath(path);
  } catch (error) {
    throw new Error(`Could not create post:: ${error.message}`);
  }
};

export const fetchPosts = async (pageNumber = 1, pageSize = 20) => {
  try {
    await connectToDB();

    // pagination
    const skipAmount = (pageNumber - 1) * pageSize;

    // Get posts that have no parentIds
    const postsQuery = await Post.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id fullname parentId image",
        },
      });

    // Count the total number of top-level posts (Posts) i.e., posts that are not comments.
    const postsCount = await Post.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const posts = postsQuery;

    const isNext = postsCount > skipAmount + postsCount.length;

    return { posts, isNext };
  } catch (error) {
    console.log(`Failed to fetch posts: ${error.message}`);
  }
};

export const fetchPostById = async (id) => {
  try {
    await connectToDB();

    const post = await Post.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id fullname image",
      })
      .exec();

    return post;
  } catch (error) {
    throw new Error(`Failed to fetch post:: ${error.message}`);
  }
};

export const addCommentToPost = async (postId, comment, userId, path) => {
  try {
    await connectToDB();

    const originalPost = await Post.findById(postId);
    if (!originalPost) {
      throw new Error(`Failed to find original post`);
    }

    const commentPost = new Post({
      text: comment,
      author: userId,
      parentId: postId,
    });

    const savedComment = await commentPost.save();

    // update original thread to include original comment
    originalPost.children.push(savedComment._id);

    // save original post
    await originalPost.save();

    revalidatePath(path);
  } catch (error) {
    throw new Error(`Error adding comment:: ${error.message}`);
  }
};
