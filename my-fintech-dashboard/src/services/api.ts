import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api", // substitui pela URL da tua API
});

// Interceptor pra incluir token automaticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // ou sessionStorage, dependendo de como tá salvando

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
