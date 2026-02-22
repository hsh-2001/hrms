import { Navigate, useLocation } from "react-router";
import type { ReactNode } from "react";
import { useAppSelector } from "../../store/hooks";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
