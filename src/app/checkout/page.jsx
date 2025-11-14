"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    clearCart(); // limpia carrito
    router.push("/cart"); // vuelve al carrito
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Formulario de pago</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Mandar datos bancarios
        </button>

      </form>
    </div>
  );
}
