DROP FUNCTION IF EXISTS get_payroll_reports(
    INT,
    DATE,
    DATE,
    BOOLEAN
);

CREATE FUNCTION get_payroll_reports(
    p_company_id INT,
    p_start_date DATE,
    p_end_date DATE,
    p_is_get_all BOOLEAN DEFAULT TRUE
)
RETURNS TABLE (
    employee_id UUID,
    full_name TEXT,
    salary DECIMAL(10, 2),
    payment_type VARCHAR(50),
    currency VARCHAR(10),
    effective_date DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF p_is_get_all THEN
        RETURN QUERY
        SELECT
            es.employee_id,
            CONCAT(e.first_name, ' ', e.last_name) AS full_name,
            es.salary,
            es.payment_type,
            es.currency,
            es.effective_date
        FROM employee_salary es
        JOIN employees e ON es.employee_id = e.id
        WHERE es.company_id = p_company_id
          AND es.effective_date BETWEEN p_start_date AND p_end_date
        ORDER BY es.effective_date DESC;
    ELSE
        RETURN QUERY
        SELECT
            es.employee_id,
            CONCAT(e.first_name, ' ', e.last_name) AS full_name,
            es.salary,
            es.payment_type,
            es.currency,
            es.effective_date
        FROM employee_salary es
        JOIN employees e ON es.employee_id = e.id
        WHERE es.company_id = p_company_id
          AND es.effective_date BETWEEN p_start_date AND p_end_date
          AND es.effective_date <= CURRENT_DATE
        ORDER BY es.effective_date DESC;
    END IF;
END;
$$;
