import { caller } from "@/trpc/server";

interface Props {
  params: Promise<{ category: string }>;
}

const CategoryPage = async ({ params }: Props) => {
  const { category } = await params;

  const products = await caller.products.getMany();

  return (
    <div>
      Category: {category}
      <br />
      Products: {JSON.stringify(products, null, 2)}
    </div>
  );
};

export default CategoryPage;
