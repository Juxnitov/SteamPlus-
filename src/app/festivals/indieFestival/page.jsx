"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Btn from "@/components/festivals/Btn";
import Img from "../../../components/ui/img";
import Link from "next/link";
import { apiFetch } from "@/lib/apiClient";
import { useCart } from "@/store/CartContext";
import { useAuth } from "@/hooks/useAuth";

const TABS = [
  { id: "popular", label: "Populares" },
  { id: "latest", label: "Últimos lanzamientos" },
  { id: "soon", label: "Coming soon" },
];

export default function IndieFestivalPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("popular");
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchIndieGames() {
      try {
        setLoading(true);
        setError(null);
        const res = await apiFetch("/api/games/indieFestival", {
          method: "POST",
          body: JSON.stringify({ categoria: "Indie" }),
        });

        if (!res.ok) {
          throw new Error("No se pudieron cargar los juegos indie");
        }

        const data = await res.json();
        setGames(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchIndieGames();
  }, []);

  const populares = useMemo(() => {
    return [...games]
      .sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio))
      .slice(0, 8);
  }, [games]);

  const ultimos = useMemo(() => {
    return [...games]
      .sort(
        (a, b) =>
          new Date(b.registro).getTime() - new Date(a.registro).getTime()
      )
      .slice(0, 8);
  }, [games]);

  const comingSoon = useMemo(() => {
    const premium = games.filter((g) => parseFloat(g.precio) >= 40);
    const source = premium.length ? premium : games;
    return [...source]
      .sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio))
      .slice(0, 8);
  }, [games]);

  const visibleGames = useMemo(() => {
    switch (activeTab) {
      case "latest":
        return ultimos;
      case "soon":
        return comingSoon;
      default:
        return populares;
    }
  }, [activeTab, populares, ultimos, comingSoon]);

  const handleAddToCart = (game) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    addItem({
      nombre: game.titulo,
      precio: parseFloat(game.precio),
      cantidad: 1,
      imagen: game.imagen || "/logo.png",
      descripcion: game.descripcion || "Sin descripción disponible",
      juego_id: game.juego_id,
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 items-center">
          <Link
            href="/"
            className="text-yellow-800 font-semibold hover:text-yellow-900 transition"
          >
            ← Volver a la tienda
          </Link>
          <Img
            className="max-w-full h-auto rounded-lg shadow-xl"
            src={"../../../indieFestivalBanner.png"}
            alt={"Banner Indie Festival"}
          />
        </div>

        <div className="bg-yellow-100 rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap gap-2 border border-yellow-700 rounded-full px-6 py-3 bg-yellow-200 shadow-inner">
              {TABS.map((tab) => (
                <Btn
                  key={tab.id}
                  mensaje={tab.label}
                  className={`px-4 py-2 rounded-full transition ${
                    activeTab === tab.id
                      ? "bg-yellow-600 text-white"
                      : "bg-transparent text-yellow-800 hover:bg-yellow-300"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center text-yellow-800 py-10">
              Cargando catálogo indie...
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-10">{error}</div>
          ) : visibleGames.length === 0 ? (
            <div className="text-center text-yellow-800 py-10">
              No hay juegos disponibles en esta categoría.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {visibleGames.map((game) => (
                <div
                  key={game.juego_id}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3"
                >
                  <Link href={`/games/${game.juego_id}`}>
                    <div className="h-40 rounded-lg overflow-hidden mb-2">
                      <Img
                        src={game.imagen || "/logo.png"}
                        alt={game.titulo}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </Link>
                  <div>
                    <h3 className="font-bold text-lg text-yellow-900 line-clamp-1">
                      {game.titulo}
                    </h3>
                    <p className="text-sm text-yellow-800 line-clamp-2">
                      {game.descripcion || "Sin descripción disponible"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-yellow-700 bg-yellow-200 px-2 py-1 rounded">
                      {game.categoria}
                    </span>
                    <span className="font-bold text-green-700">
                      ${parseFloat(game.precio).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={`/games/${game.juego_id}`}
                      className="flex-1 text-center px-3 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition"
                    >
                      Ver detalles
                    </Link>
                    <button
                      className="px-3 py-2 rounded-lg font-semibold transition text-sm
                      bg-purple-500 hover:bg-purple-600 text-white disabled:bg-gray-300 disabled:text-gray-500"
                      onClick={() => handleAddToCart(game)}
                      disabled={!isAuthenticated}
                    >
                      {isAuthenticated ? "+ Carrito" : "Login"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

