"use client";

import { useRouter } from "next/navigation";
import Img from "@/components/ui/img";
import { useCart } from "@/store/CartContext";
import { useAuth } from "@/hooks/useAuth";

export default function AddGame({ nombre, precio, cantidad = 1, imagen, img, descripcion }) {
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const imageSrc = imagen || img || "/logo.png";

  const handleAdd = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    addItem({ nombre, precio, cantidad, imagen: imageSrc, descripcion });
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4 flex gap-4 items-center">
      <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded overflow-hidden">
        <Img src={imageSrc} alt={nombre} className="object-cover w-full h-full" />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-lg text-blue-600">{nombre}</h4>
        <p className="text-gray-700 text-sm">{descripcion}</p>
        <div className="flex gap-6 mt-2 text-sm">
          <span className="font-semibold text-gray-600">Precio</span>
          <span className="font-bold text-green-600">${Number(precio).toFixed(2)}</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-sm text-gray-600">Cantidad: {parseInt(cantidad, 10)}</span>
        <button
          className={`mt-2 px-3 py-2 rounded ${isAuthenticated ? "bg-purple-500 hover:bg-purple-600 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
          onClick={handleAdd}
          disabled={!isAuthenticated}
        >
          {isAuthenticated ? "Añadir al carrito" : "Inicia sesión"}
        </button>
      </div>
    </div>
  );
}

