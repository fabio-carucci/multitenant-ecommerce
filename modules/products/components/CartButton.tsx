import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";

interface Props {
  tenantSlug: string;
  productId: string;
}

/**
 * A button to add or remove a product from the cart for a given tenant.
 *
 * @param tenantSlug - The slug of the tenant.
 * @param productId - The identifier of the product to add/remove from cart.
 * @returns A button element.
 */
const CartButton = ({ tenantSlug, productId }: Props) => {
  const cart = useCart(tenantSlug);
  return (
    <Button
      variant="elevated"
      className={cn(
        "flex-1 bg-pink-400",
        cart.isProductInCart(productId) && "bg-white"
      )}
      onClick={() => cart.toggleProduct(productId)}
    >
      {cart.isProductInCart(productId) ? "Remove from cart" : "Add to cart"}
    </Button>
  );
};

export default CartButton;
