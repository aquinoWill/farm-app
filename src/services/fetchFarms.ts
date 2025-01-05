import { RegistryFormTypes } from "@/hooks/fetch.types";
import { throws } from "assert";

export const fetchFarms = async (): Promise<RegistryFormTypes[]> => {
  try {
    const response = await fetch("http://localhost:4000/farms");
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching farms");
  }
};

export default fetchFarms;
