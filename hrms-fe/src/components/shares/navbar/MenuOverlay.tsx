import { NavLink, useLocation } from "react-router";
import {
  ChevronRight,
  LayoutDashboard,
  Eye,
  Building2,
  List,
  Users,
  Network,
  Briefcase,
  CalendarCheck,
  Clock,
  FileBarChart,
  CalendarOff,
  FileText,
  Tags,
  Wallet,
  Layers,
  Receipt,
  BarChart3,
  UserCheck,
  Settings,
  Sliders,
  UserCog,
  Shield,
  Building,
  type LucideIcon,
} from "lucide-react";
import "../../../assets/styles/navbar.css";
import useSidebar from "../../../hooks/useSidebar";
import { useTranslation } from "react-i18next";

const iconMap: Record<string, LucideIcon> = {
  // Dashboard
  Dashboard: LayoutDashboard,
  Overview: Eye,
  // Company
  "Company Account": Building2,
  "Company List": List,
  // Employees
  Employees: Users,
  "Employee List": Users,
  Departments: Network,
  Positions: Briefcase,
  // Attendance
  Attendance: CalendarCheck,
  "Daily Attendance": CalendarCheck,
  "Clock In/Out": Clock,
  "Attendance Reports": FileBarChart,
  // Leave
  Leave: CalendarOff,
  "Leave Requests": CalendarOff,
  "Leave Types": Tags,
  "Leave Reports": FileText,
  // Payroll
  Payroll: Wallet,
  "Payroll List": Wallet,
  "Salary Structure": Layers,
  Payslips: Receipt,
  // Reports
  Reports: BarChart3,
  "Employee Reports": UserCheck,
  "Payroll Reports": BarChart3,
  // Settings
  Settings: Settings,
  "General Settings": Sliders,
  Users: UserCog,
  "Roles & Permissions": Shield,
  "Company Profile": Building,
};

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const { routes } = useSidebar();
  const location = useLocation();
  const { t } = useTranslation();

  if (!open) return null;
  return (
    <div
      className="fixed z-60 top-0 bottom-0 inset-0 bg-black/30 h-full overflow-hidden"
      onClick={onClose}
    >
      <div
        className="absolute right-2 w-64 top-2 bottom-4 bottom-navbar rounded-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-auto min-h-[calc(100dvh-4px)] px-2 rounded-[20px] bg-gray-50">
          {routes.map((group) => (
            <div key={group.title} className="mb-2">
              <div className="px-3 bg-gray-50 pt-2 rounded-[20px] sticky top-0 pb-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                {group.title}
              </div>
              <div className="flex flex-col gap-0.5">
                {(group.children ?? [group]).map((child) => {
                  const isActive = location.pathname === child.path;
                  const Icon = iconMap[child.title];
                  return (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      onClick={onClose}
                      className={`no-underline flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-150 ${
                        isActive
                          ? "bg-green-50 text-green-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100 active:bg-gray-200"
                      }`}
                    >
                      {Icon && (
                        <Icon
                          size={16}
                          strokeWidth={isActive ? 2.2 : 1.6}
                          className={
                            isActive ? "text-green-600" : "text-gray-400"
                          }
                        />
                      )}
                      <span className="flex-1">{t(child.title)}</span>
                      {isActive && (
                        <ChevronRight size={14} className="text-green-500" />
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
