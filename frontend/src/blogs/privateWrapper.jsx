import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../components/customHooks/useAuth";

export default function PrivateWrapper() {
  //Privately wraping the routes
  const { isAuthenticated, loading } = useAuth();
  //to deal with asynchronous nature of useEffect
  return loading ? (
    <div></div>
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" />
  );
}
