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
      <div className="flex h-screen w-full main-bg">
        {!isMobile && (
          <div className="w-[250px] p-2 pr-0">
            <MainSidebar />
          </div>
        )}
        <div className="flex w-[calc(100%-250px)] my-2 flex-col flex-1">          
          <div className="px-2">
            <MainHeader />
          </div>
          <div className={`flex-1 overflow-auto ${isMobile ? "pb-20" : ""}`}>
            <Outlet />
          </div>

        </div>
        {isMobile && <MainBottomNavbar />}
      </div>
    </AuthGuard>
  );
};

export default MainLayout;