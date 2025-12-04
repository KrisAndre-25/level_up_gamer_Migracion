// src/utils/auth.ts
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  tipoUsuario: string;
  [key: string]: any;
}

export const getUserRole = (): string | null => {
  const token = localStorage.getItem("token");
  
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.tipoUsuario;
  } catch (error) {
    console.error("Error decodificando token:", error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("token") !== null;
};

export const logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.reload();
};

export const getUserData = (): any | null => {
  const userData = localStorage.getItem("usuario");
  return userData ? JSON.parse(userData) : null;
};