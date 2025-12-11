import React from 'react';
import useRole from '../hooks/useRole';
import { Navigate } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ForbiddenPage from '../components/ForbiddenPage/ForbiddenPage';
import useAuth from '../hooks/useAuth';
const LibrarianRoute = ({children}) => {
  const [role, isRoleLoading] = useRole();
  const { loading, user } = useAuth()

  if(isRoleLoading || loading) return <LoadingSpinner></LoadingSpinner>
  
  if(role === 'librarian' && user) return children 

  return <ForbiddenPage></ForbiddenPage>;
};

export default LibrarianRoute;