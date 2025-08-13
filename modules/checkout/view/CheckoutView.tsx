"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../hooks/use-cart";
import { useEffect } from "react";
import { toast } from "sonner";
import { generateTenantUrl } from "@/lib/utils";
import CheckoutItem from "../components/CheckoutItem";
import CheckoutSidebar from "../components/CheckoutSidebar";
import { InboxIcon, Loader2 } from "lucide-react";

const CheckoutView = ({ tenantSlug }: { tenantSlug: string }) => {
  const { productIds, clearAllCarts, removeProduct } = useCart(tenantSlug);

  const trpc = useTRPC();
  const { data, error, isLoading } = useQuery({
    ...trpc.checkout.getProducts.queryOptions({
      ids: productIds,
    }),
  });

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearAllCarts();
      toast.warning("Invalid products found, cart cleared");
    }
  }, [error, clearAllCarts]);

  if (isLoading) {
    return (
      <div className="px-4 lg:px-12 lg:pt-16 pt-4">
        <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    );
  }

  if (!data || data.docs.length === 0) {
    return (
      <div className="px-4 lg:px-12 lg:pt-16 pt-4">
        <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
          <InboxIcon />
          <p className="text-base font-medium">No products found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pt-16 pt-4 px-4 lg:px-12">
      <div className="grid lg:grid-cols-7 gap-4 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="border rounded-md overflow-hidden bg-white">
            {data?.docs.map((product, index) => (
              <CheckoutItem
                key={index}
                isLast={index === data.docs.length - 1}
                imageUrl={product.image?.url}
                name={product.name}
                productUrl={`${generateTenantUrl(product.tenant.slug)}/products/${product.id}`}
                tenantUrl={generateTenantUrl(product.tenant.slug)}
                tenantName={product.tenant.name}
                price={product.price}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <CheckoutSidebar
            total={data?.total || 0}
            onCheckout={() => {}}
            isCanceled={false}
            isPending={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
