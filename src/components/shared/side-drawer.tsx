"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import NavLinks from "./nav-links";
import { useState, useEffect } from "react";
import type { User } from "next-auth";

const SideDrawer = ({ user }: { user: User | null }) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <Drawer open={isOpen} onOpenChange={setOpen} direction="left">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="p-2 hover:bg-[#f9fafb] rounded-lg"
        >
          {isOpen ? (
            <X className="h-12 w-12" />
          ) : (
            <Menu className="h-24 w-24" />
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerTitle className="sr-only">SmartCookAi</DrawerTitle>
        <DrawerDescription className="sr-only">
          A smart way to handle recipes.
        </DrawerDescription>
        <NavLinks size="lg" onNavigate={() => setOpen(false)} user={user} />
      </DrawerContent>
    </Drawer>
  );
};

export default SideDrawer;
