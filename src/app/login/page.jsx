"use client";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex min-h-screen w-screen bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 text-white">
            <div className="flex flex-col lg:flex-row w-full bg-purple-100 rounded-lg shadow-lg m-4">
                {/* Formato izquierda */}
                <div className="flex items-center justify-center p-8 lg:p-0 lg:w-1/2 bg-purple-200">
                    <img
                        src="../../../logo.jpg"
                        alt="Logo"
                        className="max-w-[200px] rounded-[100px] shadow-lg"
                    />
                </div>
                {/* Formato derecha */}
                <div className="flex flex-col justify-center lg:w-1/2 p-8">
                    <h1 className="text-4xl font-bold mb-6 text-purple-900">Steam+</h1>
                    <h2 className="text-lg font-bold mb-4 text-purple-800">Tu plataforma de juegos mejorada</h2>
                    <input
                        className="mb-4 p-2 rounded text-black bg-purple-50"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="mb-4 p-2 rounded text-black bg-purple-50"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="flex justify-center">
                        <button
                            className="bg-purple-500 hover:bg-purple-600 p-2 rounded max-w-[300px] w-full text-white font-bold"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                    <div className="my-4 flex items-center w-full">
                        <div className="flex-1 border-t border-purple-300"></div>
                        <span className="mx-4 text-purple-700">o</span>
                        <div className="flex-1 border-t border-purple-300"></div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-purple-400 hover:bg-purple-500 p-2 rounded max-w-[300px] text-white font-bold mt-4 flex items-center justify-center"
                            style={{ minWidth: 0, width: "100%", position: "relative" }}
                            >
                            <div className="flex items-center justify-center w-full relative">
                                <img src="../../../google_logo.png" alt="Google Logo" className="max-w-[20px] mr-2 absolute left-0" />
                                <span className="w-full text-center">Iniciar sesión con Google</span>
                            </div>
                        </button>
                    </div>
                    <p className="mt-4 text-purple-700">
                        ¿No tienes una cuenta?{" "}
                        <a href="#" className="text-purple-500 hover:underline">
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
