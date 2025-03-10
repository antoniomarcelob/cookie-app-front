import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const response = await fetch('http://localhost:4444/api/users/signin', {
        method: 'POST',
        body: JSON.stringify(body),
        credentials: 'include',
        headers: {
            'Content-Type': 'Application/json'
        }
    })
    
    const data = await response.json();

    const cookiesReceived = response.headers.getSetCookie();

    const separatedCookies = separateCookies(cookiesReceived)

    if(response.status === 200) {
        console.log("status: 200")
        
        const res = NextResponse.json({ message: data.message });

        if (separatedCookies.length > 0) {
            separatedCookies.forEach(cookie => {
                if (cookie.accessToken) {
                    res.cookies.set('accessToken', cookie.accessToken, { path: "/", secure: false, httpOnly: true, sameSite: "lax" });
                }
                if (cookie.refreshToken) {
                    res.cookies.set('refreshToken', cookie.refreshToken, { path: "/", secure: false, httpOnly: true, sameSite: "lax" });
                }
            });
        }

        return res
    }
    if(response.status === 400) {
        console.log("status: 400")
        return NextResponse.json({error: 'Invalid credentials'}, {status: 400})
    }
    
    console.log("status: 500")
    return NextResponse.json({error: 'Failed to login.(front-api-route)'}, {status: 500})
}


function separateCookies(cookies: string[]) {
    const result: { accessToken?: string; refreshToken?: string }[] = [];
  
    let accessToken: string | undefined;
    let refreshToken: string | undefined;
  
    cookies.forEach(cookie => {
      if (cookie.startsWith('accessToken=')) {
        accessToken = cookie.split('=')[1].split(';')[0];
      } else if (cookie.startsWith('refreshToken=')) {
        refreshToken = cookie.split('=')[1].split(';')[0];
      }
    });
  
    if (accessToken) {
      result.push({ accessToken });
    }
    if (refreshToken) {
      result.push({ refreshToken });
    }
  
    return result;
  }
