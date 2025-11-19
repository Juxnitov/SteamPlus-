import pool from "@/lib/db";
import { verifyToken } from "../../../auth/login/route";

export async function POST(req) {
    try {
        // Verificar token y obtener usuario_id
        let usuario_id;
        try {
            const authHeader = req.headers.get("Authorization");
            console.log("Authorization header:", authHeader ? "Presente" : "Ausente");
            
            if (!authHeader) {
                console.error("❌ No se recibió header Authorization");
                return new Response(
                    JSON.stringify({ error: 'Token no proporcionado' }),
                    { status: 401, headers: { 'Content-Type': 'application/json' } }
                );
            }
            
            const token = authHeader.split(" ")[1];
            if (!token) {
                console.error("❌ No se pudo extraer el token del header");
                return new Response(
                    JSON.stringify({ error: 'Token inválido en el header' }),
                    { status: 401, headers: { 'Content-Type': 'application/json' } }
                );
            }
            
            console.log("Token recibido, verificando...");
            const decoded = verifyToken(token);
            console.log("Token decodificado:", decoded);
            
            usuario_id = decoded.id; // El id del token es el usuario_id
            
            if (!usuario_id) {
                console.error("❌ usuario_id es null o undefined en el token decodificado");
                return new Response(
                    JSON.stringify({ error: 'Token inválido: usuario_id no encontrado' }),
                    { status: 401, headers: { 'Content-Type': 'application/json' } }
                );
            }
            
            console.log("✅ usuario_id obtenido:", usuario_id);
        } catch (error) {
            console.error("❌ Error de autenticación:", error);
            return new Response(
                JSON.stringify({ error: 'Error de autenticación: ' + error.message }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Obtener los pedidos del body (array de juegos)
        const { pedidos } = await req.json();
        
        if (!pedidos || !Array.isArray(pedidos) || pedidos.length === 0) {
            return new Response(
                JSON.stringify({ error: 'No se proporcionaron pedidos válidos' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Registrar cada pedido en la base de datos
        const resultados = [];
        for (const pedido of pedidos) {
            const { juego_id, total } = pedido;
            
            if (!juego_id || !total) {
                continue; // Saltar pedidos inválidos
            }

            const result = await pool.query(
                'INSERT INTO pedidos (juego_id, usuario_id, total) VALUES ($1, $2, $3) RETURNING *',
                [juego_id, usuario_id, total]
            );
            
            resultados.push(result.rows[0]);
        }

        if (resultados.length === 0) {
            return new Response(
                JSON.stringify({ error: 'No se pudieron registrar los pedidos' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return Response.json(
            { 
                message: `${resultados.length} pedido(s) registrado(s) correctamente`,
                pedidos: resultados
            },
            { status: 201 }
        );
    } catch (error) {
        console.log("Error:", error);
        return new Response(
            JSON.stringify({ error: 'Error interno del servidor' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}