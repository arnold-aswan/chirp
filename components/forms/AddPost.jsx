"use client";

import React, { useState } from "react";
import Image from "next/image";

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

import { Textarea } from "../ui/textarea";
import { PhotoIcon } from "@heroicons/react/24/outline";

import { usePathname, useRouter } from "next/navigation";
import { createPost } from "../../lib/actions/post.action";

const AddPost = ({ userId }) => {
  const [files, setFiles] = useState([]);
  const pathName = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      post: "",
      postMedia: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values) => {
    // const imgRes = await startUpload(files);

    // if (imgRes && imgRes[0].fileUrl) {
    //   values.profile_photo = imgRes[0].fileUrl;
    // }
    try {
      await createPost({
        text: values.post,
        author: userId,
        // image: values.images,
        community: null,
        path: pathName,
      });

      router.push("/");
    } catch (error) {
      console.log(`Couldn't add post:: ${error.message}`);
    }
  };

  // const handleImageUpload = (e, onChange) => {
  //   e.preventDefault();
  //   const fileReader = new FileReader();

  //   if (e.target.files && e.target.files.length > 0) {
  //     const selectedFiles = e.target.files;
  //     setFiles(selectedFiles);

  //     console.log(selectedFiles);

  //     for (let file of selectedFiles) {
  //       if (!file.type.includes("image")) return null;
  //     }

  //     fileReader.onload = async (e) => {
  //       const imageDataUrl = e.target?.result?.toString() || "";
  //       onChange(imageDataUrl);
  //     };
  //     fileReader.readAsDataURL(selectedFiles[0]);
  //   }
  // };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-6 mt-10">
        {/* <FormField
          control={form.control}
          name="images"
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
        /> */}

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
        <Button type="submit" className="bg-purple ">
          Post
        </Button>
      </form>
    </Form>
  );
};

export default AddPost;
