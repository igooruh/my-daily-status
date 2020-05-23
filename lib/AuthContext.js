import React, { createContext, useEffect, useState } from 'react'
import fetch from 'isomorphic-fetch'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [isAuthReady, setAuthReady] = useState(false)

    useEffect(() => {
        const getMe = async () => {
            const response = await fetch('/api/me')
            const authUser = await response.json()
            setUser(authUser)
            setAuthReady(true)
        }

        getMe()
    }, [])

    return (
        <AuthContext.Provider value={{ user, isAuthReady, isAuth: !user.error  }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
  }