import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import Spinner from '../../components/ui/Spinner';

const ProtectedRoutes = () => {
  const { status } = useAuthContext();

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'authenticated') {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
