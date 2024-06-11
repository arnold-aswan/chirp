"use server";

import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import Post from "../models/post.model";
import { revalidatePath } from "next/cache";

export const updateUser = async ({
  userId,
  username,
  fullname,
  bio,
  image,
  email,
  path,
}) => {
  try {
    connectToDB();

    const user = await User.findOneAndUpdate(
      { id: userId },
      {
        $set: {
          username: username.toLowerCase(),
          fullname,
          bio,
          image,
          email,
          onboarded: true,
        },
      },
      { upsert: true, new: true }
    );

    await user.save();

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error) {
    console.log(`Failed to create/ update user ${error.message}`);
    throw new Error(`Failed to create/ update user ${error.message}`);
  }
};

export const fetchUser = async (userId) => {
  connectToDB();

  try {
    const user = await User.findOne({ id: userId });
    return user;
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
};

export const fetchUserPosts = async (userId) => {
  try {
    connectToDB();

    const posts = await User.findOne({ id: userId }).populate({
      path: "posts",
      model: Post,
      populate: {
        path: "children",
        model: Post,
        populate: {
          path: "author",
          model: User,
          select: "id fullname image",
        },
      },
    });

    return posts;
  } catch (error) {
    console.log(`Could not find user posts::${error.message}`);
  }
};
