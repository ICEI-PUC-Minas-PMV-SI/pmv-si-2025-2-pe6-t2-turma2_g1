import { api } from "./api";
import { jwtDecode } from "jwt-decode";

export const login = async (email, senha) => {
  try {
    const response = await api.post("/usuarios/login", { email, senha });
    if (response.data.token) {
      const token = response.data.token;
      const decodedToken = jwtDecode(token);
      const userResponse = await api.get(`/usuarios/${decodedToken.usuarioId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = { ...userResponse.data, token: token };
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    }
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post("/usuarios/registrar", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => JSON.parse(localStorage.getItem("user"));


export const getUser = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};