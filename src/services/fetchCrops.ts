import { CropTypes } from "@/hooks/fetch.types";

export const fetchCrops = async (): Promise<CropTypes[]> => {
  const response = await fetch("http://localhost:4000/crop-types");
  return await response.json();
};
