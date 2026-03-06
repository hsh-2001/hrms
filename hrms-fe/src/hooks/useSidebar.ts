import { useLocation } from "react-router";
import { useState } from "react";
import type { IRoute } from "../types/route";
import { useAppSelector } from "../store";
import i18n from "../locale/i18n";
import type { MenuProps } from "antd";

const useSidebar = () => {
  const location = useLocation();
  const user = useAppSelector((state) => state.user);

  const [selectedLang, setSelectedLang] = useState<string>(
    localStorage.getItem("locale") || "en",
  );
  const languages = [
    { value: "en", label: "English" },
    { value: "kh", label: "ភាសាខ្មែរ" },
  ];

  const [routes, setRoutes] = useState<IRoute[]>([
    {
      title: "Dashboard",
      path: "/",
      children: [
        {
          title: "Overview",
          path: "/",
          page_key: "dashboard/overview",
        },
      ],
    },
    {
      title: "Company Account",
      path: "/company-list",
      children: [
        {
          title: "Company List",
          path: "/company-list",
          page_key: "company/list",
        },
      ],
    },
    {
      title: "Employees",
      path: "/employees",
      children: [
        {
          title: "Employee List",
          path: "/employees",
          page_key: "employees/employee-list",
        },
        {
          title: "Departments",
          path: "/employees/departments",
          page_key: "employees/departments",
        },
        {
          title: "Positions",
          path: "/employees/positions",
          page_key: "employees/positions",
        },
      ],
    },
    {
      title: "Attendance",
      path: "/attendance",
      children: [
        // {
        //   title: "Daily Attendance",
        //   path: "/attendance",
        // },
        {
          title: "Clock In/Out",
          path: "/attendance/clock-in-out",
          page_key: "attendance/clock-in-out",
        },
        {
          title: "Attendance Reports",
          path: "/attendance/reports",
          page_key: "attendance/reports",
        },
      ],
    },
    {
      title: "Leave",
      path: "/leave",
      children: [
        {
          title: "Leave Requests",
          path: "/leave",
          page_key: "leave/requests",
        },
        {
          title: "Leave Types",
          path: "/leave/types",
          page_key: "leave/types",
        },
        {
          title: "Leave Reports",
          path: "/leave/reports",
          page_key: "leave/reports",
        },
      ],
    },
    {
      title: "Payroll",
      path: "/payroll",
      children: [
        {
          title: "Payroll List",
          path: "/payroll",
          page_key: "payroll/list",
        },
        {
          title: "Salary Structure",
          path: "/payroll/salary-structure",
          page_key: "payroll/salary-structure",
        },
        {
          title: "Payslips",
          path: "/payroll/payslips",
          page_key: "payroll/payslips",
        },
      ],
    },
    {
      title: "Reports",
      path: "/reports",
      children: [
        {
          title: "Employee Reports",
          path: "/reports/employees",
          page_key: "reports/employees",
        },
        {
          title: "Attendance Reports",
          path: "/reports/attendance",
          page_key: "reports/attendance",
        },
        {
          title: "Payroll Reports",
          path: "/reports/payroll",
          page_key: "reports/payroll",
        },
      ],
    },
    {
      title: "Settings",
      path: "/settings",
      children: [
        {
          title: "General Settings",
          path: "/settings",
          page_key: "settings/general",
        },
        {
          title: "Users",
          path: "/settings/users",
          page_key: "settings/users",
        },
        {
          title: "Roles & Permissions",
          path: "/settings/roles",
          page_key: "settings/roles",
        },
        {
          title: "Company Profile",
          path: "/settings/company",
          page_key: "settings/profile",
        },
      ],
    },
  ]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleChangeLanguage: MenuProps["onClick"] = (value) => {
    setSelectedLang(value.key);
    i18n.changeLanguage(value.key);
    localStorage.setItem("locale", value.key);
  };

  const pageAuthorization = routes
    .map((route) => {
      if (route.children) {
        const authorizedChildren = route.children.filter((child) => {
          const permission = user.user?.permissions.find(
            (perm) => perm.page_key === child.page_key,
          );
          return permission ? permission.action > 0 : false;
        });
        return { ...route, children: authorizedChildren };
      }
      return route;
    })
    .filter((route) => route.children?.length !== 0) as IRoute[];

  return {
    routes: pageAuthorization,
    setRoutes,
    isActive,
    selectedLang,
    setSelectedLang,
    handleChangeLanguage,
    languages,
  };
};

export default useSidebar;
