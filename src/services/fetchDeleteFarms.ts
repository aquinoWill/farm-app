export const fetchDeleteFarms = async (farmId: string) => {
  try {
    const response = await fetch(`http://localhost:4000/farms/${farmId}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    throw new Error("Error deleteing farms");
  }
};
