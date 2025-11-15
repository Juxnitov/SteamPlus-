"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expDate: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Por ahora no validamos nada
    router.push("/checkout/send");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Formulario de compra</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Nombre */}
        <div>
          <label className="block font-semibold mb-1">Nombre completo</label>
          <input
            type="text"
            name="name"
            placeholder="Juan Pérez"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Número de tarjeta */}
        <div>
          <label className="block font-semibold mb-1">Número de tarjeta</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={form.cardNumber}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Fecha de expiración */}
        <div>
          <label className="block font-semibold mb-1">Fecha de expiración</label>
          <input
            type="text"
            name="expDate"
            placeholder="MM/AA"
            value={form.expDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-700"
        >
          Mandar datos bancarios
        </button>

      </form>
    </div>
  );
}
