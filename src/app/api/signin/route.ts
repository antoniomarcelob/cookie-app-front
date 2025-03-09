import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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

    const cookiesReceived = (await cookies()).getAll()

    console.log("cookiesReceived: ", cookiesReceived)

    if(response.status === 200) {
        console.log("status: 200")
        return NextResponse.json({status: 200})
    }
    if(response.status === 400) {
        console.log("status: 400")
        return NextResponse.json({error: 'Invalid credentials'}, {status: 400})
    }
    
    console.log("status: 500")
    return NextResponse.json({error: 'Failed to login.(front-api-route)'}, {status: 500})
}