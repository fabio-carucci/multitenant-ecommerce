"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import ReviewForm from "./ReviewForm";

interface Props {
  productId: string;
}

const ReviewSidebar = ({ productId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.reviews.getOne.queryOptions({ productId })
  );
  return <ReviewForm productId={productId} initialData={data} />;
};

export default ReviewSidebar;
