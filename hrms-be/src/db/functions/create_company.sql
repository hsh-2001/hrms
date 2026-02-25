DROP FUNCTION IF EXISTS create_company(
    VARCHAR,
    VARCHAR,
    VARCHAR,
    TEXT,
    VARCHAR,
    INT,
    VARCHAR,
    INT,
    NUMERIC,
    BOOLEAN,
    NUMERIC,
    INT
);

CREATE OR REPLACE FUNCTION create_company(
    company_name VARCHAR,
    company_email VARCHAR,
    company_phone VARCHAR,
    company_address TEXT,
    currency_code VARCHAR,
    fiscal_year_start_month INT,
    timezone VARCHAR,
    working_days_per_week INT,
    allow_overtime BOOLEAN,
    overtime_rate NUMERIC(5,2),
    probation_period_days INT
)
RETURNS TABLE (company_id INT)
LANGUAGE plpgsql
AS $$

DECLARE
    v_company_id INT;

BEGIN

    -- Insert into companies and capture id
    INSERT INTO companies (name, email, phone, address)
    VALUES (company_name, company_email, company_phone, company_address)
    RETURNING id INTO v_company_id;

    -- Insert into company_settings
    INSERT INTO company_settings (
        company_id,
        currency_code,
        fiscal_year_start_month,
        timezone,
        working_days_per_week,
        allow_overtime,
        overtime_rate,
        probation_period_days
    )
    VALUES (
        v_company_id,
        currency_code,
        fiscal_year_start_month,
        timezone,
        working_days_per_week,
        allow_overtime,
        overtime_rate,
        probation_period_days
    );

    -- Return result
    RETURN QUERY SELECT v_company_id;

    EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Create company failed: %', SQLERRM;
END;
$$;