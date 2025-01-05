import { useFetchDeleteFarms } from "./useFetchDeleteFarms";

let mockUseMutation: jest.Mock;
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: () => mockUseMutation(),
}));

describe("useFetchDeleteFarms", () => {
  const farmId = "1";

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMutation = jest.fn().mockReturnValue({
      mutate: jest.fn(),
      isSuccess: false,
    });
  });

  it("should call the mutate function with the correct argument", async () => {
    const { mutate } = useFetchDeleteFarms();
    await mutate(farmId);
    expect(mockUseMutation().mutate).toHaveBeenCalledWith(farmId);
  });

  it("should return the correct values when the mutation is successful", async () => {
    mockUseMutation = jest.fn().mockReturnValue({
      mutate: jest.fn().mockResolvedValueOnce(farmId),
      isSuccess: true,
    });
    const { mutate, isSuccess } = useFetchDeleteFarms();
    await mutate(farmId);
    expect(isSuccess).toBe(true);
  });
});

