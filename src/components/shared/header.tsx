"use client";
import { ChefHat, Menu } from "lucide-react";
import { Button } from "../ui/button";
import SideDrawer from "./side-drawer";

const Header = () => {
  return (
    <div className="md:hidden bg-white border-b border-[#e5e7eb] sticky top-0 z-50">
      <div className="flex items-center justify-between p-4">
        <ChefHat className="size-8 text-orange-500" />
        <span className="font-semibold text-xl">SmartCookAi</span>
        <SideDrawer />
      </div>
    </div>
  );
};

export default Header;
