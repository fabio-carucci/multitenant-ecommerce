import { useCartStore } from "../store/cart.store";

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
  const {
    addProduct,
    removeProduct,
    clearCart,
    clearAllCarts,
    getCartByTenant,
  } = useCartStore();

  const productIds = getCartByTenant(tenantSlug);

  const toggleProduct = (productId: string) => {
    if (productIds.includes(productId)) {
      removeProduct(tenantSlug, productId);
    } else {
      addProduct(tenantSlug, productId);
    }
  };

  const isProductInCart = (productId: string) => productIds.includes(productId);

  const clearTenantCart = () => clearCart(tenantSlug);

  return {
    productIds,
    addProduct: (productId: string) => addProduct(tenantSlug, productId),
    removeProduct: (productId: string) => removeProduct(tenantSlug, productId),
    clearCart: clearTenantCart,
    clearAllCarts,
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,
  };
};
