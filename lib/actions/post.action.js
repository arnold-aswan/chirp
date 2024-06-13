"use server";
import { connectToDB } from "@/lib/mongoose";
import Post from "../models/post.model";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";

function convertMongooseDocumentToPlainObject(doc) {
  const plainObject = doc.toObject();
  plainObject._id = plainObject._id.toString();
  plainObject.author = plainObject.author.toString();
  plainObject.createdAt = plainObject.createdAt.toISOString();
  plainObject.updatedAt = plainObject.updatedAt.toISOString();
  if (plainObject.community) {
    plainObject.community = plainObject.community.toString();
  }
  if (plainObject.parentId) {
    plainObject.parentId = plainObject.parentId.toString();
  }
  plainObject.children = plainObject.children.map((child) => child.toString());
  return plainObject;
}

export const createPost = async ({ text, author, media, community, path }) => {
  try {
    connectToDB();

    const createdPost = await Post.create({
      text,
      author,
      media: media.split(","),
      community: null,
    });

    await createdPost.save();
    // update user model with ids of posts created by that user
    await User.findByIdAndUpdate(author, { $push: { posts: createdPost._id } });

    revalidatePath(path);
    // const createdPostObj = createdPost.toObject();
    const createdPostObj = convertMongooseDocumentToPlainObject(createdPost);
    return createdPostObj;
  } catch (error) {
    throw new Error(`Could not create post:: ${error.message}`);
  }
};

export const fetchPosts = async (pageNumber = 1, pageSize = 20) => {
  try {
    connectToDB();

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
    connectToDB();

    const post = await Post.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id fullname image",
      })
      .populate({
        path: "children", // Populate the children field
        populate: [
          {
            path: "author", // Populate the author field within the children
            model: User,
            select: "_id id parentId fullname image",
          },
          {
            path: "children", // Populate the children field within children
            model: Post,
            populate: {
              path: "author", // Populate the author field within nested children
              model: User,
              select: "_id id parentId fullname image",
            },
          },
        ],
      })
      .exec();

    return post;
  } catch (error) {
    throw new Error(`Failed to fetch post:: ${error.message}`);
  }
};

export const addCommentToPost = async (postId, comment, userId, path) => {
  try {
    connectToDB();

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
