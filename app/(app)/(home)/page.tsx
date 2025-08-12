import type { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/lib/search-params/product-filters.server";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ProductListView from "@/modules/products/views/ProductListView";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  searchParams: Promise<SearchParams>;
}

const HomePage = async ({ searchParams }: Props) => {
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView />
    </HydrationBoundary>
  );
};

export default HomePage;
