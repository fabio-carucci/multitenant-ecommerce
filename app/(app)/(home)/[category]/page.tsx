interface Props {
  params: Promise<{ category: string }>;
}

const CategoryPage = async ({ params }: Props) => {
  const { category } = await params;

  return <div>Category: {category}</div>;
};

export default CategoryPage;
