"use client";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Formulario de compra</h1>

      <p>Formulario simple de prueba. Puedes poner lo que quieras aquí.</p>

      <Link href="/checkout/send">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
          Mandar datos bancarios
        </button>
      </Link>
    </div>
  );
}
