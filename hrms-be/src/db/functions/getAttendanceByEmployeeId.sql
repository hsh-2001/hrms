DROP FUNCTION IF EXISTS get_attendance_by_employee_id(p_employee_id UUID);

CREATE FUNCTION get_attendance_by_employee_id(p_employee_id UUID)
RETURNS TABLE (
    id UUID,
    company_id INT,
    attendance_date DATE,
    check_in_time TIME,
    check_out_time TIME,
    re_check_in_time TIME,
    re_check_out_time TIME,
    status VARCHAR
)
LANGUAGE sql
AS $$
    SELECT
        id,
        company_id,
        attendance_date,
        check_in_time,
        check_out_time,
        re_check_in_time,
        re_check_out_time,
        status
    FROM attendances
    WHERE employee_id = p_employee_id;
$$;
