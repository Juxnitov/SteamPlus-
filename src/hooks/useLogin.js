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
                let errorMsg = "Error al iniciar sesión";
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorMsg;
                } catch {
                    const msg = await response.text();
                    errorMsg = msg || errorMsg;
                }
                setError(errorMsg);
                return false;
            }

            const dataJson = await response.json();
            // Guardar ambos tokens
            if (dataJson.accessToken && dataJson.refreshToken) {
                setTokens(dataJson.accessToken, dataJson.refreshToken);
            } else {
                console.error('❌ No se recibieron tokens del servidor');
                setError("Error: No se recibieron tokens del servidor");
                return false;
            }

            setData(dataJson);
            // Redirigir al inicio después de login exitoso
            // Usar setTimeout para asegurar que el estado se actualice antes de redirigir
            setTimeout(() => {
                router.push('/');
            }, 100);
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
