import type { FC } from 'react'

import PageRouter from 'setup/PageRouter'

import setupLocalStorage from 'services/localStorage'

import { AuthProvider } from 'context/useAuthContext'

setupLocalStorage()

const App: FC = () => {
  return (
    <AuthProvider>
      <PageRouter />
    </AuthProvider>
  )
}

export default App
