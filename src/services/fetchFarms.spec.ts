import { fetchFarms } from "./fetchFarms";

describe("fetchFarms", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return farms when data is available", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([{ farmId: "1", farmName: "Farm 1" }]),
    });
    const data = await fetchFarms();
    expect(data).toEqual([{ farmId: "1", farmName: "Farm 1" }]);
  });

  it("should throw error when data is not available", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Error fetching farms"));
    await expect(fetchFarms()).rejects.toThrow("Error fetching farms");
  });

  it("should throw error when data is not in the correct format", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Error fetching farms"),);
    await expect(fetchFarms()).rejects.toThrow(
      "Error fetching farms"
    );
  });
});
