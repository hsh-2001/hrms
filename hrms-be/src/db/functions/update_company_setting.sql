CREATE OR REPLACE FUNCTION update_company_setting(
    p_company_id INT,
    p_name VARCHAR,
    p_email VARCHAR,
    p_phone VARCHAR,
    p_currency_code VARCHAR,
    p_address TEXT,
    p_fiscal_year_start_month INT,
    p_timezone VARCHAR,
    p_working_days_per_week INT,
    p_allow_overtime BOOLEAN,
    p_overtime_rate NUMERIC(5,2),
    p_probation_period_days INT,
    p_shift_name VARCHAR,
    p_start_time TIME,
    p_end_time TIME,
    p_break_start TIME,
    p_break_end TIME,
    p_standard_work_hours_per_day NUMERIC(4,2)
)
RETURNS TABLE (
    message VARCHAR,
    status_code INT
)
LANGUAGE plpgsql
AS $$

    DECLARE
        v_company_exists BOOLEAN;

    BEGIN
        UPDATE companies
        SET 
            name = p_name,
            email = p_email,
            phone = p_phone,
            address = p_address
        WHERE id = p_company_id;

        UPDATE company_settings
        SET 
            currency_code = p_currency_code,
            fiscal_year_start_month = p_fiscal_year_start_month,
            timezone = p_timezone,
            working_days_per_week = p_working_days_per_week,
            allow_overtime = p_allow_overtime,
            overtime_rate = p_overtime_rate,
            probation_period_days = p_probation_period_days
        WHERE company_id = p_company_id;

       IF (EXISTS (SELECT 1 FROM working_shifts WHERE company_id = p_company_id)) THEN
            UPDATE working_shifts
            SET 
                shift_name = p_shift_name,
                start_time = p_start_time,
                end_time = p_end_time,
                break_start = p_break_start,
                break_end = p_break_end,
                standard_work_hours_per_day = p_standard_work_hours_per_day
            WHERE company_id = p_company_id;
        ELSE
            INSERT INTO working_shifts (
                company_id,
                shift_name,
                start_time,
                end_time,
                break_start,
                break_end,
                standard_work_hours_per_day
            ) VALUES (
                p_company_id,
                p_shift_name,
                p_start_time,
                p_end_time,
                p_break_start,
                p_break_end,
                p_standard_work_hours_per_day
            );
        END IF;

        RETURN QUERY SELECT 'Company settings updated successfully'::VARCHAR AS message, 200::INT AS status_code;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN QUERY SELECT ('Error updating company settings: ' || SQLERRM)::VARCHAR AS message, 500::INT AS status_code;
END;
$$;