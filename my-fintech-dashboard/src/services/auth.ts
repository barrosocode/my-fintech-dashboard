// Imports
import api from "./api";
import {LoginData, RegisterData} from "../types";

// Funções
export const login = async (data: LoginData) => {
    const response = await api.post("/login", data);
    return response.data;
};

export const register = async (data: RegisterData) => {
    const response = await api.post("/register", data);
    return response.data;
};
