import { render, screen } from "@testing-library/react";
import { useFetchFarms, useFetchDeleteFarms } from "@/hooks";
import ListFarms from ".";

jest.mock("@/context", () => ({
  farms: [],
  filterFarms: () => [],
  useFarms: () => ({
    farms: [],
    setFarms: jest.fn(),
    isLoading: false,
    error: null,
  }),
  useAlerts: () => ({ showAlert: jest.fn() }),
}));

jest.mock("@/hooks", () => ({
  ...jest.requireActual("@/hooks"),
  useFetchFarms: jest.fn(),
  useFetchDeleteFarms: jest.fn(),
}));

describe("ListFarms", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    (useFetchFarms as jest.Mock).mockReturnValue({
      dataFarms: [
        {
          farmId: "1",
          farmName: "Farm 1",
          landArea: 100,
          landUnit: "ha",
          address: "Address 1",
          deleteFarm: jest.fn(),
        },
      ],
      isLoading: false,
      error: null,
    });

    (useFetchDeleteFarms as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isSuccess: true,
    });

    render(<ListFarms />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("should render pagination", () => {
    (useFetchFarms as jest.Mock).mockReturnValue({
      dataFarms: [
        {
          farmId: "1",
          farmName: "Farm 1",
          landArea: 100,
          landUnit: "ha",
          address: "Address 1",
          deleteFarm: jest.fn(),
        },
      ],
      isLoading: false,
      error: null,
    });

    (useFetchDeleteFarms as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isSuccess: true,
    });

    render(<ListFarms />);
    const paginationButtons = screen.getAllByRole("button");
    expect(paginationButtons.length).toBe(2);
  });
});
