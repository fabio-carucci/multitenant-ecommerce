import { DEFAULT_LIMIT } from "@/constants";
import LibraryView from "@/modules/library/view/LibraryView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

// This page is user-specific; ensure it never gets statically cached.
export const dynamic = "force-dynamic";

const LibraryPage = async () => {
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
  void queryClient.prefetchInfiniteQuery(
    trpc.library.getMany.infiniteQueryOptions({
      limit: DEFAULT_LIMIT,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LibraryView />
    </HydrationBoundary>
  );
};

export default LibraryPage;
