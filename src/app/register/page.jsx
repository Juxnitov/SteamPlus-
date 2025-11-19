"use client";
import { useState } from "react";
import BtnLogin from "../../components/login/btnLogin";
import BtnLoginGoogle from "../../components/login/btnLoginGoogle";
import Img from "../../components/ui/img";
import { apiFetch } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validateForm = () => {
        const newErrors = {};
        
        // Validar nombre
        if (!nombre.trim()) {
            newErrors.nombre = "El nombre es requerido";
        } else if (nombre.trim().length < 2) {
            newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
        }
        
        // Validar email
        if (!email.trim()) {
            newErrors.email = "El email es requerido";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "El email no es válido";
        }
        
        // Validar password
        if (!password) {
            newErrors.password = "La contraseña es requerida";
        } else if (password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function handleRegister(e) {
        try {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            setLoading(true);
            setErrors({});

            const response = await apiFetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ nombre: nombre.trim(), email: email.trim(), password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrors({ submit: errorData.error || "Error al registrar. Por favor, intenta de nuevo." });
                setLoading(false);
                return;
            }

            const data = await response.json();
            console.log("Registro exitoso:", data);
            // Redirigir al login después de registro exitoso
            router.push('/login?registered=true');
        } catch (error) {
            console.log(error);
            setErrors({ submit: "Error de conexión. Por favor, intenta de nuevo." });
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen w-screen bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 text-white">
            <div className="flex flex-col lg:flex-row w-full bg-purple-100 rounded-lg shadow-lg m-4">
                {/* Formato izquierda */}
                <div className="flex items-center justify-center p-8 lg:p-0 lg:w-1/2 bg-purple-200">
                    <Img
                        src={"../../../logo.png"}
                        alt={"Logo"}
                        className={"max-w-[200px] rounded-lg"}
                    />
                </div>
                {/* Formato derecha */}
                <div className="flex flex-col justify-center lg:w-1/2 p-8">
                    <h1 className="text-4xl font-bold mb-6 text-purple-900">Steam+</h1>
                    <h2 className="text-lg font-bold mb-4 text-purple-800">Tu plataforma de juegos mejorada</h2>
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <input
                                className={`w-full p-2 rounded text-black bg-purple-50 ${errors.nombre ? 'border-2 border-red-500' : 'border border-purple-300'}`}
                                type="text"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => {
                                    setNombre(e.target.value);
                                    if (errors.nombre) setErrors({...errors, nombre: null});
                                }}
                            />
                            {errors.nombre && (
                                <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <input
                                className={`w-full p-2 rounded text-black bg-purple-50 ${errors.email ? 'border-2 border-red-500' : 'border border-purple-300'}`}
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors({...errors, email: null});
                                }}
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <input
                                className={`w-full p-2 rounded text-black bg-purple-50 ${errors.password ? 'border-2 border-red-500' : 'border border-purple-300'}`}
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) setErrors({...errors, password: null});
                                }}
                            />
                            {errors.password && (
                                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                        {errors.submit && (
                            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                <p>{errors.submit}</p>
                            </div>
                        )}
                        <div className="flex justify-center">
                            <BtnLogin 
                                mensaje={loading ? "Registrando..." : "Registrarse"}
                                onClick={handleRegister}
                            />
                        </div>
                    </form>
                    <div className="my-4 flex items-center w-full">
                        <div className="flex-1 border-t border-purple-300"></div>
                        <span className="mx-4 text-purple-700">o</span>
                        <div className="flex-1 border-t border-purple-300"></div>
                    </div>
                    <div className="flex justify-center">
                        <BtnLoginGoogle mensaje={"Continuar con Google"}/>
                    </div>
                    <p className="mt-4 text-purple-700">
                        ¿Ya tienes una cuenta?{" "}
                        <a href="/login" className="text-purple-500 hover:underline">
                            Inicia sesión
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}