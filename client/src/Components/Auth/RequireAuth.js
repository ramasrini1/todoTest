import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './auth'

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = useAuth()
  console.log("auth user " + auth.user)
  if (!auth.user) {
    return <Navigate to='/error' state={{ path: location.pathname }} />
  }
  return children
}