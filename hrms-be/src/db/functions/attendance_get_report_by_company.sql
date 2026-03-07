DROP FUNCTION IF EXISTS attendance_get_report_by_company(p_company_id INT);

CREATE FUNCTION attendance_get_report_by_company(p_company_id INT)
RETURNS TABLE (
    employee_id UUID,
    check_in_time TIME,
    check_out_time TIME,
    re_check_in_time TIME,
    re_check_out_time TIME,
    first_name VARCHAR,
    last_name VARCHAR,
    attendance_date DATE,
    status VARCHAR,
    reason TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.id,
        a.check_in_time,
        a.check_out_time,
        a.re_check_in_time,
        a.re_check_out_time,
        e.first_name,
        e.last_name,
        a.attendance_date,
        a.status,
        a.reason
    FROM
        attendances a
    JOIN
        employees e ON a.employee_id = e.id
    WHERE
        a.company_id = p_company_id
    ORDER BY
        a.attendance_date DESC;
END;
$$;