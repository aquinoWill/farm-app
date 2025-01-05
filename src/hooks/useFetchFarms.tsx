import { useQuery } from "@tanstack/react-query";
import { RegistryFormTypes } from "./fetch.types";
import { fetchFarms } from "@/services";

type FarmsTypes = {
  dataFarms: RegistryFormTypes[];
  isLoading: boolean;
  isError: boolean;
}

export const useFetchFarms = (): FarmsTypes => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["farms"],
    queryFn: () => fetchFarms(),
  });

  return { dataFarms: data as RegistryFormTypes[], isError, isLoading };
};
