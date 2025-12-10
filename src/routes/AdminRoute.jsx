import React from 'react';
import useRole from '../hooks/useRole';
import { Navigate } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ForbiddenPage from '../components/ForbiddenPage/ForbiddenPage';

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if(isRoleLoading) return <LoadingSpinner></LoadingSpinner>
  
  if(role === 'admin') return children

  return <ForbiddenPage></ForbiddenPage>;
};

export default AdminRoute;