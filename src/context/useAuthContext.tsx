import { createContext, useContext, useState } from 'react'
import { useEffectOnce } from 'react-use'

import { clearLocalStorage, store } from 'services/localStorage'

import type { FCWithChildren } from 'types'

interface AuthContextData {
  username?: string | null
  signIn: (username: string) => void
  signOut: VoidFunction
}

const AuthContext = createContext<any>(null)

export const AuthProvider: FCWithChildren = ({ children }) => {
  const [username, setUsername] = useState<string | null>()

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

  useEffectOnce(() => {
    const username = store.username.get()

    setUsername(username)
  })

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default function useAuthContext() {
  return useContext<AuthContextData>(AuthContext)
}
