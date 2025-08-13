import { useCallback } from "react";
import { useCartStore } from "../store/cart.store";

import { useShallow } from "zustand/react/shallow";

/**
 * @function useCart
 * @description A hook to manage the products in cart for a given tenant.
 * @param {string} tenantSlug - The slug of the tenant.
 * @returns An object containing the following properties:
 *  - `productIds`: An array of product IDs in cart for the given tenant.
 *  - `addProduct`: A function to add a product to the cart.
 *  - `removeProduct`: A function to remove a product from the cart.
 *  - `clearCart`: A function to clear the cart for the given tenant.
 *  - `clearAllCarts`: A function to clear all carts.
 *  - `toggleProduct`: A function to toggle the presence of a product in the cart.
 *  - `isProductInCart`: A function to check if a product is in the cart.
 *  - `totalItems`: The total number of items in the cart.
 */
export const useCart = (tenantSlug: string) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const clearCart = useCartStore((state) => state.clearCart);
  const clearAllCarts = useCartStore((state) => state.clearAllCarts);

  const productIds = useCartStore(
    useShallow((state) => state.tenantCarts[tenantSlug]?.productIds || [])
  );

  const toggleProduct = useCallback(
    (productId: string) => {
      if (productIds.includes(productId)) {
        removeProduct(tenantSlug, productId);
      } else {
        addProduct(tenantSlug, productId);
      }
    },
    [addProduct, removeProduct, productIds, tenantSlug]
  );

  const isProductInCart = useCallback(
    (productId: string) => productIds.includes(productId),
    [productIds]
  );

  const clearTenantCart = useCallback(
    () => clearCart(tenantSlug),
    [clearCart, tenantSlug]
  );

  const addProductToCart = useCallback(
    (productId: string) => addProduct(tenantSlug, productId),
    [addProduct, tenantSlug]
  );

  const removeProductFromCart = useCallback(
    (productId: string) => removeProduct(tenantSlug, productId),
    [removeProduct, tenantSlug]
  );

  return {
    productIds,
    addProduct: addProductToCart,
    removeProduct: removeProductFromCart,
    clearCart: clearTenantCart,
    clearAllCarts,
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,
  };
};
