

DROP FUNCTION IF EXISTS check_attendance(
    p_employee_id UUID,
    p_company_id INT,
    p_attendance_date DATE,
    p_check_in_time TIME,
    p_check_out_time TIME,
    p_re_check_in_time TIME,
    p_re_check_out_time TIME,
    p_status VARCHAR(20)
);

CREATE FUNCTION check_attendance(
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
        employee_id, company_id, attendance_date, check_in_time, check_out_time, re_check_in_time, re_check_out_time, status
    )
    VALUES (
        p_employee_id, p_company_id, p_attendance_date, p_check_in_time, p_check_out_time, p_re_check_in_time, p_re_check_out_time, p_status
    )
    ON CONFLICT (employee_id, attendance_date) DO UPDATE
    SET check_in_time = EXCLUDED.check_in_time,
        check_out_time = EXCLUDED.check_out_time,
        re_check_in_time = EXCLUDED.re_check_in_time,
        re_check_out_time = EXCLUDED.re_check_out_time,
        status = EXCLUDED.status,
        updated_at = NOW();

    RETURN QUERY SELECT 'success' AS message, 200 AS status_code;
END;
$$;
