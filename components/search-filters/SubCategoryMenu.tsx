import { CategoriesGetManyOutput } from "@/modules/categories/types";
import Link from "next/link";

interface Props {
  category: CategoriesGetManyOutput[number];
  isOpen: boolean;
}

const SubCategoryMenu = ({ category, isOpen }: Props) => {
  if (!isOpen || !category.subcategories || category.subcategories.length === 0)
    return null;

  const backgroundColor = category.color || "#f5f5f5";

  return (
    <div className="absolute z-100 top-[100%] left-0">
      {/* Invisible bridge to maintain hover */}
      <div className="w-60 h-3" />
      <div
        style={{ backgroundColor }}
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0_0_rgba(0,0,0,1)] -translate-y-[2px] -translate-x-[2px]"
      >
        <div>
          {category.subcategories?.map((sub) => (
            <Link
              href={`/${category.slug}/${sub.slug}`}
              key={sub.slug}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-btween items-center underline font-medium"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryMenu;
