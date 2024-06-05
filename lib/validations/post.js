import * as z from "zod";

export const PostValidation = z.object({
  post: z.string().min(3, { message: "minimum 3 characters" }),
  postMedia: z.string().url(),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  post: z.string().min(3, { message: "minimum 3 characters" }),
  postMedia: z.string().url(),
  accountId: z.string(),
});