import { useEffect, type JSX } from "react";
import useSettings from "../hooks/useSettings";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import {
  Briefcase,
  Building,
  Users,
  ArrowUpRight,
  Clock,
  UserCog,
  BarChart3,
  Settings,
} from "lucide-react";

const cardConfig: Record<
  string,
  { icon: JSX.Element; iconBg: string; accent: string; path: string }
> = {
  total_employees: {
    icon: <Users size={22} strokeWidth={1.8} />,
    iconBg: "bg-blue-500/10 text-blue-600",
    accent: "bg-blue-500",
    path: "/employees",
  },
  total_departments: {
    icon: <Building size={22} strokeWidth={1.8} />,
    iconBg: "bg-emerald-500/10 text-emerald-600",
    accent: "bg-emerald-500",
    path: "/employees/departments",
  },
  total_positions: {
    icon: <Briefcase size={22} strokeWidth={1.8} />,
    iconBg: "bg-amber-500/10 text-amber-600",
    accent: "bg-amber-500",
    path: "/employees/positions",
  },
};

export default function Home() {
  const { companyOverview, getCompanySettingOverview } = useSettings();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    getCompanySettingOverview();
  }, []);

  const quickActions = [
    {
      icon: <Clock size={20} strokeWidth={1.8} />,
      label: t("clock_in_out"),
      desc: t("clock_in_out_desc"),
      path: "/attendance/clock-in-out",
      color: "text-violet-600 bg-violet-500/10",
    },
    {
      icon: <UserCog size={20} strokeWidth={1.8} />,
      label: t("manage_employees"),
      desc: t("manage_employees_desc"),
      path: "/employees",
      color: "text-blue-600 bg-blue-500/10",
    },
    {
      icon: <BarChart3 size={20} strokeWidth={1.8} />,
      label: t("view_reports"),
      desc: t("view_reports_desc"),
      path: "/attendance/reports",
      color: "text-emerald-600 bg-emerald-500/10",
    },
    {
      icon: <Settings size={20} strokeWidth={1.8} />,
      label: t("company_settings"),
      desc: t("company_settings_desc"),
      path: "/settings",
      color: "text-slate-600 bg-slate-500/10",
    },
  ];

  return (
    <div className="w-full min-h-full bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            {t("welcome_back")}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {t("dashboard_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(companyOverview).map(([key, value]) => {
            const config = cardConfig[key];
            if (!config) return null;

            return (
              <div
                key={key}
                onClick={() => navigate(config.path)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/4 transition-all duration-200 hover:shadow-md hover:ring-black/[0.08] hover:-translate-y-0.5"
              >
                <div
                  className={`absolute top-0 left-0 h-1 w-full ${config.accent} opacity-80`}
                />

                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.iconBg}`}
                  >
                    {config.icon}
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:bg-slate-100 group-hover:text-slate-600">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-500">
                    {t(key)}
                  </p>
                  <p className="mt-1 text-3xl font-bold tracking-tight text-slate-800">
                    {value}
                  </p>
                </div>

                <p className="mt-3 text-xs font-medium text-slate-400 group-hover:text-slate-500 transition-colors">
                  {t("view_details")} &rarr;
                </p>
              </div>
            );
          })}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-3">
            {t("quick_actions")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <div
                key={action.path}
                onClick={() => navigate(action.path)}
                className="group flex items-start gap-3 cursor-pointer rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/[0.04] transition-all duration-200 hover:shadow-md hover:ring-black/[0.08]"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${action.color}`}
                >
                  {action.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                    {action.label}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400 leading-relaxed">
                    {action.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
