import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface Props {
  total: number;
  onCheckout: () => void;
  isCanceled?: boolean;
  isPending?: boolean;
}

const CheckoutSidebar = ({
  total,
  onCheckout,
  isCanceled,
  isPending,
}: Props) => {
  return (
    <div className="border rounded-md overflow-hidden bg-white flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h4 className="text-xl font-medium">Total</h4>
        <p className="text-xl font-medium">{formatCurrency(total)}</p>
      </div>
      <div className="p-4 flex items-center justify-center">
        <Button
          variant="elevated"
          onClick={onCheckout}
          disabled={isPending}
          size="lg"
          className="text-base w-full text-white bg-primary hover:bg-pink-400 hover:text-primary"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSidebar;
