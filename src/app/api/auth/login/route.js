import pool from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const SECRET_KEY_ACCESS_TOKEN = 'MY-KEY-ACCESS-T'
const SECRET_KEY_REFRESH = 'MY-KEY-REFRESH-T'


export async function POST(req) {
    
    try{
        const { email, password } = await req.json();

        const verifyUser = await pool.query(
            "SELECT * FROM usuarios WHERE email = $1", [email]
        )

        if( verifyUser.rows.length  > 0){
            const users = verifyUser.rows[0];

            const isPasswordValidate = await bcrypt.compare(password, users.password)

            if(isPasswordValidate){
                const {accessToken, refreshToken} = generateToken(users);
                
                if (!accessToken || !refreshToken) {
                    console.error("❌ Error: No se generaron tokens");
                    return Response.json({message: "Error al generar tokens"}, { status: 500 });
                }

                return Response.json({
                    message: "Login exitoso",
                    accessToken,
                    refreshToken
                }, { status: 200 });
            }

            return Response.json({message: "Las credenciales son incorrectas"}, { status: 401 })

        }

        return Response.json({message: "El email no existe"}, { status: 404 })

    } catch (error) {
        console.log(error)
        return new Response('Error interno del servidor', { status: 500 })
    }
}


export function generateToken(user) {
    try {
        // Usar los campos correctos de la tabla usuarios: usuario_id y nombre
        const userId = user.usuario_id || user.id;
        const userName = user.nombre || user.name;
        const userEmail = user.email;

        if (!userId) {
            console.error('Error: usuario_id no encontrado en el objeto user', user);
            throw new Error('usuario_id no encontrado');
        }

        const accessToken = jwt.sign(
            // informacion del usuario - usando los campos correctos de la tabla usuarios
            {"id": userId, "name": userName, "email": userEmail},
            // llave secreta
            SECRET_KEY_ACCESS_TOKEN,
            // configuraciones
            {expiresIn: '30M'}
        )

        const refreshToken = jwt.sign(
            // informacion del usuario - usando los campos correctos de la tabla usuarios
            {"id": userId, "name": userName, "email": userEmail},
            // llave secreta
            SECRET_KEY_REFRESH,
            // configuraciones
            {expiresIn: '1h'}
        )

        return {accessToken, refreshToken};
    } catch (error) {
        console.log("Error al generar token:", error)
        throw error;
    }

}

export function verifyToken(token){
    return jwt.verify(token, SECRET_KEY_ACCESS_TOKEN);
}