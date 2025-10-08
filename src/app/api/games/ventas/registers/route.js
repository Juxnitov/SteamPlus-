import pool from "@/lib/db";
import { verifyToken } from "../../../auth/login/route";

export async function POST(req) {
        try{
            try{
                const token = req.headers.get("Authorization").split(" ")[1];
                verifyToken(token);          
            }catch(error){
                console.log("Error:", error)
                return new Response('Error de autentificacion',{status:401});
            }
            const {juego_id, usuario_id, total} = await req.json();
            const result = await pool.query('INSERT INTO pedidos (juego_id, usuario_id, total) VALUES ($1, $2, $3);', [juego_id, usuario_id, total]);
            
            return Response.json({ message: "Pedido registrado correctamente" }, { status: 201 });
        }catch(error){
            console.log("Error:", error)
        }
}