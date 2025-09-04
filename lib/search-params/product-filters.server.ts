import { sortValues } from "@/constants";
import {
  createLoader,
  parseAsStringLiteral,
  parseAsArrayOf,
  parseAsString,
} from "nuqs/server";

const productFiltersParams = {
  search: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  sort: parseAsStringLiteral(sortValues).withDefault("curated"),
  minPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  maxPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  tags: parseAsArrayOf(parseAsString)
    .withOptions({ clearOnDefault: true })
    .withDefault([] as string[]),
};

export const loadProductFilters = createLoader(productFiltersParams);
