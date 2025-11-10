    import { NextResponse } from "next/server";
    import { routesPublics } from './lib/routesPublics';
    import jwt from 'jsonwebtoken'
    import { verifyToken } from "./app/api/auth/login/route";



export async function middleware(request){

    if (routesPublics.some(route => request.nextUrl.pathname.startsWith(route))) {
        return NextResponse.next()
    }

    const token = request.headers.get('authorization')?.split(" ")[1]

    if (!token) {
        return NextResponse.json({ message: "Token no proporcionado" }, { status: 401 })
    }

    try{
        verifyToken(token)
        return NextResponse.next()
    }catch(error){
        console.log("Error: ",error)
        return NextResponse.json({message: "Invalid token"}, {status:401})
    }
}

export const config = {
    matcher: ['/api/:path*'],
    runtime: 'nodejs'
}
