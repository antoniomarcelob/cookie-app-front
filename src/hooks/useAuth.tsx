// import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from "react";
// import { jwtDecode } from "jwt-decode";

// interface User {
//     username: string;
//     userId: string;
// }

// interface SessionData {
//     user: User | null;
//     setUser: Dispatch<SetStateAction<User | null>>;
// }

// const AuthContext = createContext<SessionData | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//     const [user, setUser] = useState<User | null>(null);

//     return (
//         <AuthContext.Provider value={{ user, setUser }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export function useAuth(accessToken?: string) {
//     const context = useContext(AuthContext);
    
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }


//     if(accessToken) {
//         const decoded = jwtDecode(accessToken);
//         console.log("DECODED: ", decoded)
//         // context?.setUser
//         // context.setUser
//     }
//     return context;
// }

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Função para atualizar o estado de autenticação no contexto
    const setAuthStatus = (status: boolean) => {
        setIsAuthenticated(status);
    };

    // Função para verificar a autenticação em requisições subsequentes (backend)
    const checkAuthStatus = async () => {
        try {
            const response = await fetch('/api/auth/status', {
                method: 'GET',
                credentials: 'include', // Garante que os cookies HttpOnly sejam enviados
            });
            if (response.status === 200) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    // Chama a verificação de autenticação no início
    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
