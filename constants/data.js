import {
  HomeIcon,
  UserIcon,
  PlusCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export const sidebarLiks = [
  { name: "home", icon: <HomeIcon />, href: "/" },
  { name: "create", icon: <PlusCircleIcon />, href: "/post" },
  { name: "profile", icon: <UserIcon />, href: "/profile" },
  { name: "community", icon: <UserGroupIcon />, href: "/community" },
];
