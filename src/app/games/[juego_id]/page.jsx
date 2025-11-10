'use client';
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/apiClient";
import Img from "@/components/ui/img";
import { useEffect, useState } from "react";

export default function DetailGame() {
  const { juego_id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGame() {
      try {
        const res = await apiFetch(`/api/games/${juego_id}`);

        const data = await res.json();
        setGame(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (juego_id) fetchGame();
  }, [juego_id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400">
      <p className="text-xl">Cargando información del juego...</p>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400">
      <p className="text-xl text-red-600 bg-purple-100 p-4 rounded-lg">Error: {error}</p>
    </div>
  );
  if (!game) return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400">
      <p className="text-xl text-purple-900">No se encontró el juego.</p>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-purple-100 rounded-lg shadow-lg m-auto">
        {/* Columna Izquierda: Imagen */}
        <div className="flex items-center justify-center p-8 lg:w-1/3 bg-purple-200 rounded-l-lg">
          <Img
            src={"/hola.jpg"}
            alt={`Portada de ${game.nombre}`}
            className={"rounded-lg shadow-md object-cover w-full h-full"}
          />
        </div>

        {/* Columna Derecha: Detalles */}
        <div className="flex flex-col justify-center lg:w-2/3 p-8">
          <h1 className="text-4xl font-bold mb-4 text-purple-900">{game.titulo}</h1>
          <div className="space-y-2 mb-6">
            <p className="text-lg text-purple-800"><strong className="font-semibold text-purple-700">Precio:</strong> ${parseFloat(game.precio).toFixed(2)}</p>
            <p className="text-lg text-purple-800"><strong className="font-semibold text-purple-700">Descripción:</strong> {game.descripcion}</p>
            <p className="text-lg text-purple-800"><strong className="font-semibold text-purple-700">Categoría:</strong> {game.categoria}</p>
            <p className="text-lg text-purple-800"><strong className="font-semibold text-purple-700">Fecha de registro:</strong> {new Date(game.registro).toLocaleString()}</p>
          </div>

          <div className="border-t border-purple-300 pt-4">
            <h2 className="text-2xl font-semibold mb-3 text-purple-800">DLCs</h2>
            {game.dlcs && game.dlcs.length > 0 ? (
              <ul className="space-y-3">
                {game.dlcs.map((dlc) => (
                  <li key={dlc.dlc_id} className="bg-purple-200 p-3 rounded-md flex justify-between items-center">
                    <span className="font-medium text-purple-900">{dlc.nombre}</span>
                    <span className="font-bold text-purple-700">${dlc.precio}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-purple-700">Este juego no tiene DLCs disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
