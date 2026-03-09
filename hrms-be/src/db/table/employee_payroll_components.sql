CREATE TABLE employee_payroll_components (
    id SERIAL PRIMARY KEY,
    employee_id UUID,
    company_id INT NOT NULL,
    component_id SERIAL,
    value NUMERIC(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),

    UNIQUE(employee_id, component_id, company_id)
);