import { useFetchFarms } from "./useFetchFarms";

let mockUseQuery: jest.Mock

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: (queryKey: string, queryFn: () => Promise<any>) => mockUseQuery()
}));

describe("useFetchFarms", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("should return farms when data is available", async () => {
    mockUseQuery = jest.fn().mockReturnValueOnce({ isLoading: true });
    const { isLoading } = useFetchFarms();
    expect(isLoading).toBe(true);
  });
  it("should return error when data is not available", async () => {
    mockUseQuery = jest.fn().mockReturnValueOnce({ isLoading: false, isError: true });
    const { isError } = useFetchFarms();
    expect(isError).toBe(true);
  })
  it("should return farms when data is available", async () => {
    mockUseQuery = jest.fn().mockReturnValueOnce({ isLoading: false, isError: false, data: [] });
    const { dataFarms } = useFetchFarms();
    expect(dataFarms).toEqual([]);
  })
});
