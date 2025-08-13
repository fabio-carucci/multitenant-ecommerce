import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CircleXIcon, Loader2 } from "lucide-react";

interface Props {
  total: number;
  onPurchase: () => void;
  isCanceled?: boolean;
  disabled?: boolean;
}

const CheckoutSidebar = ({
  total,
  onPurchase,
  isCanceled,
  disabled,
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
          onClick={onPurchase}
          disabled={disabled}
          aria-busy={disabled || undefined}
          size="lg"
          className="text-base w-full text-white bg-primary hover:bg-pink-400 hover:text-primary"
        >
          {disabled ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Processing…
            </span>
          ) : (
            "Checkout"
          )}
        </Button>
      </div>
      {isCanceled && (
        <div className="p-4 flex items-center justify-center border-t">
          <div className="bg-red-100 border border-red-400 font-medium px-4 py-3 rounded flex items-center w-full">
            <div
              className="flex items-center"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
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
