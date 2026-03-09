```
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
```

```
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
```

```
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
```


```
CREATE TABLE employee_payroll_components (
    id SERIAL PRIMARY KEY,
    employee_id UUID,
    component_id SERIAL,
    value NUMERIC(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),

    UNIQUE(employee_id, component_id)
);
```
