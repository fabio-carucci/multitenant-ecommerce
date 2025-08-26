import type { CollectionConfig } from "payload";
import { isSuperAdmin } from "@/lib/access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  access: {
    read: () => true,
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
