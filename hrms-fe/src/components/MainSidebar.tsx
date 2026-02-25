import { NavLink, useLocation } from "react-router";
import useSidebar from "../hooks/useSidebar";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import type { IRoute } from "../types/route";
import { useAppSelector } from "../store";
import { useTranslation } from "react-i18next";
import useDevice from "../hooks/useDevice";

export default function MainSidebar() {
  const { routes, setRoutes } = useSidebar();
  const { isMobile } = useDevice();
  const navigater = useLocation();
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user);

  const toggleExpand = (index: number) => {
    const newRoutes = [...routes];
    newRoutes[index].isExpanded = !newRoutes[index].isExpanded;
    if (newRoutes[index].isExpanded) {
      newRoutes.forEach((route, i) => {
        if (i !== index) {
          route.isExpanded = false;
        }
      });
    }
    setRoutes(newRoutes);
  };

  const isChildActive = (route: IRoute) => {
    if (route.children) {
      return route.children.some((child: IRoute) => child.path === navigater.pathname);
    }
    return false;
  }

  useEffect(() => {
    const currentPath = navigater.pathname;
    const newRoutes = routes.map((route) => {
      if (route.path === currentPath) {
        return { ...route, isExpanded: true };
      }
      if (route.children) {
        const isChildActive = route.children.some(
          (child: IRoute) => child.path === currentPath,
        );
        return { ...route, isExpanded: isChildActive };
      }
      return route;
    });
    setRoutes(newRoutes);
  }, []);

  return (
    <div className={`w-full p-2 rounded-[20px] h-full relative ${isMobile ? "bg-gray-200" : "bg-black/5"}`}>
      <div className="flex px-2 items-center h-16">
        <span className="text-xl font-bold text-gray-600">
          { user.user?.company_id === 0 ? t("Root Account") : user.user?.company_name}
          </span>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {routes.map((route, index) => (
          <div key={index} className="text-gray-700">
            <div
              className={`flex justify-between items-center rounded-xl p-2 cursor-pointer text-sm ${isChildActive(route) ? "bg-green-500/10 text-green-500 font-medium" : ""}`}
              onClick={() => toggleExpand(index)}
            >
              <span>{t(route.title)}</span>  

              {route.children && route.children.length > 0 && (
                <ChevronDown
                  size={14}
                  className={`ml-2 transition-all duration-700 ${
                    route.isExpanded ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>

            {route.children && route.children.length > 0 && (
              <div
                className={`bg-gray-50 space-y-1 rounded-xl mt-1 p-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  route.isExpanded
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {route.children.map((child, childIndex) => (
                  <NavLink
                    key={childIndex}
                    to={child.path}
                    end
                    className={({ isActive }) =>
                      `block p-2 hover:bg-green-500/10 rounded-[10px] text-sm ${
                        isActive ? "bg-green-500/10 text-green-800" : ""
                      }`
                    }
                  >
                    {t(child.title)}
                  </NavLink>
                ))}
              </div>
            )}
          <div className={ !route.isExpanded ? `border-b-[0.5px] border-black/6` : ""}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
