DROP FUNCTION IF EXISTS get_company_leave_requests(p_company_id INT);

CREATE FUNCTION get_company_leave_requests(p_company_id INT)
RETURNS TABLE (
    id UUID,
    employee_name VARCHAR(255),
    employee_id UUID,
    leave_type_id UUID,
    leave_type_name VARCHAR(255),
    company_id INT,
    start_date DATE,
    end_date DATE,
    total_days NUMERIC(5,2),
    reason TEXT,
    status VARCHAR(20),
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT lr.id, CONCAT(e.first_name, ' ', e.last_name)::VARCHAR AS employee_name, lr.employee_id, lr.leave_type_id, lt.name AS leave_type_name, lr.company_id, lr.start_date, lr.end_date, lr.total_days, lr.reason, lr.status, lr.created_at, lr.updated_at
    FROM leave_requests lr
    JOIN leave_types lt ON lr.leave_type_id = lt.id
    JOIN employees e ON lr.employee_id = e.id
    WHERE lr.company_id = p_company_id
    ORDER BY lr.created_at DESC;
END;
$$;