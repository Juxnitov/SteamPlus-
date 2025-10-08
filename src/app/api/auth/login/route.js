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

                return Response.json({
                    accessToken,
                    refreshToken
                })  
            }

            return Response.json({message: "Las credenciales son incorrectas"})

        }

        return Response.json({message: "El email no existe"})

    } catch (error) {
        console.log(error)
        return new Response('Error interno del servidor', { status: 500 })
    }
}


export function generateToken(user) {
    try {
        const accessToken = jwt.sign(
            // informacion del usuario
            {"id": user.id, "name": user.name, "email": user.email},
            // llave secreta
            SECRET_KEY_ACCESS_TOKEN,
            // configuraciones
            {expiresIn: '30M'}
        )

            const refreshToken = jwt.sign(
            // informacion del usuario
            {"id": user.id, "name": user.name, "email": user.email},
            // llave secreta
            SECRET_KEY_REFRESH,
            // configuraciones
            {expiresIn: '1h'}
        )

        return {accessToken, refreshToken};
    } catch (error) {
        console.log(error)
    }

}

export function verifyToken(token){
    return jwt.verify(token, SECRET_KEY_ACCESS_TOKEN);
}