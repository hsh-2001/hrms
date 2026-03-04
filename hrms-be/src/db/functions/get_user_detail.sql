DROP FUNCTION IF EXISTS get_user_detail(p_user_id UUID);

CREATE FUNCTION get_user_detail(p_user_id UUID)
RETURNS TABLE (
    id UUID,
    employee_id UUID,
    username VARCHAR,
    email VARCHAR,
    phone VARCHAR,
    role VARCHAR,
    is_active BOOLEAN,
    email_verified BOOLEAN,
    company_id INTEGER,
    company_name VARCHAR,
    permissions JSONB,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id,
        e.id AS employee_id,
        u.username,
        u.email,
        u.phone,
        r.name AS role,
        u.is_active,
        u.email_verified,
        u.company_id,
        c.name AS company_name,
        get_permission_by_role_id(u.role_id, u.company_id) AS permissions,
        u.created_at,
        u.updated_at
    FROM users u
    LEFT JOIN companies c ON u.company_id = c.id
    LEFT JOIN employees e ON u.id = e.user_id
    LEFT JOIN roles r ON u.role_id = r.id
    WHERE u.id = p_user_id
      AND u.deleted_at IS NULL;
END;
$$ LANGUAGE plpgsql;