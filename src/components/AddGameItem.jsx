"use client";
import { useCart } from "@/context/CartContext";

export default function AddGameItem({ name, price, quantity, image, description }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      name,
      price,
      quantity,
      image,
      description,
    });
  };

  return (
    <button
      onClick={handleAdd}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Añadir {name} al carrito
    </button>
  );
}
