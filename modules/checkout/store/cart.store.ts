"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TenantCart {
  productIds: string[];
}

interface CartState {
  tenantCarts: Record<string, TenantCart>;
  addProduct: (tenantSlug: string, productId: string) => void;
  removeProduct: (tenantSlug: string, productId: string) => void;
  clearCart: (tenantSlug: string) => void;
  clearAllCarts: () => void;
}

/**
 * @function useCartStore
 * @description A Zustand store for managing shopping carts across different tenants.
 * Provides methods to add, remove, and clear products in a tenant's cart,
 * as well as retrieve the list of product IDs for a specific tenant.
 * The cart is persisted in localStorage.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      tenantCarts: {},
      addProduct: (tenantSlug: string, productId: string) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productIds: [
                ...(state.tenantCarts[tenantSlug]?.productIds || []),
                productId,
              ],
            },
          },
        })),
      removeProduct: (tenantSlug: string, productId: string) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productIds:
                state.tenantCarts[tenantSlug]?.productIds?.filter(
                  (id) => id !== productId
                ) ?? [],
            },
          },
        })),
      clearCart: (tenantSlug: string) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productIds: [],
            },
          },
        })),
      clearAllCarts: () =>
        set({
          tenantCarts: {},
        }),
    }),
    {
      name: "sellio-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
