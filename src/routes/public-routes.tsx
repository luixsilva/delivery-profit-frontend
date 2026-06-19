import { useAuth } from "hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const { user } = useAuth();

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoutes;
