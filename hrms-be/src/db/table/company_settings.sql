CREATE TABLE company_settings (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    company_id INT NOT NULL UNIQUE,

    currency_code VARCHAR(10) DEFAULT 'USD',
    fiscal_year_start_month INT DEFAULT 1 CHECK (fiscal_year_start_month BETWEEN 1 AND 12),
    timezone VARCHAR(100) DEFAULT 'Asia/Phnom_Penh',
    working_days_per_week INT DEFAULT 5 CHECK (working_days_per_week BETWEEN 1 AND 7),

    allow_overtime BOOLEAN DEFAULT TRUE,
    overtime_rate NUMERIC(5,2) DEFAULT 1.50,
    probation_period_days INT DEFAULT 90,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);