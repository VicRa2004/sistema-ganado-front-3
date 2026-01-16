import { useAuthStore } from "@/modules/auth/infrastructure/auth.store";
import { Navigate, Outlet } from "react-router";
export const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};
