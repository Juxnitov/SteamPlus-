import { pool } from '@/config/db'
import bcrypt from 'bcrypt';

export async function POST(request) {
    const { nombre, email, password } = await request.json();

    if (!nombre || !email || !password) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { nombre, email, password } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (nombre, email, password) VALUES ($1, $2, $3)',
            [nombre, email, hashedPassword]
        );
        return Response.json(result.rows[0], { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Database query failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}