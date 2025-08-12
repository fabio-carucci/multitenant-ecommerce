import type { SearchParams } from "nuqs/server";
import ProductListView from "@/modules/products/views/ProductListView";
import { loadProductFilters } from "@/lib/search-params/product-filters.server";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<SearchParams>;
}

const SubcategoryPage = async ({ params, searchParams }: Props) => {
  const { subcategory } = await params;

  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      category: subcategory,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={subcategory} />
    </HydrationBoundary>
  );
};

export default SubcategoryPage;
