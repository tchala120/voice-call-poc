import type { FC } from 'react'

import { ConfigProvider } from 'antd'

import PageRouter from 'setup/PageRouter'

import setupLocalStorage from 'services/localStorage'

import { AuthProvider } from 'context/useAuthContext'

setupLocalStorage()

const App: FC = () => {
  return (
    <ConfigProvider componentSize="large">
      <AuthProvider>
        <PageRouter />
      </AuthProvider>
    </ConfigProvider>
  )
}

export default App
