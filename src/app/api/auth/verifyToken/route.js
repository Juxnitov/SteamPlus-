import pool from "@/lib/db";
import { verify } from "jsonwebtoken";

export async function POST(){
    try{
        try{
            const token = req.headers.get("Authorization").split(" ")[1];
            verifyToken(token);          
        }catch(error){
            console.log("Error:", error)
            return new Response('Error de autentificacion',{status:401});
        }
    }catch(error){
        console.log("Error:", error)
    }

}