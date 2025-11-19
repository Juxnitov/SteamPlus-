import pool from "@/lib/db";

export async function GET(req, ctx) {
  try {
    const { juego_id } = await ctx.params;
    console.log("ID recibido:", juego_id);

    if (!juego_id || isNaN(juego_id)) {
      return new Response(
        JSON.stringify({ error: "ID de juego inválido" }),
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
        SELECT 
          j.juego_id,
          j.titulo,
          j.descripcion,
          j.precio,
          j.categoria,
          COALESCE(j.imagen, '/logo.png') AS imagen,
          j.registro,
          COALESCE(
            json_agg(
              json_build_object(
                'dlc_id', d.dlc_id,
                'juego_id', d.juego_id,
                'nombre', d.nombre,
                'total', d.total,
                'fecha', d.fecha,
                'imagen', d.imagen
              )
            ) FILTER (WHERE d.dlc_id IS NOT NULL),
            '[]'
          ) AS dlcs
        FROM juegos j
        LEFT JOIN dlc d ON d.juego_id = j.juego_id
        WHERE j.juego_id = $1
        GROUP BY j.juego_id, j.titulo, j.descripcion, j.precio, j.categoria, j.imagen, j.registro;
      `,
      [juego_id]
    );

    if (result.rows.length === 0) {
      return new Response(
        JSON.stringify({ message: "Juego no encontrado" }),
        { status: 404 }
      );
    }

    return Response.json({
      data: result.rows[0],
      message: "Información del juego y sus DLC obtenida correctamente",
    });
  } catch (error) {
    console.error("Error en /api/games/[juego_id]:", error);
    return new Response("Error interno del servidor", { status: 500 });
  }
}
