"use client";
import { productFiltersParams } from "@/lib/search-params/product-filters";
import { useQueryStates } from "nuqs";

export const useProductFilters = () => {
  return useQueryStates(productFiltersParams);
};
 
