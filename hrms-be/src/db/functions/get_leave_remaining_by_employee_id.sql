DROP FUNCTION IF EXISTS get_leave_remaining_by_employee_id(
    INT,
    UUID
);
CREATE FUNCTION get_leave_remaining_by_employee_id(
    p_company_id INT,
    p_employee_id UUID
)
RETURNS TABLE (
    id UUID,
    name VARCHAR,
    description TEXT,
    used_days NUMERIC(5,2)
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        lt.id,
        lt.name,
        COALESCE(lt.description, '')::TEXT AS description,
        COALESCE(SUM(lr.total_days), 0)::NUMERIC(5,2) AS used_days
    FROM leave_types lt
    LEFT JOIN leave_requests lr ON lt.id = lr.leave_type_id
    WHERE
    lr.company_id = p_company_id
    AND lr.employee_id = p_employee_id
    AND lr.status IN ('approved', 'pending')
    GROUP BY lt.id, lt.name, lt.description;
END;
$$ LANGUAGE plpgsql;