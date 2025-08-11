"use client";

import { useParams } from "next/navigation";
import Categories from "./Categories";
import SearchInput from "./SearchInput";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DEFAULT_BG_COLOR } from "@/constants";
import BreadcrumbNavigation from "./BreadcrumbNavigation";

const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const params = useParams<{ category?: string; subcategory?: string }>();
  const activeCategory = params.category ?? "all";

  const activeCategoryData = data.find(
    (category) => category.slug === activeCategory
  );

  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;

  const activeSubcategory = params.subcategory ?? null;
  const activeSubcategoryName =
    (activeSubcategory &&
      activeCategoryData?.subcategories?.find(
        (sub) => sub.slug === activeSubcategory
      )?.name) ||
    null;

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: activeCategoryColor }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
      <BreadcrumbNavigation
        activeCategoryName={activeCategoryName}
        activeCategory={activeCategory}
        activeSubcategoryName={activeSubcategoryName}
      />
    </div>
  );
};

export default SearchFilters;

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: DEFAULT_BG_COLOR }}
    >
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
};
