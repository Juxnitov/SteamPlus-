import pool from "@/app/lib/db";

export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM users');
        return new Response(JSON.stringify(result.rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Database query failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
        }
    }