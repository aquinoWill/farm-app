import { RegistryFormTypes } from "@/hooks";

export const fetchCreateFarms = async (body: RegistryFormTypes): Promise<RegistryFormTypes[]> => {
  try {
    const response = await fetch("http://localhost:4000/farms", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    throw new Error("Error creating farms");
  }
};
