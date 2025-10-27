import pool from "@/lib/db";
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        // ✅ leer el body una sola vez
        const { nombre, email, password } = await request.json();

        if (!nombre || !email || !password) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // ✅ usar los datos que ya leíste
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *',
            [nombre, email, hashedPassword]
        );

        return Response.json(result.rows[0], { status: 201 });

    } catch (error) {
        console.log("error:",error)
        return new Response(JSON.stringify({ error: 'Database query failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}