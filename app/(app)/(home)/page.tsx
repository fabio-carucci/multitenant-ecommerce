"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.auth.session.queryOptions());

  return <div>{JSON.stringify(data?.user, null, 2)}</div>;
};

export default Home;
