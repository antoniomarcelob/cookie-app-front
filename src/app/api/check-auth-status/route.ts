// 'use server'

// import { NextRequest, NextResponse } from "next/server";
// import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next/server';

// export async function GET(request: NextRequest) {
//     const accessToken = await getCookie('accessToken')
//     const refreshToken = request.cookies.get('accessToken')

//     console.log("accessToken: ", accessToken)
    
//     if(accessToken) {
//         return NextResponse.json({ success: 'Autenticado. (front).' }, { status: 200 });
//     }

//     return NextResponse.json({ error: 'Não autenticado. (front).' }, { status: 401 });
    
// }

import { getCookie, getCookies } from 'cookies-next/server';
import { NextRequest, NextResponse } from 'next/server';
import { cookies as cook } from 'next/headers';


export async function GET(request: NextRequest, response: NextResponse) {
    const cookies = request.cookies;
    const accessToken = cookies.get('accessToken');

    const value = await getCookies({ req: request, res: response });

    // await getCookie('test');
    // const value = await getCookie('accessToken', { cookies: cook });


    console.log("value: ", value)
    
    if (accessToken) {
        // Aqui você pode verificar o token (por exemplo, usando JWT ou outro método)
        try {
            // Decodifique e valide o accessToken, se for válido
            return NextResponse.json({ message: 'Authenticated' }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }
    }

    return NextResponse.json({ error: 'No access token found' }, { status: 401 });
}
