"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../hooks/use-cart";

const CheckoutView = ({ tenantSlug }: { tenantSlug: string }) => {
  const { productIds } = useCart(tenantSlug);

  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.checkout.getProducts.queryOptions({
      ids: productIds,
    })
  );
  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default CheckoutView;
