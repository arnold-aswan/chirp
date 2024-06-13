"use client";

import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostValidation } from "@/lib/validations/post";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { PhotoIcon } from "@heroicons/react/24/outline";

import { usePathname, useRouter } from "next/navigation";
import { createPost } from "@/lib/actions/post.action";
import { useUploadThing } from "@/lib/uploadthing";

const AddPost = ({ userId }) => {
  const [files, setFiles] = useState([]);
  const { startUpload } = useUploadThing("media");
  const pathName = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      post: "",
      // media: [],
      media: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values) => {
    // console.log(values);
    const imgRes = await startUpload(files);
    console.log("Image upload response:", imgRes);

    const imageUrls = imgRes.map((file) => file.url).join(",");
    console.log("Image URLs:", imageUrls);

    try {
      const postData = {
        text: values.post,
        author: userId,
        media: imageUrls,
        community: null,
        path: pathName,
      };

      await createPost(postData);

      router.push("/");
    } catch (error) {
      console.log(`Couldn't add post:: ${error.message}`);
    }
  };

  const handleImageUpload = (e, onChange) => {
    e.preventDefault();
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 0) {
      const imageUrls = [];

      selectedFiles.forEach((file) => {
        if (!file.type.includes("image")) return;

        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const imageDataUrl = e.target?.result?.toString() || "";
          imageUrls.push(imageDataUrl);
          if (imageUrls.length === selectedFiles.length) {
            onChange(imageUrls);
          }
        };
        fileReader.readAsDataURL(file);
      });

      setFiles(selectedFiles);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-6 mt-10">
        <FormField
          control={form.control}
          name="media"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel>
                <div className="rounded-lg size-[4rem] border flex items-center justify-center">
                  <PhotoIcon className="size-9 cursor-pointer text-white" />
                </div>
              </FormLabel>
              <FormControl className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="upload a photo"
                  className="cursor-pointer"
                  multiple
                  onChange={(e) => handleImageUpload(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Post Content</FormLabel>
              <FormControl className="text-black">
                <Textarea rows={7} placeholder="add post" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-purple w-fit ">
          Post
        </Button>
      </form>
    </Form>
  );
};

export default AddPost;
