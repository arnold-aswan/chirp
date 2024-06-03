import {
  HomeIcon,
  UserIcon,
  PlusCircleIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export const sidebarLiks = [
  { name: "home", icon: <HomeIcon />, href: "/" },
  { name: "search", icon: <MagnifyingGlassIcon />, href: "/search" },
  { name: "create", icon: <PlusCircleIcon />, href: "/create-post" },
  { name: "activity", icon: <HeartIcon />, href: "/activity" },
  { name: "profile", icon: <UserIcon />, href: "/profile" },
  { name: "community", icon: <UserGroupIcon />, href: "/community" },
];
