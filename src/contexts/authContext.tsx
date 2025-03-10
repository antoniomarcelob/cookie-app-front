import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

interface User {
    username: string
    userId: string
}

interface UserContextType {
    user: User | undefined,
    setUser: Dispatch<SetStateAction<User | undefined>>
}

const AuthContext = createContext<UserContextType>({} as UserContextType)

export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | undefined>(undefined)

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch('http://localhost:3000/api/check-auth-status')
            const data: User = await response.json()
            setUser(data)
        }
        getUser()
    }, [])

    useEffect(() => {
        console.log("USER: ", user)
    }, [user])
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}