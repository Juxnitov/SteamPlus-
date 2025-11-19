"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("cart_items") : null;
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart_items", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (item) => {
    const nombre = String(item?.nombre ?? "").trim();
    const precio = Number(item?.precio ?? 0);
    const cantidad = Math.max(1, parseInt(item?.cantidad ?? 1, 10));
    const imagen = String(item?.imagen ?? "");
    const descripcion = String(item?.descripcion ?? "");
    const juego_id = item?.juego_id ? Number(item.juego_id) : null;
    const dlc_id = item?.dlc_id ? Number(item.dlc_id) : null;
    if (!nombre) return;
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.nombre === nombre);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], cantidad: next[idx].cantidad + cantidad };
        return next;
      }
      return [...prev, { nombre, precio, cantidad, imagen, descripcion, juego_id, dlc_id }];
    });
  };

  const updateQty = (nombre, cantidad) => {
    const qty = Math.max(1, parseInt(cantidad ?? 1, 10));
    setItems((prev) => prev.map((p) => (p.nombre === nombre ? { ...p, cantidad: qty } : p)));
  };

  const removeItem = (nombre) => {
    setItems((prev) => prev.filter((p) => p.nombre !== nombre));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = useMemo(() => items.reduce((acc, p) => acc + p.precio * p.cantidad, 0), [items]);

  const value = useMemo(
    () => ({ items, addItem, updateQty, removeItem, clearCart, total }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}