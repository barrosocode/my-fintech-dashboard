// Imports
import api from "./api";
import {LoginData, RegisterData} from "../types";

/**
 * Funções de gerenciamento de login
 */

// Login
export const login = async (data: LoginData) => {
    const response = await api.post("/login", data);
    return response.data;
};

// Register
export const register = async (data: RegisterData) => {
    const response = await api.post("/register", data);
    return response.data;
};

// me
export const me = async () => {
    const response = await api.get("/me");
    return response.data;
};

// Logout
export const logout = async () => {
    const response = await api.get("/logout");
    return response.data.message;
};
