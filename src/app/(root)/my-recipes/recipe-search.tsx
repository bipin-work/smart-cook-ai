"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const RecipeSearch = () => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
      <Input
        value={""}
        onChange={(e) => {}}
        placeholder="Search recipes..."
        className="pl-10"
      />{" "}
    </div>
  );
};

export default RecipeSearch;
