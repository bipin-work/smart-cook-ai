"use client";
import { usePathname } from "next/navigation";
import { ChefHat } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { SIDE_BAR_CONTENTS } from "@/lib/constants";
import React from "react";
import SignOutButton from "./sign-out-button";
import { User } from "lucide-react";
import type { User as AuthUser } from "next-auth";
interface NavLinksProps {
  size?: "default" | "lg";
  onNavigate?: () => void;
  user?: AuthUser | null;
}
const NavLinks: React.FC<NavLinksProps> = ({
  size = "default",
  onNavigate,
  user,
}) => {
  const pathName = usePathname();
  const isActive = (path: string) => pathName === path;

  return (
    <aside className="w-full md:w-64 h-dvh bg-white border-r border-gray-200 flex flex-col">
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
      <div className="border-t border-recipe-border px-4 pt-4" style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-recipe-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-recipe-text-primary truncate tracking-[-0.1504px]">
              {user?.name}
            </p>
            <p className="text-xs text-recipe-text-tertiary truncate tracking-[-0.1504px]">
              {user?.email}
            </p>
          </div>
        </div>
        <SignOutButton />
      </div>
    </aside>
  );
};

export default NavLinks;
