import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { logout, useAppDispatch } from "../store";
import useSidebar from "../hooks/useSidebar";
import { Button, Dropdown } from "antd";

export default function MainHeader() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedLang, handleChangeLanguage, languages } = useSidebar();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <div className="h-12 bg-black/5 w-full flex justify-between items-center px-2 rounded-[20px]">
      <div></div>
      <div className="flex items-center gap-2">
        <Dropdown
          menu={{
            items: languages.map((lang) => ({
              key: lang.value,
              label: lang.label,
            })),
            onClick: handleChangeLanguage,
          }}
          placement="bottom"
          arrow={{ pointAtCenter: true }}
        >
          <Button className="flex items-center gap-1">
            {languages.find((v) => v.value === selectedLang)?.label}
          </Button>
        </Dropdown>
        <span className="text-sm text-green-500 bg-white px-2 py-1 rounded-md">
          John Doe
        </span>
        <button
          onClick={handleLogout}
          className="cursor-pointer p-2 bg-red-500 rounded-full"
        >
          <LogOut size={14} className="text-white" />
        </button>
      </div>
    </div>
  );
}
