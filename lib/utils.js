import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { redirect } from "next/navigation";
import { fetchUser } from "./actions/user.actions";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Since the initial image is a url, it'll return false
// However when you change the image it'll return true as it won't be a url anymore.
export function isBase64Image(imageData) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export const isOnboarded = async (userId) => {
  try {
    const userInfo = await fetchUser(userId);
    if (!userInfo?.onboarded) {
      redirect("/onboarding");
      return;
    }
    return userInfo;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};
