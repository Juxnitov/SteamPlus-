import pool from "@/lib/db";

export async function POST(req) {
    try{
        const {categoria} = await req.json();
        const result = await pool.query('SELECT * FROM juegos WHERE categoria = $1;', [categoria]);
        return Response.json({
            data: result.rows,
            message: "list of products",
        }, {status: 200})
    }catch(error){
        console.log("Error:", error);
        return new Response('Error interno del servidor', { status: 500 })
    }
}