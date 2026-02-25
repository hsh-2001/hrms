DROP FUNCTION IF EXISTS get_today_employee_attendance(p_employee_id UUID);

CREATE FUNCTION get_today_employee_attendance(p_employee_id UUID)
RETURNS TABLE (
    attendance_date DATE,
    check_in_time TIME,
    check_out_time TIME,
    re_check_in_time TIME,
    re_check_out_time TIME,
    status VARCHAR(20)
)
LANGUAGE sql
AS $$
    SELECT 
        attendance_date,
        check_in_time,
        check_out_time,
        re_check_in_time,
        re_check_out_time,
        status
    FROM attendances
    WHERE employee_id = p_employee_id
      AND attendance_date = CURRENT_DATE;
$$;