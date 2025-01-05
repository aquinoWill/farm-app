import { render, screen, fireEvent } from "@testing-library/react";
import { useFetchFarms, useFetchDeleteFarms } from "@/hooks";
import ListFarms from ".";

jest.mock("@/context", () => ({
  farms: [],
  filterFarms: () => [],
  useFarms: () => ({
    farms: [],
    isLoading: false,
    error: null,
  }),
  useAlerts: () => ({ showAlert: jest.fn() }),
}))

jest.mock("@/hooks", () => ({
  useFetchFarms: jest.fn(),
  useFetchDeleteFarms: jest.fn(),
}));

describe("ListFarms", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("should render successfully", () => {
    ( useFetchFarms as jest.Mock).mockReturnValue({
      farms: [{
        farmId: "1",
        farmName: "Farm 1",
        landArea: 100,
        landUnit: "ha",
        address: "Address 1",
        deleteFarm: jest.fn(),
      }],
      isLoading: false,
      error: null,
    })
    (useFetchDeleteFarms as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isSuccess: false
    })
    render(<ListFarms />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  // it("should render empty list", () => {
  //   render(<ListFarms farms={[]} />);
  //   expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  // });

  // it("should render list with items", () => {
  //   const farms = [
  //     { farmName: "Farm 1" },
  //     { farmName: "Farm 2" },
  //     { farmName: "Farm 3" },
  //   ];

  //   render(<ListFarms farms={farms} />);
  //   const listItems = screen.getAllByRole("listitem");
  //   expect(listItems.length).toBe(3);
  //   expect(listItems[0]).toHaveTextContent("Farm 1");
  //   expect(listItems[1]).toHaveTextContent("Farm 2");
  //   expect(listItems[2]).toHaveTextContent("Farm 3");
  // });

  // it("should render pagination", () => {
  //   const farms = Array.from({ length: 20 }, (_, i) => ({ farmName: `Farm ${i}` }));

  //   render(<ListFarms farms={farms} />);
  //   const pagination = screen.getByRole("pagination");

  //   expect(pagination).toBeInTheDocument();

  //   const paginationButtons = screen.getAllByRole("button");

  //   expect(paginationButtons.length).toBe(5);
  //   expect(paginationButtons[0]).toHaveTextContent("1");
  //   expect(paginationButtons[1]).toHaveTextContent("2");
  //   expect(paginationButtons[2]).toHaveTextContent("3");
  //   expect(paginationButtons[3]).toHaveTextContent("4");
  //   expect(paginationButtons[4]).toHaveTextContent("5");
  // });

  // it("should delete farm", () => {
  //   const farms = [
  //     { farmName: "Farm 1" },
  //     { farmName: "Farm 2" },
  //     { farmName: "Farm 3" },
  //   ];

  //   render(<ListFarms farms={farms} />);

  //   const deleteButton = screen.getByRole("button", { name: "Delete Farm" });
  //   fireEvent.click(deleteButton);
  //   const listItems = screen.getAllByRole("listitem");
  //   expect(listItems.length).toBe(2);
  //   expect(listItems[0]).toHaveTextContent("Farm 1");
  //   expect(listItems[1]).toHaveTextContent("Farm 3");
  // });

  // it("should render error message", () => {
  //   const error = new Error("Erro ao carregar fazendas");
  //   render(<ListFarms error={error} />);
  //   const errorMessage = screen.getByRole("alert");
  //   expect(errorMessage).toBeInTheDocument();
  //   expect(errorMessage).toHaveTextContent("Erro ao carregar fazendas");
  // });
});
