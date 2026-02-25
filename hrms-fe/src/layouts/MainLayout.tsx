import { Outlet } from "react-router";
import MainSidebar from "../components/MainSidebar";
import MainHeader from "../components/MainHeader";
import AuthGuard from "../components/guards/AuthGuard";
import useDevice from "../hooks/useDevice";
import MainBottomNavbar from "../components/MainBottomNavbar";

const MainLayout = () => {
  const { isMobile } = useDevice();
  return (
    <AuthGuard>
      <div className="flex h-screen main-bg">
        <div className={`p-2 pr-0 ${isMobile ? "hidden" : "w-62.5"}`}>
          <MainSidebar />
        </div>
        <div className="flex flex-col flex-1 px-2 py-2">
          <MainHeader />
          <div className={`flex-1 overflow-auto ${isMobile ? "pb-20" : ""}`}>
            <Outlet />
          </div>
        </div>
          <MainBottomNavbar />
      </div>
    </AuthGuard>
  );
};

export default MainLayout;
