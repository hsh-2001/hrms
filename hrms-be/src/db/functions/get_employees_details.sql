DROP FUNCTION IF EXISTS get_employees_details(INT, INT, INT);

CREATE OR REPLACE FUNCTION get_employees_details(
    p_company_id INT,
    p_limit INT DEFAULT 100,
    p_offset INT DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    username VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR,
    "position" VARCHAR,
    department VARCHAR,
    date_of_joining DATE,
    email VARCHAR,
    phone VARCHAR,
    "role" VARCHAR,
    is_active BOOLEAN,
    email_verified BOOLEAN,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    "limit" INT,
    "page" INT,
    total_pages INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.id,
        u.username,
        e.first_name,
        e.last_name,
        e."position",
        e.department,
        e.date_of_joining,
        u.email,
        u.phone,
        u."role",
        u.is_active,
        u.email_verified,
        e.created_at,
        e.updated_at,
        p_limit AS "limit",
        (p_offset / NULLIF(p_limit, 0)) + 1 AS "page",
        CEIL((SELECT COUNT(1)::NUMERIC FROM employees WHERE company_id = p_company_id) / NULLIF(p_limit, 0))::INT AS total_pages
    FROM employees e
    LEFT JOIN users u ON e.user_id = u.id
    WHERE e.company_id = p_company_id
    LIMIT p_limit OFFSET p_offset;
END;
$$; 