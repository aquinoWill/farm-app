import { useFetchCreateFarms } from "./useFetchCreateFarms";

let mockUseMutation: jest.Mock;
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: () => mockUseMutation(),
}));

describe("useFetchCreateFarms", () => {
  const data = [
    {
      farmId: "1",
      farmName: "Farm 1",
      landArea: 100,
      landUnit: "ha",
      address: "Address 1",
      cropProductions: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMutation = jest.fn().mockReturnValue({
      mutate: jest.fn(),
      isSuccess: false,
    });
  });

  it("should call the mutate function with the correct argument", async () => {
    const { mutate } = useFetchCreateFarms();
    await mutate(data);
    expect(mockUseMutation().mutate).toHaveBeenCalledWith(data);
  });

  it("should return the correct values when the mutation is successful", async () => {
    const data = [
      {
        farmId: "1",
        farmName: "Farm 1",
        landArea: 100,
        landUnit: "ha",
        address: "Address 1",
        cropProductions: [],
      },
    ];
    mockUseMutation = jest.fn().mockReturnValue({
      mutate: jest.fn().mockResolvedValue(data),
      isSuccess: true,
    });
    const { mutate, isSuccess } = useFetchCreateFarms();
    await mutate(data);
    expect(isSuccess).toBe(true);
  });
});
