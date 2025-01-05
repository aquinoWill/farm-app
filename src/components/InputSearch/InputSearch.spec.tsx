import { render, screen, fireEvent } from "@testing-library/react";
import InputSearch from ".";

describe("InputSearch", () => {
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
  it.skip("should filter farms", () => {
    const farms = [
      { farmName: "Farm 1" },
      { farmName: "Farm 2" },
      { farmName: "Farm 3" },
    ];

    render(<InputSearch farms={farms} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Farm 2" } });
    // const filteredFarms = container.querySelectorAll("farm-item");

    const filteredFarms = screen.queryAllByTestId('farm-item');
    // expect(filteredFarms.length).toBe(1);
    expect(filteredFarms[0]).toHaveTextContent("Farm 2");
  });

  it("should render without farms", () => {
    render(<InputSearch farms={[]} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    const filteredFarms = screen.queryAllByTestId("farm-item");


    expect(filteredFarms.length).toBe(0);
  });
});
