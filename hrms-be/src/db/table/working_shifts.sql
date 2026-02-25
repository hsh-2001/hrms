CREATE TABLE working_shifts (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    company_id INT NOT NULL,
    shift_name VARCHAR(100) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    break_start TIME,
    break_end TIME,
    standard_work_hours_per_day NUMERIC(4,2) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (company_id, shift_name)
);