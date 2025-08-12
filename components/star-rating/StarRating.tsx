import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

const MIN_RATING = 0;
const MAX_RATING = 5;

interface Props {
  rating: number;
  className?: string;
  iconClassName?: string;
  text?: string;
}

const StarRating = ({ rating, className, iconClassName, text }: Props) => {
  const safeRating = Math.max(MIN_RATING, Math.min(rating, MAX_RATING));
  return (
    <div
      className={cn("flex items-center gap-x-1", className)}
      role="img"
      aria-label={`${safeRating} out of ${MAX_RATING} stars`}
    >
      {Array.from({ length: MAX_RATING }, (_, index) => (
        <StarIcon
          key={index}
          aria-hidden="true"
          className={cn(
            "size-4",
            index < safeRating ? "fill-black" : "",
            iconClassName
          )}
        />
      ))}
      {text && <p>{text}</p>}
    </div>
  );
};

export default StarRating;
