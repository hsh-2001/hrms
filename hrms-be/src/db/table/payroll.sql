CREATE TABLE payroll (
    id SERIAL PRIMARY KEY,
    company_id INT NOT NULL,
    employee_id UUID,
    payroll_month INT NOT NULL,
    payroll_year INT NOT NULL,
    total_earnings NUMERIC(12,2),
    total_deductions NUMERIC(12,2),
    net_salary NUMERIC(12,2),
    status VARCHAR(20) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),

    UNIQUE(employee_id, payroll_month, payroll_year)
);