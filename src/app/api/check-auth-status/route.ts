import { getCookie } from 'cookies-next/server';
import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from "jwt-decode";

export async function GET(request: NextRequest, response: NextResponse) {
    const accessToken = await getCookie('accessToken', { req: request, res: response });

    if (accessToken) {
        // Aqui você pode verificar o token (por exemplo, usando JWT ou outro método)
        try {
            // Decodifique e valide o accessToken, se for válido
            const decodedAccessToken: {username: string, sub: string} = jwtDecode(accessToken, { header: false });
            console.log("decodedAccessToken: ", {username: decodedAccessToken.username, userId: decodedAccessToken.sub})

            return NextResponse.json({ username: decodedAccessToken.username, userId: decodedAccessToken.sub }, { status: 200 });
        } catch (err) {
            return NextResponse.json({ error: 'Invalid token', err }, { status: 401 });
        }
    }

    return NextResponse.json({ error: 'No access token found' }, { status: 401 });
}
