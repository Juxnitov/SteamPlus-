"use client";
import { useState } from "react";
import BtnLogin from "../../components/login/btnLogin";
import BtnLoginGoogle from "../../components/login/btnLoginGoogle";
import Img from "../../components/ui/img";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { login, loading, error } = useLogin();

    const validateForm = () => {
        const newErrors = {};
        
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

    async function handleLogin(e){
        try{
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            const result = await login(email, password);
            if (result) {
                // La redirección se maneja en el hook useLogin
                // Solo mostramos mensaje de éxito si es necesario
            } else {
                setErrors({ submit: "Credenciales incorrectas. Por favor, verifica tu email y contraseña." });
            }
        }catch(error){
            console.log(error);
            setErrors({ submit: "Error al iniciar sesión. Por favor, intenta de nuevo." });
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
                    {error && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <p>{error}</p>
                        </div>
                    )}
                    <div className="flex justify-center">
                        <BtnLogin 
                            mensaje={loading ? "Iniciando sesión..." : "Iniciar sesión"}
                            onClick={handleLogin}
                        />
                    </div>
                    <div className="my-4 flex items-center w-full">
                        <div className="flex-1 border-t border-purple-300"></div>
                        <span className="mx-4 text-purple-700">o</span>
                        <div className="flex-1 border-t border-purple-300"></div>
                    </div>
                    <div className="flex justify-center">
                        <BtnLoginGoogle 
                            mensaje={"Continuar con Google"}
                        />
                    </div>
                    <p className="mt-4 text-purple-700">
                        ¿No tienes una cuenta?{" "}
                        <a href="/register" className="text-purple-500 hover:underline">
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
