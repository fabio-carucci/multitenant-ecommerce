import { createLoader } from "nuqs/server";
import { productFiltersParams } from "./product-filters";

export const loadProductFilters = createLoader(productFiltersParams);
