import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Category } from "@/payload-types";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.payload.find({
      collection: "categories",
      pagination: false,
      depth: 1, // Populate subcategories
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    });

    const formattedData = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((sub) => ({
        // Because of "depth: 1", we are confident that subcategories is a Category
        ...(sub as Category),
        subcategories: undefined,
      })),
    }));
    return formattedData;
  }),
});
