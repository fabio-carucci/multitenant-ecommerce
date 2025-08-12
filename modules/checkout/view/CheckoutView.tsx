"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../hooks/use-cart";
import { useEffect } from "react";
import { toast } from "sonner";

const CheckoutView = ({ tenantSlug }: { tenantSlug: string }) => {
  const { productIds, clearAllCarts } = useCart(tenantSlug);

  const trpc = useTRPC();
  const { data, error } = useQuery({
    ...trpc.checkout.getProducts.queryOptions({
      ids: productIds,
    }),
    enabled: productIds.length > 0,
  });

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearAllCarts();
      toast.warning("Invalid products found, cart cleared");
    }
  }, [error, clearAllCarts]);

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default CheckoutView;
