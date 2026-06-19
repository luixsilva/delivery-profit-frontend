import { LoadingScreen } from "components";
import { useAuth } from "hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoutes;
