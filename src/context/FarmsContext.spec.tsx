import { renderHook, waitFor } from "@testing-library/react";
import { initialState, FarmsProvider, useFarms } from "./FarmsContext";

describe("FarmsContext", () => {
  it("should return the initial state", () => {
    const { result } = renderHook(() => useFarms());
    expect(result.current).toEqual(initialState);
  });

  it("should update the state when setFarms is called", async () => {
    const { result } = renderHook(() => useFarms(), {
      wrapper: FarmsProvider,
    });
    const farms = [
      {
        id: "1",
        farmName: "Farm 1",
        landArea: 100,
        landUnit: "ha",
        address: "Address 1",
        cropProductions: [],
      },
    ];
    result.current.setFarms(farms);
    await waitFor(() => expect(result.current.farms).toEqual(farms));
  });

  it("should update the state when setFilterFarms is called", async () => {
    const { result } = renderHook(() => useFarms(), {
      wrapper: FarmsProvider,
    });
    const filterFarms = [
      {
        id: "1",
        farmName: "Farm 1",
        landArea: 100,
        landUnit: "ha",
        address: "Address 1",
        cropProductions: [],
      },
    ];
    result.current.setFilterFarms(filterFarms);
    await waitFor(() => expect(result.current.filterFarms).toEqual(filterFarms));
  });
});
