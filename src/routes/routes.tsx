// import PrivateLayout from "components/layout/private-layout";
import SignIn from "pages/public/SignIn";
// import SignUp from "pages/public/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./private-routes";
import PublicRoutes from "./public-routes";
import Dashboard from "pages/private/Dashboard";
import SignUp from "pages/public/SignUp";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
