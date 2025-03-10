'use client'

import {
    getCookie,
    getCookies,
    setCookie,
    deleteCookie,
    hasCookie,
    useGetCookies,
    useSetCookie,
    useHasCookie,
    useDeleteCookie,
    useGetCookie,
  } from 'cookies-next/client';
import { useEffect } from 'react';

export default function Login() {

    const cookies = getCookie('accessToken')

    useEffect(() => {
        console.log("cookies: ", cookies)
    }, [cookies])

    return (
        <div className="h-screen flex justify-center items-center">
            <h1>Página protegida.</h1>
        </div>
    )
}
