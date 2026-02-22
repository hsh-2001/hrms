import { Outlet } from "react-router";
import GuestGuard from "../components/guards/GuestGuard";

const AuthLayout = () => {
  return (
    <GuestGuard>
      <div>
        <Outlet />
      </div>
    </GuestGuard>
  );
};

export default AuthLayout;
