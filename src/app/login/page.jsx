"use client";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex min-h-screen w-screen bg-gray-900 text-white">
            <div className="flex flex-col lg:flex-row w-full bg-gray-800 shadow-lg">
                {/* Formato izquierda */}
                <div className="flex items-center justify-center p-8 lg:p-0 lg:w-1/2 bg-gray-900">
                    <img
                        src="../../../logo.jpg"
                        alt="Logo"
                        className="max-w-[200px] rounded-full"
                    />
                </div>
                {/* Formato derecha */}
                <div className="flex flex-col justify-center lg:w-1/2 p-8">
                    <h1 className="text-4xl font-bold mb-6">Steam+</h1>
                    <h2 className="text-lg font-bold mb-4">Tu plataforma de juegos mejorada</h2>
                    <input
                        className="mb-4 p-2 rounded text-black"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="mb-4 p-2 rounded text-black"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="bg-green-600 hover:bg-green-700 p-2 rounded text-white font-bold"
                    >
                        Iniciar sesión
                    </button>
                    <p className="mt-4">
                        ------------------------------ o ------------------------------
                    </p>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 p-2 rounded text-white font-bold mt-4"
                    >
                        Iniciar sesión con Google
                    </button>
                    <img src="../../../google-logo.jpg" alt="Google Logo" className="mt-2 max-w-[100px]" />
                    <p className="mt-4">
                        ¿No tienes una cuenta?{" "}
                        <a href="#" className="text-blue-400 hover:underline">
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
