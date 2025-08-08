"use client";

import { ListFilterIcon, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import type { CustomCategory } from "@/types";
import CategoriesSidebar from "./CategoriesSidebar";
import { useState } from "react";
import { Button } from "../ui/button";

interface Props {
  disabled?: boolean;
  data?: CustomCategory[];
}
const SearchInput = ({ disabled, data }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        data={data}
      />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search products"
          disabled={disabled}
        />
      </div>

      {/* TODO: add categories view all button */}
      <Button
        variant="elevated"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open category filters"
        aria-haspopup="dialog"
        aria-expanded={isSidebarOpen}
        type="button"
      >
        <ListFilterIcon className="size-4" />
      </Button>
      {/* TODO: add library button */}
    </div>
  );
};

export default SearchInput;
