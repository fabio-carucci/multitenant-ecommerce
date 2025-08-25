"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { StarIcon } from "lucide-react";

interface Props {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

const StarPicker = ({ value = 0, onChange, disabled, className }: Props) => {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div
      className={cn(
        "flex items-center",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          className={cn(
            "p-0.5 hover:scale-110 transition-all",
            !disabled ? "cursor-pointer" : "cursor-not-allowed hover:scale-100"
          )}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
        >
          <StarIcon
            className={cn(
              "size-5",
              star <= (hoverValue || value)
                ? "fill-black stroke-black"
                : "stroke-black"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default StarPicker;
