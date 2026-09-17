import { Navigate, Outlet } from 'react-router-dom';

const RutaProtegida = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RutaProtegida;