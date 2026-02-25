import useSidebar from "../../../hooks/useSidebar";
import { NavLink } from "react-router";

export default function Menu() {
  const { routes } = useSidebar();
  const newRoutes = routes.map((route) => route.children ? route.children : route).flat();
  return <div>
    {newRoutes.map((route) => (
      <NavLink to={route.path} key={route.path} className="block p-4 border-b">
        {route.title}
      </NavLink>
    ))}
  </div>;
}
