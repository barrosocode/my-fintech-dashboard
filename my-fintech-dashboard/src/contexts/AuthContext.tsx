import React, {createContext, useState, useEffect, useContext} from "react";
import {User} from "../types";
import {me} from "../services/auth"; // Importa a função que chama a API

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string, userData: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        // Se houver token e usuário no localStorage
        if (token && storedUser) {
            // const parsedUser = JSON.parse(storedUser);

            // Validar o token na API
            const validateToken = async () => {
                try {
                    const response = await me(); // Chama o endpoint /me para verificar a autenticidade do token
                    setIsAuthenticated(true);
                    setUser(response); // Atualiza o usuário com a resposta da API
                } catch (error) {
                    // Se falhar (token inválido ou expirado), faz logout automaticamente
                    logout();
                } finally {
                    setLoading(false);
                }
            };
            validateToken();
        } else {
            setLoading(false);
        }
    }, []);

    const login = (token: string, userData: User) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
    };

    if (loading) return null; // Pode adicionar um componente de loading aqui

    return <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    return context;
};
