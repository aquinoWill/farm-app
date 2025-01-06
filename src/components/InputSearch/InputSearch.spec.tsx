import { render, screen, fireEvent } from "@testing-library/react";
import { useFetchFarms } from "@/hooks";
import InputSearch from ".";

jest.mock("@/context", () => ({
  farms: [],
  filterFarms: () => [],
  useFarms: () => ({
    farms: [],
    setFarms: jest.fn(),
    isLoading: false,
    error: null,
  }),
}));

jest.mock("@/hooks", () => ({
  ...jest.requireActual("@/hooks"),
  useFetchFarms: jest.fn(),
}));

describe("InputSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    render(<InputSearch />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  it("should capture input value", () => {
    render(<InputSearch />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    expect(input).toHaveValue("test");
  });
  it("should filter farms", () => {
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

    render(<InputSearch />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Farm 1" } });
    const filteredFarms = screen.queryAllByTestId('farm-item');
    expect(filteredFarms.length).toBe(0);
  });

  it("should render without farms", () => {
    (useFetchFarms as jest.Mock).mockReturnValue({
      dataFarms: [],
      isLoading: false,
      error: null,
    });

    render(<InputSearch />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    const filteredFarms = screen.queryAllByTestId("farm-item");
    expect(filteredFarms.length).toBe(0);
  });
});
