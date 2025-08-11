import type { SearchParams } from "nuqs/server";
import ProductFilters from "@/components/products/filters";
import ProductList, {
  ProductListSkeleton,
} from "@/components/products/ProductList";
import { loadProductFilters } from "@/lib/search-params/product-filters.server";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import ProductSort from "@/components/products/ProductSort";

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<SearchParams>;
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { category } = await params;

  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category, ...filters })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="px-4 lg:px-12 py-8  flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
          <p className="text-2xl font-medium">Curated for you</p>
          <ProductSort />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
          <div className="lg:col-span-2">
            <div className="border p-2">
              <ProductFilters />
            </div>
          </div>
          <div className="lg:col-span-4 xl:col-span-6">
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList category={category} />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CategoryPage;
