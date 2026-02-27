DROP FUNCTION IF EXISTS get_today_employee_attendance(p_employee_id UUID);

CREATE FUNCTION get_today_employee_attendance(p_employee_id UUID)
RETURNS TABLE (
    attendance_date DATE,
    check_in_time TIME,
    check_out_time TIME,
    re_check_in_time TIME,
    re_check_out_time TIME,
    total_work_hours TEXT,
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
        CONCAT(
            FLOOR(EXTRACT(EPOCH FROM (COALESCE(re_check_out_time, check_out_time) - check_in_time)) / 3600)::INTEGER,
            ':',
            LPAD(FLOOR((EXTRACT(EPOCH FROM (COALESCE(re_check_out_time, check_out_time) - check_in_time)) % 3600) / 60)::INTEGER::TEXT, 2, '0')
        ) AS total_work_hours,
        status
    FROM attendances
    WHERE employee_id = p_employee_id
      AND attendance_date = CURRENT_DATE;
$$;