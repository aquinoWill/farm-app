import { useFetchCrops } from "./useFetchCrops";

let mockUseQuery: jest.Mock

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: (queryKey: string, queryFn: () => Promise<any>) => mockUseQuery()
}));

describe("useFetchCrops", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("should return farms when data is available", async () => {
    mockUseQuery = jest.fn().mockReturnValueOnce({ isLoading: true });
    const { isLoading } = useFetchCrops();
    expect(isLoading).toBe(true);
  });
  it("should return error when data is not available", async () => {
    mockUseQuery = jest.fn().mockReturnValueOnce({ isLoading: false, isError: true });
    const { isError } = useFetchCrops();
    expect(isError).toBe(true);
  })
  it("should return farms when data is available", async () => {
    mockUseQuery = jest.fn().mockReturnValueOnce({ isLoading: false, isError: false, data: [] });
    const { crops } = useFetchCrops();
    expect(crops).toEqual([]);
  })
});
