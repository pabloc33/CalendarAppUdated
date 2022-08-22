import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CalendarPage from "../../src/calendar/pages/CalendarPage";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import AppRouter from "../../src/router/AppRouter";

jest.mock("../../src/hooks/useAuthStore");

jest.mock("../../src/calendar/pages/CalendarPage", () => {
  const CalendarPage = () => <h1>CalendarPage</h1>;
  return CalendarPage;
});

describe("Pruebas en <AppRouter/>", () => {
  const mockcheckAuthToken = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("debe de mostrar la pantalla de carga y llamar checkAuthToken", () => {
    useAuthStore.mockReturnValue({
      status: "checking",
      checkAuthToken: mockcheckAuthToken,
    });

    render(<AppRouter />);

    expect(screen.getByText("Cargando...")).toBeTruthy();
    expect(mockcheckAuthToken).toBeCalled();
  });

  test("debe de mostrar el login en caso de no estar autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "no-authenticated",
      checkAuthToken: mockcheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("Ingreso")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test("debe de mostrar el calendario en caso de estar autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "authenticated",
      checkAuthToken: mockcheckAuthToken,
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("CalendarPage")).toBeTruthy();
  });
});
