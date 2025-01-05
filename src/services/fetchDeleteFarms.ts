export const fetchDeleteFarms = async (farmId: string) => {
  const response = await fetch(`http://localhost:4000/farms/${farmId}`, {
    method: "DELETE",
  });
  return await response.json();
};
