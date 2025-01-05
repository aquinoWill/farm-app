import { useQuery } from "@tanstack/react-query";
import { fetchCrops } from "@/services";
import { CropTypes } from "./fetch.types";

type CropsTypes = {
  crops: CropTypes[];
  isLoading: boolean;
  isError: boolean;
}

export const useFetchCrops = (): CropsTypes => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["crops"],
    queryFn: () => fetchCrops(),
  });

  return { crops: data as CropTypes[], isError, isLoading };
};
