"use server";

import { connectToDB } from "../mongoose";
import User from "../models/user.model";
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
    await connectToDB();

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
    console.log(user);
    if (path === "/profile/edit") {
      revalidatePath(path);
    }

    return user;
  } catch (error) {
    console.log(`Failed to create/ update user ${error.message}`);
    // throw new Error(`Failed to create/ update user ${error.message}`);
  }
};
