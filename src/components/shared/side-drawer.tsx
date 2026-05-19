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
import { useState } from "react";

const SideDrawer = () => {
  const [isOpen, setOpen] = useState(false);
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
        <NavLinks size="lg" onNavigate={() => setOpen(false)} />
      </DrawerContent>
    </Drawer>
  );
};

export default SideDrawer;
