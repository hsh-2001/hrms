TRUNCATE TABLE pages RESTART IDENTITY;

WITH default_pages (name, key, action, available) AS (
    VALUES
        ('overview', 'dashboard/overview', 1, 1),
        ('employee-list', 'employees/employee-list', 1, 1),
        ('departments', 'employees/departments', 1, 15),
        ('positions', 'employees/positions', 1, 15),
        ('attendance', 'attendance', 1, 1),
        ('leave', 'leave', 1, 1),
        ('departments', 'departments', 1, 1),
        ('positions', 'positions', 1, 1),
        ('settings', 'settings', 1, 1),
        ('users', 'users', 1, 1),
        ('reports', 'reports', 1, 1)
)

INSERT INTO pages (name, key, action, available)
SELECT name, key, action, available
FROM default_pages
ON CONFLICT (key) DO NOTHING;