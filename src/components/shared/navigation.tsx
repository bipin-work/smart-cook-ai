import Link from "next/link";
import { ChefHat } from "lucide-react";
import { SIDE_BAR_CONTENTS } from "@/lib/constants";
import { Button } from "../ui/button";
import NavLinks from "./nav-links";
const SideNav = () => {
  return (
    <div className="hidden md:flex h-screen bg-gray-50">
      <NavLinks />
    </div>
  );
};

export default SideNav;
