import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const routes = createBrowserRouter([
   {
    path: "/",
    Component: lazy(() => import("../layouts/MainLayout.tsx")),
    children: [
      {
        path: "/",
        Component: lazy(() => import("../pages/Home.tsx")),
      },
      {
        path: "/company-list",
        Component: lazy(() => import("../pages/root/company/CompanyList.tsx")),
      },
      {
        path: "/employees",
        Component: lazy(() => import("../pages/employees/Employees.tsx")),
      },
      {
        path: "/employees/departments",
        Component: lazy(() => import("../pages/employees/Departments.tsx")),
      },
      {
        path: "/employees/positions",
        Component: lazy(() => import("../pages/employees/Positions.tsx")),
      },
      {
        path: "/attendance",
        Component: lazy(() => import("../pages/attendance/DailyAttendance.tsx")),
      },
      {
        path: "/attendance/reports",
        Component: lazy(() => import("../pages/attendance/AttendanceReports.tsx")),
      },
      {
        path: "/attendance/clock-in-out",
        Component: lazy(() => import("../pages/attendance/ClockInOut.tsx")),
      },
      {
        path: "/leave",
        Component: lazy(() => import("../pages/leave/LeaveRequests.tsx")),
      },
      {
        path: "/leave/types",
        Component: lazy(() => import("../pages/leave/LeaveTypes.tsx")),
      },
      {
        path: "/leave/reports",
        Component: lazy(() => import("../pages/leave/LeaveReports.tsx")),
      },
      // Payroll
      {
        path: "/payroll",
        Component: lazy(() => import("../pages/payroll/PayrollList.tsx")),
      },
      {
        path: "/payroll/salary-structure",
        Component: lazy(() => import("../pages/payroll/SalaryStructure.tsx")),
      },
      {
        path: "/payroll/payslips",
        Component: lazy(() => import("../pages/payroll/Payslips.tsx")),
      },
      // Reports
      {
        path: "/reports/employees",
        Component: lazy(() => import("../pages/reports/EmployeeReports.tsx")),
      },
      {
        path: "/reports/attendance",
        Component: lazy(() => import("../pages/reports/AttendanceReports.tsx")),
      },
      {
        path: "/reports/payroll",
        Component: lazy(() => import("../pages/reports/PayrollReports.tsx")),
      },
      // Settings
      {
        path: "/settings",
        Component: lazy(() => import("../pages/settings/Setting.tsx")),
      },
      {
        path: "/settings/users",
        Component: lazy(() => import("../pages/settings/Users.tsx")),
      },
      {
        path: "/settings/roles",
        Component: lazy(() => import("../pages/settings/Roles.tsx")),
      },
      {
        path: "/settings/company",
        Component: lazy(() => import("../pages/settings/CompanyProfile.tsx")),
      },
      {
        path: "/menu",
        Component: lazy(() => import("../pages/mobile/menu/Menu.tsx")),
      }
    ],
   },
   {
    path: "/auth",
    Component: lazy(() => import("../layouts/AuthLayout.tsx")),
    children: [
      {
        path: "/auth/login",
        Component: lazy(() => import("../pages/auth/Login.tsx")),
      }
    ],
   }
]);

export default routes;