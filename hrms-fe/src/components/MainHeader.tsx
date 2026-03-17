import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { logout, useAppDispatch, useAppSelector } from "../store";
import useSidebar from "../hooks/useSidebar";

export default function MainHeader() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { selectedLang, handleChangeLanguage } = useSidebar();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <div className="h-12 w-full bg-white border-b border-gray-100 flex justify-between items-center px-2 rounded-sm">
      <div className="flex w-full justify-between gap-2">
        <div className="bg-gray-100 w-fit flex gap-2 p-2 py-1 rounded-sm">
          <button onClick={() => {handleChangeLanguage('kh')}} className={`bg-gray-50 px-2 text-center ${selectedLang === 'kh' ? 'font-medium text-primary' : 'text-gray-500'}`}>Khmer</button>
          <button onClick={() => {handleChangeLanguage('en')}} className={`bg-gray-50 px-2 text-center ${selectedLang === 'en' ? 'font-medium text-primary' : 'text-gray-500'}`}>English</button>
        </div>
        <div className="flex w-full items-center gap-2 justify-end">
          <span className="text-sm">({user?.user?.role})</span>
          <button
            onClick={handleLogout}
            className="cursor-pointer p-2 bg-red-500 rounded-full"
          >
            <LogOut size={14} className="text-white" />
          </button>
          </div>
      </div>
    </div>
  );
}
