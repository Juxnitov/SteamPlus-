import { apiFetch } from "@/lib/apiClient";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setTokens } from "@/lib/auth"; // importar

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const router = useRouter();
    
    const login = async (email, password) => {
        try {
            setLoading(true);
            setError(null);
            setData(null);

            const response = await apiFetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const msg = await response.text();
                setError(msg);
                return false;
            }

            const dataJson = await response.json();
            // Guardar ambos tokens
            setTokens(dataJson.accessToken, dataJson.refreshToken);

            setData(dataJson);
            // router.push('/'); // redirigir
            return true;
        } catch (err) {
            console.error("Error en login:", err);
            setError("Error de conexión o servidor");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error, data };
};
