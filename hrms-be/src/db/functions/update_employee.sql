DROP FUNCTION IF EXISTS update_employee(UUID, VARCHAR, VARCHAR, VARCHAR, VARCHAR, DATE, VARCHAR, VARCHAR);

CREATE OR REPLACE FUNCTION update_employee(
    p_employee_id UUID,
    p_first_name VARCHAR(50),
    p_last_name VARCHAR(50),
    p_email VARCHAR(100),
    p_phone VARCHAR(20),
    p_date_of_joining DATE,
    p_position VARCHAR(100),
    p_department VARCHAR(100)
)
RETURNS TABLE (
    status_code INT,
    message TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE employees
    SET
        first_name = p_first_name,
        last_name = p_last_name,
        position = p_position,
        department = p_department,
        date_of_joining = p_date_of_joining,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_employee_id;
    RETURN QUERY SELECT 200, 'Employee updated successfully';

    EXCEPTION
        WHEN OTHERS THEN
            RETURN QUERY SELECT 500, 'Error updating employee: ' || SQLERRM;
END;
$$;