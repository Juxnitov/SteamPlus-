"use client";
import Link from "next/link";
import Img from "../components/ui/img";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
    const { isAuthenticated, loading, logout } = useAuth();

    return (
        <header className="bg-purple-600 text-white p-4 shadow-lg">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                        <Img
                            src={"../../../logo.png"}
                            alt={"Logo"}
                            className="size-12 rounded-full shadow-lg object-cover"
                        />
                        <span className="font-bold text-xl text-white">Steam+</span>
                    </Link>
                    <span className="text-purple-300">|</span>
                    <Link href="/" className="text-white hover:text-purple-200 transition font-semibold">Store</Link> 
                    <Link href="/festivals/indieFestival" className="text-white hover:text-purple-200 transition font-semibold">Festivales</Link>
                </div>
               
                <nav className="flex gap-6 items-center font-bold">
                    {loading ? (
                        <span className="text-purple-200">Cargando...</span>
                    ) : (
                        <>
                            {!isAuthenticated ? (
                                <>
                                    <Link href="/login" className="text-white hover:text-purple-200 transition">
                                        Iniciar Sesión
                                    </Link>
                                    <Link href="/register" className="text-white hover:text-purple-200 transition">
                                        Registrarse
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/cart" className="bg-purple-500 hover:bg-purple-700 px-4 py-2 rounded-lg transition">
                                        Carrito
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="border-2 border-purple-300 hover:bg-purple-700 rounded-3xl px-4 py-1 transition"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
