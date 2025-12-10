import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router'


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading && !user) return <LoadingSpinner></LoadingSpinner>
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

export default PrivateRoute
