import { fetchDeleteFarms } from "./fetchDeleteFarms";

describe("fetchDeleteFarms", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete farm when data is available", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ ok: true }),
    });
    const data = await fetchDeleteFarms("1");
    expect(data).toEqual({ ok: true });
  });

  it("should throw error when data is not available", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error("Error deleteing farms"));
    await expect(fetchDeleteFarms("1")).rejects.toThrow("Error deleteing farms");
  });

  it("should throw error when response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });
    await expect(fetchDeleteFarms("1")).rejects.toThrow("Error deleteing farms");
  });
});
