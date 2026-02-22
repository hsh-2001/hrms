import { Navigate } from "react-router";
import type { ReactNode } from "react";

interface GuestGuardProps {
  children: ReactNode;
}

const GuestGuard = ({ children }: GuestGuardProps) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default GuestGuard;
