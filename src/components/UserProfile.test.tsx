import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserProfile from "./UserProfile";
import { vi } from "vitest";
import api from "../axiosConfig";

vi.mock("../axiosConfig");
// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

describe("UserProfile", () => {
  // Mock del localStorage
  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(() => "mocked_jwt_token"), // Token simulado
      removeItem: vi.fn(),
    });
  });

  // Mock de alert
  beforeEach(() => {
    vi.stubGlobal("alert", vi.fn());
  });

  it("fetches and displays user data correctly", async () => {
    const userData = {
      username: "testuser",
      email: "testuser@example.com",
      age: 25,
      occupation: "Software Engineer",
      description: "A test user for the application",
    };

    // Mockeamos la respuesta de la API
    vi.mocked(api.get).mockResolvedValueOnce({
      data: userData,
    });

    render(<UserProfile />);
    // Esperamos a que desaparezca el texto "Cargando..."
    await waitForElementToBeRemoved(() => screen.getByText("Cargando..."));

    // Esperamos a que los datos se carguen y se muestren en la pantalla
    await waitFor(() => {
      expect(screen.getByText(/Nombre:/i)).toBeInTheDocument();
      const nombreElement = screen.getByText(/Nombre:/i).parentElement;
      expect(within(nombreElement).getByText("testuser")).toBeInTheDocument();

      expect(screen.getByText(/Email:/i)).toBeInTheDocument();
      const emailElement = screen.getByText(/Email:/i).parentElement;
      expect(
        within(emailElement).getByText("testuser@example.com")
      ).toBeInTheDocument();

      expect(screen.getByText(/Edad:/i)).toBeInTheDocument();
      const edadElement = screen.getByText(/Edad:/i).parentElement;
      expect(within(edadElement).getByText("25")).toBeInTheDocument();

      expect(screen.getByText(/Ocupacion:/i)).toBeInTheDocument();
      const ocupacionElement = screen.getByText(/Ocupacion:/i).parentElement;
      expect(
        within(ocupacionElement).getByText("Software Engineer")
      ).toBeInTheDocument();

      expect(screen.getByText(/Descipcion:/i)).toBeInTheDocument();
      const descripcionElement = screen.getByText(/Descipcion:/i).parentElement;
      expect(
        within(descripcionElement).getByText("A test user for the application")
      ).toBeInTheDocument();
    });
  });

  it("logs out user on button click", async () => {
    // Mockeamos la respuesta de la API para que no falle al cargar el componente
    vi.mocked(api.get).mockResolvedValue({
      data: {}, // No necesitamos datos específicos para este test
    });

    render(<UserProfile />);

    // Esperamos a que el botón de cerrar sesión esté en el documento
    await waitFor(async () => {
      const logoutButton = await screen.findByText("Cerrar Sesión");

      // Simulamos el clic en el botón
      userEvent.click(logoutButton);

      // Verificamos que el token se haya eliminado del localStorage
      expect(localStorage.removeItem).toHaveBeenCalledWith("jwt");

      // Verificamos que se haya navegado a la página de login
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
