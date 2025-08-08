import { getPayload } from "payload";
import configPromise from "@payload-config";

export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  });

  const categories = await payload.find({
    collection: "categories",
  });
  return <div className="p-4">{JSON.stringify(categories, null, 2)}</div>;
}
