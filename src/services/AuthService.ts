import api from "../api";
import { jwtDecode } from "jwt-decode";
import { TOKEN_KEY } from "../const";
import type { JwtPayload, UserLoginForm } from "../types";

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const setToken = (token: string): void =>
  localStorage.setItem(TOKEN_KEY, token);

export const removeToken = (): void => localStorage.removeItem(TOKEN_KEY);

export const isTokenExpired = (): boolean => {
  const token = getToken();
  if (!token) return true;

  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    !exp || (exp < currentTime && console.warn("Token expirado!"));
    return !exp || exp < currentTime;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return true;
  }
};

export const getCurrentUser = () => {
  const token = getToken();
  if (!token) {
    logout();
    return null;
  }

  const { sub } = jwtDecode<JwtPayload>(token);
  return sub ?? null;
};

// Autenticar al usuario y almacenar el token
export const authenticateEmployee = async ({
  username,
  password,
}: UserLoginForm): Promise<void> => {
  try {
    const { data } = await api.post("/auth/authenticate", {
      username,
      password,
    });
    setToken(data.token);
  } catch (error: any) {
    if (error.response?.status === 403) {
      throw new Error("Las credenciales no son válidas");
    }
    throw new Error(error.message || "Error durante la autenticación");
  }
};

// Cerrar sesión
export const logout = (): void => {
  removeToken();
  console.log("Logout --> Moviendo al login...");
  window.location.href = "/login";
};
