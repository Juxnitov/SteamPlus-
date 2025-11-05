"use client";
import Img from "../components/ui/img";
import { useChargeCatalog } from "@/hooks/useChargeCatalog";
import { useEffect } from "react";

export default function Home() {
  const { chargeCatalog, loading, error, data } = useChargeCatalog();

  useEffect(() => {
    chargeCatalog();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-2 text-center">Steam+</h1>
      <h2 className="text-lg text-gray-600 mb-8 text-center">
        Tu plataforma de juegos mejorada
      </h2>

      {/* Banner principal */}
      <div className="flex justify-center mb-8">
        <a href="../../../festivals/indieFestival">
          <Img
            className="max-w-full h-auto rounded-lg shadow-lg hover:opacity-90 transition"
            src={"../../../indieFestival.png"}
            alt={"Banner Indie Festival"}
          />
        </a>
      </div>

      {/* Catálogo */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Catálogo de Juegos</h3>

        {loading && <p>Cargando catálogo...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((juego) => (
              <div
                key={juego.juego_id}
                className="border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-xl transition"
              >
                <h4 className="font-bold text-lg mb-1 text-blue-600">
                  {juego.titulo}
                </h4>
                <p className="text-gray-700 text-sm mb-2">
                  {juego.descripcion}
                </p>
                <div className="flex justify-between text-sm mt-2">
                  <span className="font-semibold text-gray-600">
                    {juego.categoria}
                  </span>
                  <span className="font-bold text-green-600">
                    ${parseFloat(juego.precio).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
