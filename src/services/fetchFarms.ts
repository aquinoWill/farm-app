import { RegistryFormTypes } from "@/hooks/fetch.types";

export const fetchFarms = async (): Promise<RegistryFormTypes[]> => {
  const response = await fetch("http://localhost:4000/farms");
  return await response.json();
};

export default fetchFarms;
