"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function ReceiptPage() {
  const { receipt } = useCart();

  if (!receipt || receipt.length === 0)
    return <p>No hay recibo disponible.</p>;

  const total = receipt.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-5">
      <h1 className="text-3xl font-bold">Recibo de compra</h1>

      {receipt.map((p, i) => (
        <div key={i} className="flex gap-4 border p-3 rounded-lg">
          <Image src={p.image} width={80} height={80} alt={p.name} />
          <div>
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p>Cantidad: {p.quantity}</p>
            <p>Precio: ${p.price.toLocaleString()}</p>
          </div>
        </div>
      ))}

      <h2 className="text-xl font-bold">
        Total pagado: ${total.toLocaleString()}
      </h2>

      <Link href="/cart">
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg">
          Volver al carrito
        </button>
      </Link>
    </div>
  );
}
