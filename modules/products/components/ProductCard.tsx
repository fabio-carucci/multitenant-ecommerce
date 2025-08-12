"use client";

import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatCurrency, generateTenantUrl } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  imageUrl?: string | null;
  tenantSlug: string;
  tenantImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
  price: number;
}

const ProductCard = ({
  id,
  name,
  imageUrl,
  tenantSlug,
  tenantImageUrl,
  reviewRating,
  reviewCount,
  price,
}: Props) => {
  const router = useRouter();

  const handleTenantClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    router.push(generateTenantUrl(tenantSlug));
  };

  return (
    <Link href={`${generateTenantUrl(tenantSlug)}/products/${id}`}>
      <div className="hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-shadow border rounded-md bg-white overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 border-y flex flex-col gap-3 flex-1">
          <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
          <div
            className="flex items-center gap-2"
            onClick={handleTenantClick}
            role="button"
            tabIndex={0}
            aria-label={`View ${tenantSlug} shop`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                router.push(generateTenantUrl(tenantSlug));
              }
            }}
          >
            {tenantImageUrl && (
              <Image
                src={tenantImageUrl}
                alt={tenantSlug}
                width={16}
                height={16}
                className="rounded-full border shrink-0 size-4 object-cover"
              />
            )}
            <p className="text-sm underline font-medium">{tenantSlug}</p>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-3.5 fill-black" />
              <p className="text-sm font-medium">
                {reviewRating} ({reviewCount})
              </p>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="relative px-1 py-2 border bg-pink-400 w-fit">
            <p className="text-sm font-medium">{formatCurrency(price)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse" />
  );
};
