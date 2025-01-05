import { useMutation } from "@tanstack/react-query";
import { RegistryFormTypes } from "./fetch.types";
import { fetchCreateFarms } from "@/services";

export const useFetchCreateFarms = () => {
  const { mutate, isSuccess } = useMutation({
    mutationFn: (body: RegistryFormTypes) => fetchCreateFarms(body),
  });

  return { mutate, isSuccess };
};
