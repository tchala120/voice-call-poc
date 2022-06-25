import type { FC } from 'react'

import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import PageRouter from 'setup/PageRouter'

import setupLocalStorage from 'services/localStorage'

import { AuthProvider } from 'context/useAuthContext'

setupLocalStorage()

const queryClient = new QueryClient()

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider componentSize="large">
        <AuthProvider>
          <PageRouter />
        </AuthProvider>
      </ConfigProvider>

      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}

export default App
