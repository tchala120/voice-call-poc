import type { FC } from 'react'

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'

import AuthPage from 'pages/AuthPage'
import RoomPage from 'pages/RoomPage'

import useAuthContext, { User } from 'context/useAuthContext'

import type { RouteKey } from './types'

export const paths: Record<RouteKey, string> = {
  root: '/',
  auth: '/auth',
  room: '/room',
}

const PageRouter = () => {
  const auth = useAuthContext()

  const redirectTo = auth.user == null ? paths.auth : paths.room

  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.root} element={<Navigate to={redirectTo} />} />

        <Route element={<SignInRoute user={auth.user} />}>
          <Route path={paths.auth} element={<AuthPage />} />
        </Route>

        <Route element={<AuthenticatedRoute user={auth.user} />}>
          <Route path={paths.room} element={<RoomPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default PageRouter

interface UserData {
  user?: User
}

const AuthenticatedRoute: FC<UserData> = ({ user }) => {
  if (user == null) {
    return <Navigate to={paths.auth} />
  }

  return <Outlet />
}

const SignInRoute: FC<UserData> = ({ user }) => {
  if (user != null) {
    return <Navigate to={paths.room} />
  }

  return <Outlet />
}
