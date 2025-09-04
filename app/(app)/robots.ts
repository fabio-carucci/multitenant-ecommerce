import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api", "/admin"],
    },
    sitemap: "https://multitenant-ecommerce-dun.vercel.app/sitemap.xml",
  };
}
