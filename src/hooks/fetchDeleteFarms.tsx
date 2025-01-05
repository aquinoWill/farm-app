import { useMutation } from "@tanstack/react-query";
import { fetchDeleteFarms } from "@/services";

export const useFetchDeleteFarms = () => {
  const { mutate, isSuccess } = useMutation({
    mutationFn: (farmId: string) => fetchDeleteFarms(farmId),
  });

  return { mutate, isSuccess };
};
