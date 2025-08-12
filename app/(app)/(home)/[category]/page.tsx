import type { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/lib/search-params/product-filters.server";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ProductListView from "@/modules/products/views/ProductListView";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<SearchParams>;
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { category } = await params;

  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      category,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={category} />
    </HydrationBoundary>
  );
};

export default CategoryPage;
