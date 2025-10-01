import pool from "@/lib/db";

export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        return Response.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        return new Response('error al obtener usuarios', { status: 500 });
    }
}