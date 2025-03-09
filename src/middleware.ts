import { NextRequest, NextResponse } from "next/server";

const protected_routes = ['/', '/protected']

export async function middleware(request: NextRequest) {
    const authResponse = await fetch('http://localhost:3001/api/check-auth-status', {
        credentials: 'include'
    })
    
    const url = request.nextUrl.pathname

    console.log(url)
    if(protected_routes.includes(url) && authResponse.status === 401) {
        const path = request.nextUrl.clone()
        path.pathname = '/signin'
        
        return NextResponse.redirect(path)
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/sign-in", "/home", "/protected"],
};
