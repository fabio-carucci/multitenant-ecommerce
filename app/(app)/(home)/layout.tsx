import Footer from "@/components/footer";
import Navbar from "@/components/navigation";
import SearchFilters from "@/components/search-filters";

import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Category } from "@/payload-types";

const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    pagination: false,
    depth: 1, // Populate subcategories
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((sub) => ({
      // Because of "depth: 1", we are confident that subcategories is a Category
      ...(sub as Category),
      subcategories: undefined,
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
