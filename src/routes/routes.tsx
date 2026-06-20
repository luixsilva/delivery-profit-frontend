import SignIn from "pages/public/SignIn";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./private-routes";
import PublicRoutes from "./public-routes";
import PrivateLayout from "components/layout/PrivateLayout";
import Dashboard from "pages/private/Dashboard";
import SignUp from "pages/public/SignUp";
import Vehicles from "pages/private/Vehicles";
import Settings from "pages/private/Settings";
import RoutesPage from "pages/private/Routes";
import Insights from "pages/private/Insights";
import HelpAndInformation from "pages/private/Help&Information";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/help" element={<HelpAndInformation />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
