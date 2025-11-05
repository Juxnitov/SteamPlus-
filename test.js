import Image from "next/image";
import Img from "../components/ui/img";
import { useChargeCatalog } from "@/hooks/useChargeCatalog";

export default function Home() {
  async function handleChargeCatalog(e){
    try{
      e.preventDefault();
      const result = await chargeCatalog();
      console.log(result)
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Bienvenido a Steam+</h1>
      <h2>Tu plataforma de juegos mejorada</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <a href="../../../festivals/indieFestival">
          <Img
            className={"max-w-full h-auto"}
            src={"../../../indieFestival.png"}
            alt={"Banner Indie Festival"}
          />
        </a>
      </div>
      <div className="p-4">
        <h3 className="text-2xl font-bold">Catálogo de Juegos</h3>
        {loading && <p>Cargando catálogo...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {/* Asumiendo que 'data' es un array de juegos y cada juego tiene 'name' y 'image' */}
            {data.map((juego) => (
              <div key={juego.id} className="border rounded-lg p-2">
                <Img src={juego.image} alt={juego.name} className="w-full h-auto" />
                <p className="font-bold mt-2">{juego.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
