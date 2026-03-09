DROP FUNCTION IF EXISTS get_payroll_components(INT);
CREATE FUNCTION get_payroll_components(p_company_id INT)
RETURNS TABLE (
    id INT,
    name VARCHAR(100),
    description TEXT,
    component_type VARCHAR(50),
    calculation_type VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT pc.id, pc.name, pc.description, pc.component_type, pc.calculation_type
    FROM payroll_components pc
    WHERE pc.company_id = p_company_id
    ORDER BY pc.created_at DESC;
END;
$$;