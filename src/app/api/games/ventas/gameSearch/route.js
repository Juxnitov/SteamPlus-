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
            const {juego_id} = await req.json();
            const result = await pool.query('SELECT * FROM juegos WHERE juego_id = $1;', [juego_id]);
            return Response.json({
                data: result.rows,
                message: "Venta de juego",
            }, {status: 200})
        }catch(error){
            console.log("Error:", error)
        }
}