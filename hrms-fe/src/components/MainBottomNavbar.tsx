import { AlarmClock, House, Menu } from "lucide-react";
import useDevice from "../hooks/useDevice";
import { useLocation } from "react-router";
import { useState } from "react";
import NavItem from "./shares/navbar/NavItem";
import MenuOverlay from "./shares/navbar/MenuOverlay";

const bottomMenus = [
  { name: "Home", icon: House, path: "/" },
  { name: "Attendance", icon: AlarmClock, path: "/attendance/clock-in-out" },
  { name: "Menu", icon: Menu, path: "#" },
];

export default function MainBottomNavbar() {
  const { isMobile } = useDevice();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(false);

  if (!isMobile) return null;

  return (
    <>
      <div className="w-full px-4 pb-4 fixed bottom-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between rounded-full px-2 py-1 bg-gray-100 backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.10),0_1.5px_6px_rgba(0,0,0,0.06)]">
          {bottomMenus.map((menu) => (
            <NavItem
              key={menu.name}
              name={menu.name}
              icon={menu.icon}
              path={menu.path}
              active={location.pathname === menu.path}
              onClick={() =>
                menu.name === "Menu"
                  ? setActiveMenu(!activeMenu)
                  : setActiveMenu(false)
              }
            />
          ))}
        </div>
      </div>
      <MenuOverlay open={activeMenu} onClose={() => setActiveMenu(false)} />
    </>
  );
}
