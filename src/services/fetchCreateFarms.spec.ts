import { fetchCreateFarms } from "./fetchCreateFarms";

const mockResponse = {
  id: "1",
  farmName: "Farm1",
  landArea: 100,
  landUnit: "ha",
  address: "Address 1",
  cropProductions: [],
};

describe("fetchCreateFarms", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete farm when data is available", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    });
    const data = await fetchCreateFarms(mockResponse);
    expect(data).toEqual(mockResponse);
  });

  it("should throw error when data is not available", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error("Error creating farms"));
    await expect(fetchCreateFarms(mockResponse)).rejects.toThrow("Error creating farms");
  });

  it("should throw error when response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });
    await expect(fetchCreateFarms(mockResponse)).rejects.toThrow("Error creating farms");
  });
});
