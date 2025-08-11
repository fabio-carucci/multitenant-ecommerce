import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Where } from "payload";
import z from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(z.object({ category: z.string().nullable().optional() }))
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      if (input.category) {
        const categoriesData = await ctx.payload.find({
          collection: "categories",
          limit: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const parentCategory = categoriesData.docs[0];
        if (parentCategory) {
          where["category.slug"] = {
            equals: parentCategory.slug,
          };
        }
      }

      const data = await ctx.payload.find({
        collection: "products",
        depth: 1, // populate "category" & "image"
        where,
      });
      return data;
    }),
});
