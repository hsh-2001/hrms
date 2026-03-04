INSERT INTO roles (company_id, name, description, is_default)
VALUES
(0, 'Owner', 'Full system access', TRUE),
(0, 'Company', 'Company administrator with full company control', TRUE),
(0, 'HR Manager', 'Manages employees, leave, attendance, payroll', TRUE),
(0, 'Team Lead', 'Manages team members and approvals', TRUE),
(0, 'Employee', 'Standard employee access', TRUE);