import pool from "@/lib/db";

export async function GET(req){
    const { searchParams } = new URL(req.url);
    const categoria = searchParams.get('categoria');

   try {
        let query = 'SELECT * FROM juegos ORDER BY registro DESC';
        let values = [];
        if (categoria) {
            query = 'SELECT * FROM juegos WHERE LOWER(categoria) = LOWER($1) ORDER BY registro DESC';
            values = [categoria];
       }
        const result = await pool.query(query, values);
        return Response.json({
            data: result.rows,
            message: "list of most recent games",
        }, {status: 200})
    }catch(error){
        console.log("Error:", error);
        return new Response('Error interno del servidor', { status: 500 })
    }
}