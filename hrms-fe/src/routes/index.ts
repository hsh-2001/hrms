import { lazy } from "react";
import { createBrowserRouter, type LoaderFunction } from "react-router";

export const createPermissionLoader = (pageKey: string): LoaderFunction => {
  return async () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      window.location.href = "/unauthorized";
      throw new Response("Forbidden", { status: 403 });
    }
    
    const userPermissions = JSON.parse(userStr);
    const hasPermission = userPermissions?.permissions?.some(
      (perm: { page_key: string; action: number }) => perm.page_key === pageKey && perm.action > 0
    );
    
    if (!hasPermission) {
      window.location.href = "/unauthorized";
      throw new Response("Forbidden", { status: 403 });
    }
    return null;
  };
};

const routes = createBrowserRouter([
   {
    path: "/",
    Component: lazy(() => import("../layouts/MainLayout.tsx")),
    children: [
      {
        path: "/",
        Component: lazy(() => import("../pages/Home.tsx")),
        loader: createPermissionLoader("dashboard/overview"),
      },
      {
        path: "/company-list",
        Component: lazy(() => import("../pages/root/company/CompanyList.tsx")),
        loader: createPermissionLoader("company/list"),
      },
      {
        path: "/employees",
        Component: lazy(() => import("../pages/employees/Employees.tsx")),
        loader: createPermissionLoader("employees/employee-list"),
      },
      {
        path: "/employees/departments",
        Component: lazy(() => import("../pages/employees/Departments.tsx")),
        loader: createPermissionLoader("employees/departments"),
      },
      {
        path: "/employees/positions",
        Component: lazy(() => import("../pages/employees/Positions.tsx")),
        loader: createPermissionLoader("employees/positions"),
      },
      {
        path: "/attendance",
        Component: lazy(() => import("../pages/attendance/DailyAttendance.tsx")),
        loader: createPermissionLoader("attendance/daily-attendance"),
      },
      {
        path: "/attendance/reports",
        Component: lazy(() => import("../pages/attendance/AttendanceReports.tsx")),
        loader: createPermissionLoader("attendance/reports"),
      },
      {
        path: "/attendance/clock-in-out",
        Component: lazy(() => import("../pages/attendance/ClockInOut.tsx")),
        loader: createPermissionLoader("attendance/clock-in-out"),
      },
      {
        path: "/leave",
        Component: lazy(() => import("../pages/leave/LeaveRequests.tsx")),
        loader: createPermissionLoader("leave/requests"),
      },
      {
        path: "/leave/types",
        Component: lazy(() => import("../pages/leave/LeaveTypes.tsx")),
        loader: createPermissionLoader("leave/types"),
      },
      {
        path: "/leave/reports",
        Component: lazy(() => import("../pages/leave/LeaveReports.tsx")),
        loader: createPermissionLoader("leave/reports"),
      },
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
        loader: createPermissionLoader("settings/general"),
      },
      {
        path: "/settings/users",
        Component: lazy(() => import("../pages/settings/Users.tsx")),
        loader: createPermissionLoader("settings/users"),
      },
      {
        path: "/settings/roles",
        Component: lazy(() => import("../pages/settings/Roles.tsx")),
        loader: createPermissionLoader("settings/roles"),
      },
      {
        path: "/settings/company",
        Component: lazy(() => import("../pages/settings/CompanyProfile.tsx")),
        loader: createPermissionLoader("settings/profile"),
      },
      {
        path: "/menu",
        Component: lazy(() => import("../pages/mobile/menu/Menu.tsx")),
      },
      {
        path: "/unauthorized",
        Component: lazy(() => import("../pages/UnAuthorize.tsx")),
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
   },
   {
    path: "/test/websocket",
    Component: lazy(() => import("../pages/test/TestWebSocket.tsx")),
   }
]);

export default routes;