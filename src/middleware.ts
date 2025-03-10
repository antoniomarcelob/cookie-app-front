import { getCookie } from "cookies-next/server";
import { NextRequest, NextResponse } from "next/server";

const protected_routes = ['/', '/protected']

export async function middleware(request: NextRequest, response: NextResponse) {
    const url = request.nextUrl.pathname
    const accessToken = await getCookie('accessToken', { res: response , req: request });

    if(['/', '/signin'].includes(url) && accessToken) {
        const path = request.nextUrl.clone()
        path.pathname = '/protected'
        
        return NextResponse.redirect(path)
    }


    if(protected_routes.includes(url) && !accessToken) {
        const path = request.nextUrl.clone()
        path.pathname = '/signin'
        
        return NextResponse.redirect(path)
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/signin", "/home", "/protected"],
};
