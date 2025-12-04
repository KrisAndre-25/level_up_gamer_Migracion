import { User } from "../interfaces/User";
import { api } from "./client";

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>("/usuarios");
  return res.data;
};

export const registerUser = async (userData: any) => {
  const res = await api.post("/usuarios", userData);
  return res.data;
};

export const loginUser = async (credentials: { correo: string; password: string }) => {
  const res = await api.post("/usuarios/login", credentials);
  return res.data;
};