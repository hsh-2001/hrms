CREATE TABLE leave_balances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL,
    leave_type_id UUID NOT NULL,
    company_id INT NOT NULL,
    year INT NOT NULL,
    total_days INT NOT NULL,
    used_days NUMERIC(5,2) NOT NULL,
    remaining_days NUMERIC(5,2) GENERATED ALWAYS AS (total_days - used_days) STORED,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (employee_id, leave_type_id, year)
);