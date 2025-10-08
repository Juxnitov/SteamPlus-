import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { verifyToken } from "./app/api/auth/login/route";

export async function middleware(request){
    const routesPublics = ['/api/auth/login', '/api/auth/register']
    
    token = request.headers.get('authorization')?.split(" ")[1]

    if(!token){
        return NextResponse.json({message: "No token provided"}, {status:401})
    }

    if(routesPublics.some(route => request.nextUrl.pathname.startsWith(route))){
        return NextResponse.next()
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
    matcher: ['/api/:path*']
}