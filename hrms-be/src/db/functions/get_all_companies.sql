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
    address TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
LANGUAGE sql
AS $$
    SELECT 
        c.id,
        c.name,
        (SELECT u.username FROM users u WHERE u.company_id = c.id ORDER BY u.created_at LIMIT 1) AS login_name,
        c.email,
        c.phone,
        COUNT(CASE WHEN u.id != (SELECT u2.id FROM users u2 WHERE u2.company_id = c.id ORDER BY u2.created_at LIMIT 1) THEN u.id END) AS total_users,
        COUNT(e.id) AS total_employees,
        c.address,
        c.created_at,
        c.updated_at
    FROM companies c
    LEFT JOIN users u ON c.id = u.company_id
    LEFT JOIN employees e ON c.id = e.company_id
    GROUP BY 
        c.id,
        c.name,
        c.email,
        c.phone,
        c.address,
        c.created_at,
        c.updated_at
    ORDER BY c.created_at DESC;
$$;