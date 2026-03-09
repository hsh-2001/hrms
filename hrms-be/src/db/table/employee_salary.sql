CREATE TABLE employee_salary (
    id SERIAL PRIMARY KEY,
    company_id INT NOT NULL,
    employee_id UUID NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    payment_type VARCHAR(50) NOT NULL DEFAULT 'monthly',
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    effective_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);