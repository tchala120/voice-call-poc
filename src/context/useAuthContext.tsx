import { createContext, useContext, useState } from 'react'

import { clearLocalStorage, store } from 'services/localStorage'

import type { FCWithChildren } from 'types'

interface AuthContextData {
  username?: string
  signIn: (username: string) => void
  signOut: VoidFunction
}

const AuthContext = createContext<any>(null)

export const AuthProvider: FCWithChildren = ({ children }) => {
  const [username, setUsername] = useState<string>()

  const signIn = (username: string) => {
    setUsername(username)

    store.username.set(username)
  }

  const signOut = () => {
    setUsername(undefined)

    clearLocalStorage()
  }

  const value: AuthContextData = {
    username,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default function useAuthContext() {
  return useContext<AuthContextData>(AuthContext)
}
