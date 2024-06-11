import {
  HomeIcon,
  UserIcon,
  PlusCircleIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

import { BsChatDots, BsReply } from "react-icons/bs";
import { FaTags } from "react-icons/fa";

export const sidebarLiks = [
  { name: "home", icon: <HomeIcon />, href: "/" },
  { name: "search", icon: <MagnifyingGlassIcon />, href: "/search" },
  { name: "create", icon: <PlusCircleIcon />, href: "/create-post" },
  { name: "activity", icon: <HeartIcon />, href: "/activity" },
  { name: "profile", icon: <UserIcon />, href: "/profile" },
  { name: "community", icon: <UserGroupIcon />, href: "/community" },
];

export const profileTabs = [
  { value: "posts", label: "Posts", icon: <BsChatDots /> },
  { value: "replies", label: "Replies", icon: <BsReply /> },
  { value: "tagged", label: "Tagged", icon: <FaTags /> },
];
