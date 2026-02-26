DROP FUNCTION IF EXISTS get_company_settings(
    INT
);

CREATE OR REPLACE FUNCTION get_company_settings(
    p_company_id INT
)
RETURNS TABLE (
    id INT,
    name VARCHAR,
    login_name VARCHAR,
    email VARCHAR,
    phone VARCHAR,
    currency_code VARCHAR,
    address TEXT,
    fiscal_year_start_month INT,
    timezone VARCHAR,
    working_days_per_week INT,
    allow_overtime BOOLEAN,
    overtime_rate NUMERIC(5,2),
    probation_period_days INT,
    shift_name VARCHAR,
    start_time TIME,
    end_time TIME,
    break_start TIME,
    break_end TIME,
    standard_work_hours_per_day NUMERIC(4,2)
)
LANGUAGE plpgsql
AS $$
    BEGIN
        RETURN QUERY
        SELECT 
            c.id,
            c.name,
            u.username AS login_name,
            c.email,
            c.phone,
            cs.currency_code,
            c.address,
            cs.fiscal_year_start_month,
            cs.timezone,
            cs.working_days_per_week,
            cs.allow_overtime,
            cs.overtime_rate,
            cs.probation_period_days,
            ws.shift_name,
            ws.start_time,
            ws.end_time,
            ws.break_start,
            ws.break_end,
            ws.standard_work_hours_per_day
        FROM company_settings cs
        INNER JOIN companies c ON cs.company_id = c.id
        INNER JOIN users u ON c.id = u.company_id
        LEFT JOIN working_shifts ws ON c.id = ws.company_id
        WHERE cs.company_id = p_company_id;
    END;
$$;
