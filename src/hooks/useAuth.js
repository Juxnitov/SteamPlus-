"use client";
import { useState, useEffect } from "react";
import { getAccesToken, clearTokens } from "@/lib/auth";
import { useRouter } from "next/navigation";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const checkAuth = () => {
        if (typeof window === "undefined") {
            return false;
        }
        const token = getAccesToken();
        const authenticated = !!token;
        setIsAuthenticated(authenticated);
        setLoading(false);
        return authenticated;
    };

    useEffect(() => {
        // Verificar si hay token al cargar
        checkAuth();

        // Escuchar cambios en localStorage (cuando se actualiza en otra pestaña)
        const handleStorageChange = (e) => {
            if (e.key === 'accessToken' || e.key === 'refreshToken') {
                checkAuth();
            }
        };

        // Escuchar eventos de storage
        window.addEventListener('storage', handleStorageChange);

        // Escuchar evento personalizado para actualizaciones en la misma pestaña
        const handleAuthChange = () => {
            checkAuth();
        };
        window.addEventListener('auth-change', handleAuthChange);

        // Verificar periódicamente (cada 1 segundo) para detectar cambios en la misma pestaña
        const interval = setInterval(checkAuth, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('auth-change', handleAuthChange);
            clearInterval(interval);
        };
    }, []);

    const logout = () => {
        if (typeof window !== "undefined") {
            clearTokens();
            setIsAuthenticated(false);
            // Disparar evento para actualizar otros componentes
            window.dispatchEvent(new Event('auth-change'));
            router.push('/');
        }
    };

    return { isAuthenticated, loading, logout, checkAuth };
};

