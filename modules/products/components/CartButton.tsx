import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import Link from "next/link";

interface Props {
  tenantSlug: string;
  productId: string;
  isPurchased: boolean;
}

/**
 * A button to add or remove a product from the cart for a given tenant.
 *
 * @param tenantSlug - The slug of the tenant.
 * @param productId - The identifier of the product to add/remove from cart.
 * @param isPurchased - Whether the product is already purchased.
 * @returns A button element.
 */
const CartButton = ({ tenantSlug, productId, isPurchased }: Props) => {
  const cart = useCart(tenantSlug);

  if (isPurchased) {
    return (
      <Button
        variant="elevated"
        asChild
        className="flex-1 font-medium bg-white"
      >
        <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/library/${productId}`}>
          View in library
        </Link>
      </Button>
    );
  }
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
