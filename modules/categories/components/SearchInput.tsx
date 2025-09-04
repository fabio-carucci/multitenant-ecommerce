"use client";

import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import CategoriesSidebar from "./CategoriesSidebar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  defaultValue?: string | undefined;
  onChange?: (value: string) => void;
  disabled?: boolean;
}
const SearchInput = ({ defaultValue, onChange, disabled }: Props) => {
  const [searchValue, setSearchValue] = useState(defaultValue || "");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange?.(searchValue);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue, onChange]);

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search products"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          disabled={disabled}
        />
      </div>

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

      {session.data?.user && (
        <Button variant="elevated" asChild>
          <Link prefetch href="/library">
            <BookmarkCheckIcon />
            Library
          </Link>
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
