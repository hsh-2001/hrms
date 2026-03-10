DROP FUNCTION IF EXISTS get_all_employees_payroll_components(INT);

CREATE FUNCTION get_all_employees_payroll_components(p_company_id INT)
RETURNS TABLE (
    employee_id UUID,
    employee_name VARCHAR(255),
    component_id INT,
    component_name VARCHAR(255),
    value NUMERIC(12, 2)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.id AS employee_id,
        CONCAT(e.first_name, ' ', e.last_name)::VARCHAR(255) AS employee_name,
        pc.id AS component_id,
        pc.name AS component_name,
        epc.value
    FROM
        employees e
    JOIN
    employee_payroll_components epc ON e.id = epc.employee_id
    JOIN
        payroll_components pc ON epc.component_id = pc.id
    WHERE
        e.company_id = p_company_id;
END;
$$;