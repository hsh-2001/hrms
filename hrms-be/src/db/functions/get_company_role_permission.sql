DROP FUNCTION IF EXISTS get_company_role_permission(INT);

CREATE OR REPLACE FUNCTION get_company_role_permission(p_company_id INT)
RETURNS TABLE (
    role_id INT,
    role_name VARCHAR,
    description TEXT,
    is_default BOOLEAN,
    permissions JSONB
)
LANGUAGE sql
AS $$
SELECT
    r.id AS role_id,
    r.name AS role_name,
    r.description AS description,
    r.is_default,
    COALESCE(perms.permissions, '[]'::jsonb) AS permissions
FROM roles r
LEFT JOIN LATERAL (
    SELECT jsonb_agg(
        jsonb_build_object(
            'page_id', pg.id,
            'page', pg.name,
            'page_key', pg.key,
            'action', COALESCE(rp.action, rp_default.action),
            'available', pg.available
        )
        ORDER BY pg.id
    ) AS permissions
    FROM pages pg

    LEFT JOIN role_permissions rp
        ON rp.page_id = pg.id
        AND rp.role_id = r.id
        AND rp.company_id = p_company_id

    LEFT JOIN role_permissions rp_default
        ON rp_default.page_id = pg.id
        AND rp_default.role_id = r.id
        AND rp_default.company_id = 0

) perms ON TRUE

WHERE r.company_id IN (p_company_id, 0)
ORDER BY r.id;
$$;