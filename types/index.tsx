import { Category } from "@/payload-types";

export type CustomCategory = Omit<Category, "subcategories"> & {
  subcategories?: Category[];
};
