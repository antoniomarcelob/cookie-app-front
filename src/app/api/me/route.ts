import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Obtém o token do cabeçalho Authorization
  // const authToken = request.headers.get('Authorization');
  const authToken = localStorage.getItem('Authorization')
  
  if (!authToken) {
    return NextResponse.json({ error: 'No access token provided.' }, { status: 401 });
  }

  const response = await fetch('http://localhost:4444/api/profile/me', {
    method: 'GET',
    credentials: "include",
  });
 
  if (response.status === 200) {
    return NextResponse.json({ message: 'User found!' }, { status: 200 });
  }
  
  return NextResponse.json({ error: 'Failed to get user logged in.' }, { status: 500 });
}
