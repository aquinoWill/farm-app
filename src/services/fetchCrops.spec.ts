import { fetchCrops } from "./fetchCrops";

describe("fetchCrops", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete farm when data is available", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ id: "1", name: "RICE" }),
    });
    const data = await fetchCrops();
    expect(data).toEqual({ id: "1", name: "RICE" });
  });

  it("should throw error when data is not available", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error("Error fetching crops"));
    await expect(fetchCrops()).rejects.toThrow("Error fetching crops");
  });

  it("should throw error when response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });
    await expect(fetchCrops()).rejects.toThrow("Error fetching crops");
  });
});
