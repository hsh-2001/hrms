DROP FUNCTION IF EXISTS check_attendance(
    UUID,
    INT,
    DATE,
    TIME,
    TIME,
    TIME,
    TIME,
    VARCHAR
);

CREATE OR REPLACE FUNCTION check_attendance(
    p_employee_id UUID,
    p_company_id INT,
    p_attendance_date DATE,
    p_check_in_time TIME,
    p_check_out_time TIME,
    p_re_check_in_time TIME,
    p_re_check_out_time TIME,
    p_status VARCHAR(20)
)
RETURNS TABLE (
    message TEXT,
    status_code INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO attendances (
        employee_id,
        company_id,
        attendance_date,
        check_in_time,
        check_out_time,
        re_check_in_time,
        re_check_out_time,
        status
    )
    VALUES (
        p_employee_id,
        p_company_id,
        p_attendance_date,
        p_check_in_time,
        p_check_out_time,
        p_re_check_in_time,
        p_re_check_out_time,
        p_status
    )
    ON CONFLICT (employee_id, attendance_date)
    DO UPDATE
    SET
        check_in_time     = COALESCE(EXCLUDED.check_in_time, attendances.check_in_time),
        check_out_time    = COALESCE(EXCLUDED.check_out_time, attendances.check_out_time),
        re_check_in_time  = COALESCE(EXCLUDED.re_check_in_time, attendances.re_check_in_time),
        re_check_out_time = COALESCE(EXCLUDED.re_check_out_time, attendances.re_check_out_time),
        status            = COALESCE(EXCLUDED.status, attendances.status),
        updated_at        = NOW();

    RETURN QUERY
    SELECT 'success', 200;
END;
$$;