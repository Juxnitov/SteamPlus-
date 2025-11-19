import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        juego_id,
        titulo,
        descripcion,
        precio,
        categoria,
        COALESCE(imagen, '/logo.png') AS imagen,
        registro
      FROM juegos
      ORDER BY registro DESC
      LIMIT 100;
    `);

    return Response.json(
      {
        data: result.rows,
        message: "list of most recent games",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error:", error);
    return new Response("Error interno del servidor", { status: 500 });
  }
}