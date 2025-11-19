"use client";
import Img from "../components/ui/img";
import { useChargeCatalog } from "@/hooks/useChargeCatalog";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/store/CartContext";
import Link from "next/link";

export default function Home() {
  const { chargeCatalog, loading, error, data } = useChargeCatalog();
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Categorías disponibles
  const availableCategories = ["Acción", "RPG", "Indie", "Estrategia", "Deportes", "Aventura"];

  useEffect(() => {
    chargeCatalog();
  }, []);

  // Obtener categorías únicas de los juegos (solo las que están en la lista permitida)
  const categories = useMemo(() => {
    if (!data) return [];
    const uniqueCategories = [...new Set(data.map(juego => juego.categoria).filter(Boolean))];
    // Filtrar solo las categorías permitidas
    return uniqueCategories.filter(cat => availableCategories.includes(cat)).sort();
  }, [data]);

  // Filtrar juegos basado en búsqueda y categoría
  const filteredGames = useMemo(() => {
    if (!data) return [];
    
    return data.filter(juego => {
      // Filtro por nombre (búsqueda)
      const matchesSearch = searchTerm === "" || 
        juego.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (juego.descripcion && juego.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filtro por categoría
      const matchesCategory = selectedCategory === "" || juego.categoria === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [data, searchTerm, selectedCategory]);

  const handleAddToCart = (juego) => {
    addItem({
      nombre: juego.titulo,
      precio: parseFloat(juego.precio),
      cantidad: 1,
      imagen: "/logo.png",
      descripcion: juego.descripcion || "Sin descripción",
      juego_id: juego.juego_id
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center text-purple-900">Steam+</h1>
        <h2 className="text-lg text-purple-800 mb-8 text-center font-semibold">
          Tu plataforma de juegos mejorada
        </h2>

        {/* Banner principal */}
        <div className="flex justify-center mb-8">
          <Link href="/festivals/indieFestival">
            <Img
              className="max-w-full h-auto rounded-lg shadow-lg hover:opacity-90 transition cursor-pointer"
              src={"../../../indieFestival.png"}
              alt={"Banner Indie Festival"}
            />
          </Link>
        </div>

        {/* Catálogo */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h3 className="text-2xl font-bold text-purple-900">Catálogo de Juegos</h3>
            
            {/* Filtros y búsqueda */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Búsqueda por nombre */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 rounded-lg border border-purple-300 bg-purple-50 text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              {/* Filtro por categoría */}
              <div className="flex-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 rounded-lg border border-purple-300 bg-purple-50 text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Todas las categorías</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Botón limpiar filtros */}
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition font-semibold whitespace-nowrap"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>

          {/* Mostrar resultados de búsqueda */}
          {(searchTerm || selectedCategory) && filteredGames.length > 0 && (
            <div className="mb-4 text-purple-800">
              <p className="font-semibold">
                Mostrando {filteredGames.length} de {data?.length || 0} juego(s)
                {searchTerm && ` para "${searchTerm}"`}
                {selectedCategory && ` en categoría "${selectedCategory}"`}
              </p>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center min-h-[200px]">
              <p className="text-purple-800 text-lg">Cargando catálogo...</p>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {filteredGames && filteredGames.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((juego) => (
                <div
                  key={juego.juego_id}
                  className="bg-purple-100 rounded-lg shadow-md p-4 hover:shadow-xl transition border border-purple-200"
                >
                  <Link href={`/games/${juego.juego_id}`}>
                    <div className="mb-3 cursor-pointer">
                      <div className="w-full h-48 bg-purple-200 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                        <Img
                          src={"/logo.png"}
                          alt={juego.titulo}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h4 className="font-bold text-lg mb-2 text-purple-900 hover:text-purple-700 transition">
                        {juego.titulo}
                      </h4>
                      <p className="text-purple-800 text-sm mb-3 line-clamp-2">
                        {juego.descripcion || "Sin descripción disponible"}
                      </p>
                    </div>
                  </Link>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-purple-700 text-sm bg-purple-200 px-2 py-1 rounded">
                      {juego.categoria}
                    </span>
                    <span className="font-bold text-green-600 text-lg">
                      ${parseFloat(juego.precio).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      href={`/games/${juego.juego_id}`}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-center px-4 py-2 rounded transition text-sm font-semibold"
                    >
                      Ver detalles
                    </Link>
                    <button
                      onClick={() => handleAddToCart(juego)}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition text-sm font-semibold"
                    >
                      + Carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && data && data.length === 0 && (
            <div className="text-center py-12">
              <p className="text-purple-800 text-lg">No hay juegos disponibles en este momento.</p>
            </div>
          )}

          {!loading && data && data.length > 0 && filteredGames.length === 0 && (
            <div className="text-center py-12">
              <p className="text-purple-800 text-lg mb-4">
                No se encontraron juegos con los filtros seleccionados.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition font-semibold"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
