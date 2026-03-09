CREATE TABLE payroll_components (
    id SERIAL PRIMARY KEY,
    company_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    component_type VARCHAR(50) NOT NULL,
    calculation_type VARCHAR(50) NOT NULL DEFAULT 'fixed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);