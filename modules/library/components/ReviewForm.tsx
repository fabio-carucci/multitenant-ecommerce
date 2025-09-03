import StarPicker from "@/components/star-picker/StarPicker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { ReviewsGetOneOutput } from "@/modules/reviews/types";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  productId: string;
  initialData?: ReviewsGetOneOutput;
}

const formSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  description: z.string().min(3, "Description is required"),
});

const ReviewForm = ({ productId, initialData }: Props) => {
  const [isPreview, setIsPreview] = useState(!!initialData);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createReview = useMutation(
    trpc.reviews.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.reviews.getOne.queryOptions({ productId })
        );
        setIsPreview(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const updateReview = useMutation(
    trpc.reviews.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.reviews.getOne.queryOptions({ productId })
        );
        setIsPreview(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: initialData?.rating ?? 0,
      description: initialData?.description ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (initialData) {
      updateReview.mutate({
        reviewId: initialData.id,
        rating: values.rating,
        description: values.description,
      });
    } else {
      createReview.mutate({
        productId,
        rating: values.rating,
        description: values.description,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <p className="font-medium">
          {isPreview ? "Your rating" : "Liked it? Rate it!"}
        </p>
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Rating</FormLabel>
              <FormControl>
                <StarPicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isPreview}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Want to leave a written review?"
                  disabled={isPreview}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isPreview && (
          <Button
            variant="elevated"
            type="submit"
            disabled={createReview.isPending || updateReview.isPending}
            size="lg"
            className="bg-black text-white hover:bg-pink-400 hover:text-primary w-fit"
          >
            {initialData ? "Update review" : "Post review"}
          </Button>
        )}
        {isPreview && (
          <Button
            onClick={() => setIsPreview(false)}
            variant="elevated"
            type="button"
            size="lg"
            className="w-fit"
          >
            Edit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ReviewForm;

export const ReviewFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <p className="font-medium">Liked it? Rate it!</p>

      <StarPicker disabled />

      <Textarea placeholder="Want to leave a written review?" disabled />

      <Button
        variant="elevated"
        type="button"
        disabled
        size="lg"
        className="bg-black text-white hover:bg-pink-400 hover:text-primary w-fit"
      >
        Post review
      </Button>
    </div>
  );
};
