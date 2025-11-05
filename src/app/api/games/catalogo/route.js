import pool from "@/lib/db";

export async function GET(req){
    try{
        const result = await pool.query('SELECT * FROM juegos ORDER BY registro DESC LIMIT 10;');
        return Response.json({
            data: result.rows,
            message: "list of most recent games",
        }, {status: 200})
    }catch(error){
        console.log("Error:", error);
        return new Response('Error interno del servidor', { status: 500 })
    }
}