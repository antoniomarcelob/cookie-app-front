import { NextRequest, NextResponse } from "next/server";

// const protected_routes = ['/', '/protected']
const protected_routes = ['/']

export async function middleware(request: NextRequest) {
    const authResponse = await fetch('http://localhost:3000/api/check-auth-status', {
        credentials: 'include'
    })
    
    const url = request.nextUrl.pathname

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
