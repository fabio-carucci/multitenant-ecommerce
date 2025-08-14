"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCart } from "../hooks/use-cart";
import { useEffect } from "react";
import { toast } from "sonner";
import { generateTenantUrl } from "@/lib/utils";
import CheckoutItem from "../components/CheckoutItem";
import CheckoutSidebar from "../components/CheckoutSidebar";
import { InboxIcon, Loader2 } from "lucide-react";
import { useCheckoutStates } from "../hooks/use-checkout-states";
import { useRouter } from "next/navigation";

const CheckoutView = ({ tenantSlug }: { tenantSlug: string }) => {
  const router = useRouter();

  const [states, setStates] = useCheckoutStates();
  const { productIds, clearCart, removeProduct } = useCart(tenantSlug);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    ...trpc.checkout.getProducts.queryOptions({
      ids: productIds,
    }),
  });

  const purchase = useMutation(
    trpc.checkout.purchase.mutationOptions({
      onMutate: () => {
        setStates({
          success: false,
          cancel: false,
        });
      },
      onSuccess: (data) => {
        window.location.href = data.url;
      },
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          // TODO: modify when subdomains are implemented
          router.push("/sign-in");
        }
        toast.error(error.message || "Failed to purchase products");
      },
    })
  );

  useEffect(() => {
    if (states.success) {
      setStates({
        success: false,
        cancel: false,
      });
      clearCart();
      queryClient.invalidateQueries(trpc.library.getMany.infiniteQueryFilter());

      toast.success("Products purchased successfully");
      router.push("/library");
    }
  }, [
    states.success,
    clearCart,
    router,
    setStates,
    queryClient,
    trpc.library.getMany,
  ]);

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearCart();
      toast.warning("Invalid products found, cart cleared");
    }
  }, [error, clearCart]);

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
            onPurchase={() =>
              purchase.mutate({
                productIds,
                tenantSlug,
              })
            }
            isCanceled={states.cancel}
            disabled={purchase.isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
