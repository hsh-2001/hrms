TRUNCATE TABLE pages RESTART IDENTITY;

-- Flag value for page athorization:
-- 1: VIEW, 2: CREATE, 4: UPDATE, 8: DELETE, 16: EXPORT
WITH default_pages (id, name, key, action, available) AS (
VALUES
    (1, 'Overview', 'dashboard/overview', 0, 1),
    (2, 'Company List', 'company/list', 0, 15),
    (3, 'Employee List', 'employees/employee-list', 0, 15),
    (4, 'Departments', 'employees/departments', 0, 15),
    (5, 'Positions', 'employees/positions', 0, 15),
    (6, 'Clock In/Out', 'attendance/clock-in-out', 0, 1),
    (7, 'Attendance Reports', 'attendance/reports', 0, 1),
    (8, 'Leave Requests', 'leave/requests', 0, 0),
    (9, 'Leave Types', 'leave/types', 0, 15),
    (10, 'Leave Reports', 'leave/reports', 0, 1),
    (11, 'Payroll List', 'payroll/list', 0, 15),
    (12, 'Salary Structure', 'payroll/salary-structure', 0, 15),
    (13, 'Payslips', 'payroll/payslips', 0, 1),
    (14, 'Employee Reports', 'reports/employees', 0, 1),
    (15, 'Attendance Reports', 'reports/attendance', 0, 1),
    (16, 'Payroll Reports', 'reports/payroll', 0, 1),
    (17, 'General Settings', 'settings/general', 0, 15),
    (18, 'Users', 'settings/users', 0, 15),
    (19, 'Roles & Permissions', 'settings/roles', 0, 15),
    (20, 'Company Profile', 'settings/company', 0, 15)
)

INSERT INTO pages (id, name, key, action, available)
SELECT id, name, key, action, available
FROM default_pages
ON CONFLICT (key) DO NOTHING;