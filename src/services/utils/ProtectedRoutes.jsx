import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const ProtectedRoutes = () => {
  const { user, loading } = useAuthContext();

  if (loading) return null;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
