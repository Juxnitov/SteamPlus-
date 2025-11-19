"use client";
import Img from "@/components/ui/img";
import { useCart } from "@/store/CartContext";
import { useState } from "react";
import { apiFetch } from "@/lib/apiClient";
import { getAccesToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { generateInvoicePDF } from "@/utils/generateInvoice";

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [clientName, setClientName] = useState("");
  const router = useRouter();

  const isAuthenticated = typeof window !== "undefined" && getAccesToken() !== null;

  const comprarTodo = async () => {
    // Verificar si el usuario está autenticado
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para realizar una compra. Redirigiendo al login...");
      router.push('/login');
      return;
    }

    // Verificar que haya items en el carrito
    if (items.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    // Verificar que se haya ingresado un nombre
    if (!clientName.trim()) {
      alert("Por favor, ingresa tu nombre para generar la factura");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Preparar los pedidos para enviar a la API
      const pedidos = [];
      
      for (const item of items) {
        if (item.juego_id) {
          pedidos.push({
            juego_id: item.juego_id,
            total: parseFloat(item.precio) * parseInt(item.cantidad)
          });
        } else {
          console.warn(`Item ${item.nombre} no tiene juego_id, se omitirá del pedido`);
        }
      }

      if (pedidos.length === 0) {
        throw new Error("No se pudieron procesar los pedidos. Asegúrate de que los juegos tengan IDs válidos.");
      }

      const response = await apiFetch('/api/games/ventas/registers', {
        method: 'POST',
        body: JSON.stringify({ pedidos })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al procesar la compra');
      }

      const data = await response.json();
      
      // Generar número de factura único
      const invoiceNumber = `FAC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      // Generar PDF de la factura
      generateInvoicePDF(items, total, clientName.trim(), invoiceNumber);
      
      setSuccess(true);
      alert(`¡Compra realizada exitosamente! ${data.message}\nTotal: $${total.toFixed(2)}\nLa factura se está descargando...`);
      clearCart();
      setClientName("");
      
      // Redirigir al inicio después de 2 segundos
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      console.error("Error al comprar:", err);
      setError(err.message);
      alert(`Error al procesar la compra: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 p-6">
      <h1 className="text-3xl font-bold text-purple-900 mb-6">Tu carrito</h1>

      {!isAuthenticated && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4">
          <p className="font-semibold">Debes iniciar sesión para realizar una compra.</p>
          <Link href="/login" className="text-yellow-600 hover:underline font-bold">
            Iniciar sesión
          </Link>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-4">
          <p className="font-semibold">¡Compra realizada exitosamente! Redirigiendo...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-purple-800 text-lg mb-4">No hay productos en el carrito.</p>
          <Link href="/" className="text-purple-600 hover:underline font-semibold">
            Ver catálogo de juegos
          </Link>
        </div>
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

      {/* Input para nombre del cliente */}
      {items.length > 0 && isAuthenticated && (
        <div className="mt-6 bg-purple-100 rounded-lg shadow-md p-4">
          <label className="block text-purple-900 font-semibold mb-2">
            Nombre del cliente (para la factura):
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Ingresa tu nombre completo"
            className="w-full p-2 rounded-lg border border-purple-300 bg-purple-50 text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      )}

      <div className="mt-8 bg-purple-100 rounded-lg shadow-lg p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-purple-800 font-semibold">Total</span>
            <span className="ml-3 font-bold text-purple-900 text-2xl">${total.toFixed(2)}</span>
          </div>
          <button
            className={`px-5 py-2 rounded text-white font-semibold transition ${
              loading || !isAuthenticated || !clientName.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
            onClick={comprarTodo}
            disabled={loading || !isAuthenticated || !clientName.trim()}
          >
            {loading ? 'Procesando...' : 'Comprar y generar factura'}
          </button>
        </div>
        {!clientName.trim() && isAuthenticated && items.length > 0 && (
          <p className="text-sm text-purple-700 mt-2">
            * Ingresa tu nombre para generar la factura
          </p>
        )}
      </div>
    </div>
  );
}