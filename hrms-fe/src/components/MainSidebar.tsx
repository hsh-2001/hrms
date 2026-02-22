import { NavLink, useLocation } from "react-router";
import useRouter from "../hooks/useRouter";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import type { IRoute } from "../types/route";

export default function MainSidebar() {
  const { routes, setRoutes } = useRouter();
  const navigater = useLocation();

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
    <div className="w-64 bg-gray-100 h-screen">
      <div className="flex justify-center items-center h-16">
        <span className="text-4xl font-bold text-green-500">SGS</span>
      </div>
      <div>
        {routes.map((route, index) => (
          <div key={index} className="text-gray-700 border-b border-gray-200">
            <div
              className={`flex justify-between p-2 cursor-pointer text-[12px] ${isChildActive(route) ? "bg-green-500/20 text-green-500 font-medium" : ""}`}
              onClick={() => toggleExpand(index)}
            >
              <span>{route.title}</span>

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
                className={`bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out ${
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
                      `block px-4 py-2 hover:bg-green-500/10 text-[12px] ${
                        isActive ? "bg-green-500/10 text-green-800" : ""
                      }`
                    }
                  >
                    {child.title}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
