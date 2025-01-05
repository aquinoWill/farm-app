import { render, screen } from "@testing-library/react";
import Loading from ".";

describe("Loading", () => {
  it("should render successfully", () => {
    render(<Loading />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
