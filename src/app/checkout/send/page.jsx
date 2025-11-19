"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SendBankDataPage() {
  const { cart, setReceipt, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    setReceipt(cart); // Guardamos el recibo
    clearCart();      // Limpiamos carrito
    router.push("/receipt");
  }, []);

  return <p>Procesando compra...</p>;
}
