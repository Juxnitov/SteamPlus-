"use client";
import Img from "@/components/ui/img";
import { useCart } from "@/store/CartContext";

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, total } = useCart();

  const comprarTodo = () => {
    alert(`Compra realizada por $${total.toFixed(2)} con ${items.length} productos`);
    clearCart();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 p-6">
      <h1 className="text-3xl font-bold text-purple-900 mb-6">Tu carrito</h1>

      {items.length === 0 ? (
        <p className="text-purple-800">No hay productos en el carrito.</p>
      ) : (
        <div className="space-y-4">
          {items.map((p) => (
            <div
              key={p.nombre}
              className="bg-purple-100 rounded-lg shadow-md p-4 flex items-center gap-4"
            >
              <div className="w-24 h-24 flex items-center justify-center bg-purple-200 rounded overflow-hidden">
                <Img src={p.imagen} alt={p.nombre} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-purple-900">{p.nombre}</h4>
                <p className="text-sm text-purple-800">{p.descripcion}</p>
                <div className="mt-2 text-sm">
                  <span className="font-bold text-purple-700">${Number(p.precio).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-purple-700">Cantidad</span>
                <input
                  type="number"
                  min={1}
                  value={p.cantidad}
                  onChange={(e) => updateQty(p.nombre, e.target.value)}
                  className="w-16 p-1 rounded bg-purple-50 text-purple-900 border border-purple-300"
                />
                <button
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                  onClick={() => removeItem(p.nombre)}
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-purple-100 rounded-lg shadow-lg p-4 flex items-center justify-between">
        <div>
          <span className="text-purple-800">Total</span>
          <span className="ml-3 font-bold text-purple-900">${total.toFixed(2)}</span>
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded"
          onClick={comprarTodo}
        >
          Comprar todo
        </button>
      </div>
    </div>
  );
}