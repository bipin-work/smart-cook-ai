"use client";
import { signOutUser } from "@/lib/actions/user.action";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  return (
    <Button
      variant="ghost"
      onClick={signOutUser}
      className="w-full flex flex-start gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors tracking-[-0.1504px]"
    >
      <LogOut /> Sign Out
    </Button>
  );
};

export default SignOutButton;
