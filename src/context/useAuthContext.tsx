import { createContext, useContext, useState } from 'react'
import { useEffectOnce } from 'react-use'

import { clearLocalStorage, store } from 'services/localStorage'

import { findUserByUsername } from 'helpers/utils'

import type { UserMetadata } from 'constants/users'
import type { FCWithChildren } from 'types'

export type User = Omit<UserMetadata, 'password'>

interface AuthContextData {
  user?: User
  signIn: (user: User) => void
  signOut: VoidFunction
}

const AuthContext = createContext<any>(null)

export const AuthProvider: FCWithChildren = ({ children }) => {
  const [user, setUser] = useState<User>()

  const signIn = (user: User) => {
    setUser(user)

    store.username.set(user.username)
  }

  const signOut = () => {
    setUser(undefined)

    clearLocalStorage()
  }

  const value: AuthContextData = {
    user,
    signIn,
    signOut,
  }

  useEffectOnce(() => {
    const username = store.username.get()

    const user = findUserByUsername(username)

    setUser(user)
  })

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default function useAuthContext() {
  return useContext<AuthContextData>(AuthContext)
}
