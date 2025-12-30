import {
  ClipboardListIcon,
  HomeIcon,
  PanelLeftIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "lucide-react";
import { useLocation } from "react-router";
import React from "react";
import { UserButton } from "@clerk/clerk-react";
export const NAVIGATION = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon className="size-5 " />,
  },
  {
    name: "Products",
    path: "/products",
    icon: <ShoppingBagIcon className="size-5 " />,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: <ClipboardListIcon className="size-5 " />,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: <UsersIcon className="size-5 " />,
  },
];
function NavBar() {
  const location = useLocation();

  console.log(location.pathname);

  return (
    <div className="navbar w-full bg-base-300">
      <label
        htmlFor="my-drawer"
        className="btn btn-square btn-ghost drawer-button lg:hidden"
        aria-label="open sidebar"
      >
        <PanelLeftIcon className="size-5" />
      </label>
      <div className="flex-1 px-4">
        <h1 className="text-xl font-bold">
          {NAVIGATION.find((nav) => nav.path === location.pathname)?.name ||
            "Dashboard"}
        </h1>
      </div>
      <div className="mr-5">
        <UserButton />
      </div>
    </div>
  );
}

export default NavBar;
