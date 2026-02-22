import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { useAppSelector } from "../../store/hooks";

interface GuestGuardProps {
  children: ReactNode;
}

const GuestGuard = ({ children }: GuestGuardProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default GuestGuard;
