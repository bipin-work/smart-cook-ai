"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChefHat } from "lucide-react";
import { SIDE_BAR_CONTENTS } from "@/lib/constants";
import { Button } from "../ui/button";
const SideNav = () => {
  const pathName = usePathname();
  const isActive = (path: string) => pathName === path;

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
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
                variant={isActive(nav.path) ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                {nav.icon}
                {nav.title}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default SideNav;
