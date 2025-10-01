import Image from "next/image";
import Img from "../components/ui/img";

export default function Home() {
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
    </div>
  );
}
