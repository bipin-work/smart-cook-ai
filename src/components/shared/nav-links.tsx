"use client";
import { usePathname } from "next/navigation";
import { ChefHat, User } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { SIDE_BAR_CONTENTS } from "@/lib/constants";
import React from "react";
import SignOutButton from "./sign-out-button";
import UserActions from "./user-details";
interface NavLinksProps {
  size?: "default" | "lg";
  onNavigate?: () => void;
}
const NavLinks: React.FC<NavLinksProps> = ({
  size = "default",
  onNavigate,
}) => {
  const pathName = usePathname();
  const isActive = (path: string) => pathName === path;

  return (
    <aside className="w-full md:w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <ChefHat className="size-8 text-orange-500" />
          <span className="font-semibold text-xl">SmartCookAi</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {SIDE_BAR_CONTENTS.map((nav) => (
          <Link key={nav.path} href={nav.path}>
            <Button
              size={size}
              onClick={onNavigate}
              variant={isActive(nav.path) ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              {nav.icon}
              {nav.title}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="border-t border-recipe-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <UserActions />
        </div>
        <SignOutButton />
      </div>
    </aside>
  );
};

export default NavLinks;
