import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  admin: {
    useAsTitle: "description",
  },
  fields: [
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: false,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
    },
  ],
};
