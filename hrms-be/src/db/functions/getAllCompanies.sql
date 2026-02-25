DROP FUNCTION IF EXISTS get_all_companies();

CREATE FUNCTION get_all_companies()
RETURNS TABLE (
    id INTEGER,
    name VARCHAR,
    login_name VARCHAR,
    email VARCHAR,
    phone VARCHAR,
    total_users INTEGER,
    total_employees INTEGER,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
LANGUAGE sql
AS $$
    SELECT 
        c.id,
        c.name,
        u.username AS login_name,
        c.email,
        c.phone,
        COUNT(u.id) AS total_users,
        COUNT(e.id) AS total_employees,
        c.created_at,
        c.updated_at
    FROM companies c
    LEFT JOIN users u ON c.id = u.company_id
    LEFT JOIN employees e ON c.id = e.company_id
    GROUP BY 
        c.id,
        c.name,
        u.username,
        c.email,
        c.phone,
        c.created_at,
        c.updated_at
    HAVING COUNT(u.id) > 0
    ORDER BY c.created_at DESC;
$$;