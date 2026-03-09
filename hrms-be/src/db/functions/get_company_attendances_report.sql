DROP FUNCTION IF EXISTS get_company_attendances_report(INTEGER);

CREATE FUNCTION get_company_attendances_report(
    p_company_id INTEGER
)
RETURNS TABLE (
    id UUID,
    employee_id UUID,
    full_name VARCHAR,
    attendance_date DATE,
    check_in_time TIME,
    check_out_time TIME,
    re_check_in_time TIME,
    re_check_out_time TIME,
    status VARCHAR,
    reason TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        a.id,
        a.employee_id,
        CONCAT(e.first_name, ' ', e.last_name)::VARCHAR AS full_name,
        a.attendance_date,
        a.check_in_time,
        a.check_out_time,
        a.re_check_in_time,
        a.re_check_out_time,
        a.status,
        a.reason,
        a.created_at,
        a.updated_at
    FROM attendances a
    JOIN employees e ON a.employee_id = e.id
    WHERE a.company_id = p_company_id
    ORDER BY a.attendance_date DESC, full_name ASC;
END;
$$;