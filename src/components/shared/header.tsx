"use client";
import { ChefHat } from "lucide-react";
import SideDrawer from "./side-drawer";
import type { User } from "next-auth";

const Header = ({ user }: { user: User | null }) => {
  return (
    <div className="md:hidden bg-white border-b border-[#e5e7eb] sticky top-0 z-50">
      <div className="flex items-center justify-between p-4">
        <ChefHat className="size-8 text-orange-500" />
        <span className="font-semibold text-xl">SmartCookAi</span>
        <SideDrawer user={user} />
      </div>
    </div>
  );
};

export default Header;
