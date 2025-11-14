"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Carrito de compras</h1>

      <div className="space-y-4">
        {cart.length === 0 && <p>No hay productos en el carrito.</p>}

        {cart.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border p-3 rounded-lg"
          >
            <Image
              src={p.image}
              width={90}
              height={90}
              className="rounded-md object-cover"
              alt={p.name}
            />

            <div className="flex flex-col flex-1">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-gray-600">{p.description}</p>
              <p className="font-bold">${p.price.toLocaleString()}</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="text-xl font-bold">{p.quantity}</div>

              {/* Botón remover */}
              <button
                onClick={() => removeFromCart(p.name)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-xl border-t">
          <div className="max-w-3xl mx-auto flex justify-between items-center">
            <span className="text-xl font-bold">
              Total: ${total.toLocaleString()}
            </span>

            <button
              onClick={() => router.push("/checkout")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700"
            >
              Comprar todo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
