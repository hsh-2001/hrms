import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";

interface NavItemProps {
  name: string;
  icon: LucideIcon;
  path: string;
  active: boolean;
  onClick: () => void;
}

export default function NavItem({
  name,
  icon: Icon,
  path,
  active,
  onClick,
}: NavItemProps) {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className="no-underline flex flex-col items-center justify-center flex-1 gap-0.5 py-1 transition-all duration-200"
    >
      <div
        className={`flex flex-col items-center justify-center gap-0.5 rounded-full transition-all duration-200 ${
          active
            ? "bg-green-500/10 px-4.5 py-1.5"
            : "bg-transparent px-3 py-1.5"
        }`}
      >
        <Icon
          size={22}
          strokeWidth={active ? 2.2 : 1.8}
          className={`transition-colors duration-200 ${active ? "text-green-600" : "text-gray-500"}`}
        />
        <span
          className={`text-[10px] leading-tight tracking-wide transition-colors duration-200 ${
            active
              ? "font-semibold text-green-600"
              : "font-normal text-gray-500"
          }`}
        >
          {name}
        </span>
      </div>
    </NavLink>
  );
}
