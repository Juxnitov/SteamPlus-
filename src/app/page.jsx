import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Bienvenido a Steam+</h1>
      <h2>Tu plataforma de juegos mejorada</h2>
      <img 
        className="max-w-full h-auto" 
        src="../../../indieFestival.png" 
        alt="Banner Indie Festival" 
      />
    </div>
  );
}
