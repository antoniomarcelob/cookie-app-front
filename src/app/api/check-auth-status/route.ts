import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const accessCookies = (await cookies()).get('accessToken')
    const accessRequest = request.cookies.get('accessToken')
    
    if(accessCookies || accessRequest) {
        return NextResponse.json({ success: 'Autenticado. (front).' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Não autenticado. (front).' }, { status: 401 });
    
}


