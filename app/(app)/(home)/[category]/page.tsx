import ProductList, {
  ProductListSkeleton,
} from "@/components/products/ProductList";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{ category: string }>;
}

const CategoryPage = async ({}: Props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </HydrationBoundary>
  );
};

export default CategoryPage;
