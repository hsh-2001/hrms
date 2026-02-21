import { useLocation } from "react-router";
import { useState } from "react";
import type { IRoute } from "../types/route";

const useRouter = () => {
  const location = useLocation();
  const [routes, setRoutes] = useState<IRoute[]>([
    {
      title: "Dashboard",
      path: "/",
      children: [
        {
          title: "Overview",
          path: "/",
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
        },
        {
          title: "Departments",
          path: "/employees/departments",
        },
        {
          title: "Positions",
          path: "/employees/positions",
        },
      ],
    },
    {
      title: "Attendance",
      path: "/attendance",
      children: [
        {
          title: "Daily Attendance",
          path: "/attendance",
        },
        {
          title: "Attendance Reports",
          path: "/attendance/reports",
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
        },
        {
          title: "Leave Types",
          path: "/leave/types",
        },
        {
          title: "Leave Reports",
          path: "/leave/reports",
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
        },
        {
          title: "Salary Structure",
          path: "/payroll/salary-structure",
        },
        {
          title: "Payslips",
          path: "/payroll/payslips",
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
        },
        {
          title: "Attendance Reports",
          path: "/reports/attendance",
        },
        {
          title: "Payroll Reports",
          path: "/reports/payroll",
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
        },
        {
          title: "Users",
          path: "/settings/users",
        },
        {
          title: "Roles & Permissions",
          path: "/settings/roles",
        },
        {
          title: "Company Profile",
          path: "/settings/company",
        },
      ],
    },
  ]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return {
    routes,
    setRoutes,
    isActive,
  };
};

export default useRouter;
