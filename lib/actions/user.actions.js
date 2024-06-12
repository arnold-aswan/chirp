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

export const fetchUsers = async ({
  userId,
  searchTerm = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}) => {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize; //pagination

    const regex = new RegExp(searchTerm, "i");

    const query = { id: { $ne: userId } }; //Not equal to userId

    if (searchTerm.trim() !== "") {
      query.$or = [
        // Search in both username & fullname
        { username: { $regex: regex } },
        { fullname: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery;

    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.log(`Could not fetch all users::${error.message}`);
  }
};

export const getActivity = async (userId) => {
  try {
    connectToDB();

    // Get all posts created by user
    const userPosts = await Post.find({ author: userId });

    // Collect all the child post ids (replies) from the children field
    const childPostIds = userPosts.reduce((acc, userPost) => {
      return acc.concat(userPost.children);
    }, []);

    const replies = await Post.find({
      _id: { $in: childPostIds },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "_id fullname image",
    });

    return replies;
  } catch (error) {
    console.log(`Failed get activity::${error.message}`);
  }
};
