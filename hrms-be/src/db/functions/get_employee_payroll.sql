DROP FUNCTION IF EXISTS get_employee_payroll(UUID);

CREATE FUNCTION get_employee_payroll(
    p_employee_id UUID
)
RETURNS TABLE (
    salary DECIMAL(10, 2),
    payment_type VARCHAR(50),
    currency VARCHAR(10),
    effective_date DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT salary, payment_type, currency, effective_date
    FROM employee_salary
    WHERE employee_id = p_employee_id
    ORDER BY effective_date DESC;
END;
$$;