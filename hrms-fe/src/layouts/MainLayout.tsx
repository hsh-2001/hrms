import { Outlet } from "react-router";
import MainSidebar from "../components/MainSidebar";
import MainHeader from "../components/MainHeader";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="w-62.5 bg-slate-800">
        <MainSidebar />
      </div>
      <div className="flex flex-col flex-1">
        <MainHeader />
        <div className="flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
