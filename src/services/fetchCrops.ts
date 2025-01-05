import { CropTypes } from "@/hooks/fetch.types";

export const fetchCrops = async (): Promise<CropTypes[]> => {
  try {
    const response = await fetch("http://localhost:4000/crop-types");
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching crops");
  }
};
