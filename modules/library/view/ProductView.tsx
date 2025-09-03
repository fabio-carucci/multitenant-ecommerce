"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import ReviewSidebar from "../components/ReviewSidebar";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Suspense } from "react";
import { ReviewFormSkeleton } from "../components/ReviewForm";

interface Props {
  productId: string;
}

const ProductView = ({ productId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.library.getOne.queryOptions({ productId })
  );
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-[#F4F4F0] w-full border-b">
        <Link prefetch href="/library" className="flex items-center gap-2">
          <ArrowLeftIcon className="size-4" />
          <span className="text-base font-medium">Back to library</span>
        </Link>
      </nav>
      <header className="bg-[#F4F4F0] py-8 border-b">
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12">
          <h1 className="text-[40px] font-medium">{data.name}</h1>
        </div>
      </header>
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
        <div className="grid lg:grid-cols-7 gap-4 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="p-4 rounded-md bg-white border gap-4">
              <Suspense fallback={<ReviewFormSkeleton />}>
                <ReviewSidebar productId={productId} />
              </Suspense>
            </div>
          </div>
          <div className="lg:col-span-5">
            {data.content ? (
              <RichText data={data.content} />
            ) : (
              <p className="font-medium italic text-muted-foreground">
                No special content
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductView;

export const ProductViewSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-[#F4F4F0] w-full border-b">
        <div className="flex items-center gap-2">
          <ArrowLeftIcon className="size-4" />
          <span className="text-base font-medium">Back to library</span>
        </div>
      </nav>
    </div>
  );
};
