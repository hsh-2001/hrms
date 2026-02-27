CREATE OR REPLACE FUNCTION get_company_overview(
    p_company_id INT
)
RETURNS TABLE (
    total_employees INT,
    total_departments INT,
    total_positions INT
)
LANGUAGE sql
STABLE
AS $$
    SELECT
        (SELECT COUNT(*) FROM employees   WHERE company_id = p_company_id),
        (SELECT COUNT(*) FROM departments WHERE company_id IN (p_company_id, 0)),
        (SELECT COUNT(*) FROM positions   WHERE company_id IN (p_company_id, 0));
$$;