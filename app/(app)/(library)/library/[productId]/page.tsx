import ProductView, {
  ProductViewSkeleton,
} from "@/modules/library/view/ProductView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

// This page is user-specific; ensure it never gets statically cached.
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ productId: string }>;
}

const LibraryProductPage = async ({ params }: Props) => {
  const { productId } = await params;

  const queryClient = getQueryClient();

  // Redirect unauthenticated users early
  const session = await queryClient.fetchQuery(
    trpc.auth.session.queryOptions()
  );
  if (!session?.user) {
    // Optional: persist return path
    const { redirect } = await import("next/navigation");
    redirect("/sign-in?redirect=/library");
  }

  void queryClient.prefetchQuery(
    trpc.library.getOne.queryOptions({
      productId,
    })
  );

  void queryClient.prefetchQuery(
    trpc.reviews.getOne.queryOptions({
      productId,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductViewSkeleton />}>
        <ProductView productId={productId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default LibraryProductPage;
