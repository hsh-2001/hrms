import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";

export default function MainHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  }
  return (
    <div className='h-12 bg-gray-100 w-full flex justify-between items-center px-4'>
        <div></div>
        <div className="flex items-center gap-2">
            <span className='text-sm text-gray-600'>John Doe</span>
            <button onClick={handleLogout} className="cursor-pointer p-2 bg-gray-500/50 rounded-full">
              <LogOut size={14} className="text-white"/>
            </button>
        </div>
    </div>
  )
}
