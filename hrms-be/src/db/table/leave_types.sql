CREATE TABLE leave_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    total_per_year NUMERIC(5,2) NOT NULL DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (company_id, name)
);