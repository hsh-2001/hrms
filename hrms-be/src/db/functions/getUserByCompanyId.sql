DROP FUNCTION IF EXISTS get_user_by_company_id(p_company_id INTEGER);

CREATE FUNCTION get_user_by_company_id(p_company_id INTEGER)
RETURNS TABLE (
    id UUID,
    username VARCHAR,
    email VARCHAR,
    phone VARCHAR,
    role VARCHAR,
    role_id INTEGER,
    is_active BOOLEAN,
    email_verified BOOLEAN,
    company_id INTEGER,
    company_name VARCHAR,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id,
        u.username,
        u.email,
        u.phone,
        r.name AS role,
        u.role_id,
        u.is_active,
        u.email_verified,
        u.company_id,
        c.name AS company_name,
        u.created_at,
        u.updated_at
    FROM users u
    JOIN companies c ON u.company_id = c.id
    LEFT JOIN roles r ON u.role_id = r.id
    WHERE u.company_id = p_company_id
      AND u.deleted_at IS NULL;
END;
$$ LANGUAGE plpgsql;