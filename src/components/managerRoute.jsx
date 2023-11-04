import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ authenticated }) => {
  const navigateOn = authenticated?.role === "manager" ? "Dashboard" : "/";
  return authenticated?.role === "manager" ? (
    <Outlet />
  ) : (
    <Navigate to={navigateOn} />
  );
};
