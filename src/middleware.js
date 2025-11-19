    import { NextResponse } from "next/server";
    import { routesPublics } from './lib/routesPublics';
    import jwt from 'jsonwebtoken'
    import { verifyToken } from "./app/api/auth/login/route";



export async function middleware(request){

    if (routesPublics.some(route => request.nextUrl.pathname.startsWith(route))) {
        return NextResponse.next()
    }

    // Buscar el header Authorization (case-insensitive)
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
    const token = authHeader?.split(" ")[1]

    if (!token) {
        console.log("❌ Middleware: Token no proporcionado para", request.nextUrl.pathname);
        return NextResponse.json({ message: "Token no proporcionado" }, { status: 401 })
    }

    try{
        verifyToken(token)
        return NextResponse.next()
    }catch(error){
        console.log("❌ Middleware: Error verificando token:", error.message)
        return NextResponse.json({message: "Invalid token"}, {status:401})
    }
}

export const config = {
    matcher: ['/api/:path*'],
    runtime: 'nodejs'
}
