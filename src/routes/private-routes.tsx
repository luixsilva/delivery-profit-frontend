import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "hooks/use-auth";
import { LoadingScreen } from "components";

export default function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return user ? <Outlet /> : <Navigate to="/signin" replace />;
}
