import { renderHook, screen, fireEvent, waitFor } from "@testing-library/react";
import { AlertsProvider, useAlerts } from "./AlertsContext";

describe("AlertsContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  it("Shold render the component with errors", async () => {
    const { result } = renderHook(() => useAlerts(), {
      wrapper: AlertsProvider,
    });

    result.current.showAlert("Error message", "error");

    await waitFor(() => screen.getByText("Error message"));
    expect(screen.getByText("Error message"))
  });

  it("should render the component with success", async () => {
    const { result } = renderHook(() => useAlerts(), {
      wrapper: AlertsProvider,
    });

    result.current.showAlert("Sucess message", "success");

    await waitFor(() => screen.getByText("Sucess message"));
    expect(screen.getByText("Sucess message"))
  });

  it("should render the component with success", async () => {
    const { result } = renderHook(() => useAlerts(), {
      wrapper: AlertsProvider,
    });

    result.current.showAlert("Registry farm created successfully", "success");

    await waitFor(() => screen.getByText("Registry farm created successfully"));
    expect(screen.getByText("Registry farm created successfully"))
  });

  it("Should render the component with warning", async () => {
    const { result } = renderHook(() => useAlerts(), {
      wrapper: AlertsProvider,
    });

    result.current.showAlert("Attencion to register", "warning");

    const alert = await waitFor(() => screen.getByText("Attencion to register"));
    expect(screen.getByText("Attencion to register"))
  });

  it("should render the component with info", async () => {
    const { result } = renderHook(() => useAlerts(), {
      wrapper: AlertsProvider,
    });

    result.current.showAlert("Registry farm created successfully", "info");

    await waitFor(() => screen.getByText("Registry farm created successfully"));
    expect(screen.getByText("Registry farm created successfully"))
  });

  it("Should close the alert", async () => {
    const { result } = renderHook(() => useAlerts(), {
      wrapper: AlertsProvider,
    });

    result.current.showAlert("Error message", "error");

    await waitFor(() => screen.getByText("Error message"));
    const closeButton = await waitFor(() => screen.getByRole("button", { name: "Close" }));

    fireEvent.click(closeButton);
    waitFor(() => expect(alert).not.toBeInTheDocument());
  });
});
