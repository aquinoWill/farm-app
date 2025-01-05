import { render, screen, fireEvent } from "@testing-library/react";
import { FarmCards } from ".";

const mockFarms = [
  {
    farmId: "1",
    farmName: "Farm 1",
    landArea: 100,
    landUnit: "ha",
    address: "Address 1",
    deleteFarm: jest.fn(),
  },
  {
    farmId: "2",
    farmName: "Farm 2",
    landArea: 200,
    landUnit: "ha",
    address: "Address 2",
    deleteFarm: jest.fn(),
  },
];

describe("FarmCards", () => {
  it("should render successfully", () => {
    render(<FarmCards {...mockFarms[0]} />);
    expect(screen.getByText(mockFarms[0].farmName)).toBeInTheDocument();
  });
  it("should call deleteFarm function when button is clicked", async () => {
    const deleteFarmMock = jest.fn();
    render(<FarmCards {...mockFarms[0]} deleteFarm={deleteFarmMock} />);
    const button = screen.getByRole("button", { name: "delete" });

    fireEvent.click(button);
    expect(deleteFarmMock).toHaveBeenCalledTimes(1);
    expect(deleteFarmMock).toHaveBeenCalledWith(mockFarms[0].farmId);
  });
})
