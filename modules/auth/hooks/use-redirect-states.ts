import { parseAsString, useQueryStates } from "nuqs";

export const useRedirectStates = () => {
  return useQueryStates({
    redirect: parseAsString.withDefault("/").withOptions({
      clearOnDefault: true,
    }),
  });
};
