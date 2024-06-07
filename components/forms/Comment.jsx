"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation } from "@/lib/validations/post";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { usePathname } from "next/navigation";
import { addCommentToPost } from "@/lib/actions/post.action";

const Comment = ({ postId, currentUserImage, currentUserId }) => {
  const pathName = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      post: "",
      //   postMedia: "",
      accountId: currentUserId,
    },
  });

  const onSubmit = async (values) => {
    try {
      await addCommentToPost(
        postId,
        values.post,
        currentUserId,
        // community: null,
        pathName
      );

      form.reset();
    } catch (error) {
      throw new Error(`Couldn't add post:: ${error.message}`);
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-start gap-6 mt-10">
          <FormField
            control={form.control}
            name="post"
            render={({ field }) => (
              <FormItem className="flex w-full items-center gap-3">
                <FormLabel>
                  <Image
                    src={currentUserImage}
                    alt="current_user"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </FormLabel>
                <FormControl className="border-none bg-transparent">
                  <Input
                    type="text"
                    {...field}
                    placeholder="Comment..."
                    className="no-focus text-light-1 outline-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-purple ">
            Reply
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Comment;
