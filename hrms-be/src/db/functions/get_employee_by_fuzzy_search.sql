DROP FUNCTION IF EXISTS get_employee_by_fuzzy_search(
    p_company_id INT,
    search VARCHAR(255)
);

CREATE FUNCTION get_employee_by_fuzzy_search(
    p_company_id INT,
    search VARCHAR(255)
)
RETURNS TABLE (
    id UUID,
    user_id UUID,
    first_name VARCHAR,
    last_name VARCHAR,
    "position" VARCHAR,
    department VARCHAR,
    date_of_joining DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.id AS id,
        e.user_id,
        e.first_name AS first_name,
        e.last_name AS last_name,
        e.position AS "position",
        e.department AS department,
        e.date_of_joining AS date_of_joining
    FROM
        employees e
    WHERE   e.company_id = p_company_id
        AND (e.first_name ILIKE '%' || search || '%' OR e.last_name ILIKE '%' || search || '%')
    ORDER BY
        e.first_name, e.last_name
    LIMIT 10;
END;
$$;