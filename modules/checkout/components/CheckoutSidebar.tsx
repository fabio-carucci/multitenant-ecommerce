import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CircleXIcon } from "lucide-react";

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
      {isCanceled && (
        <div className="p-4 flex items-center justify-center border-t">
          <div className="bg-red-100 border border-red-400 font-medium px-4 py-3 rounded flex items-center w-full">
            <div className="flex items-center">
              <CircleXIcon className="size-6 mr-2 fill-red-500 text-red-100" />
              <span>Checkout failed. Please try again.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutSidebar;
