'use client'
import { ReactNode } from "react";
import { AuthProvider } from "./authContext";

export function PageWithAuth({children}: {children: ReactNode}) {
    
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
        )
}