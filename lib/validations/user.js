import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url(),
  fullname: z
    .string()
    .min(3, { message: "minimum 3 characters" })
    .max(30, { Message: "maximum is 30 characters" }),
  username: z
    .string()
    .min(3, { message: "minimum 3 characters" })
    .max(30, { Message: "maximum is 30 characters" }),
  bio: z
    .string()
    .min(3, { message: "minimum 3 characters" })
    .max(250, { Message: "maximum is 250 characters" }),
  email: z.string().email(),
});
