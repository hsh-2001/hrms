DROP FUNCTION IF EXISTS get_permission_by_role_id(INT, INT);

CREATE OR REPLACE FUNCTION get_permission_by_role_id(p_role_id INT, p_company_id INT)
RETURNS JSONB

LANGUAGE plpgsql
AS $$
DECLARE
    permissions JSONB;
BEGIN
    SELECT COALESCE(
        (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'page_id', id,
                    'page', name,
                    'page_key', key, 
                    'action', action,
                    'available', available
                )
                ORDER BY id
            )
            FROM (
                SELECT pg.id, pg.name, pg.key, rp.action, pg.available
                FROM pages pg
                INNER JOIN role_permissions rp ON rp.page_id = pg.id
                WHERE rp.role_id = p_role_id AND rp.company_id = p_company_id
                UNION ALL
                SELECT pg.id, pg.name, pg.key, pg.action, pg.available
                FROM pages pg
                WHERE NOT EXISTS (
                    SELECT 1 FROM role_permissions rp
                    WHERE rp.page_id = pg.id AND rp.role_id = p_role_id AND rp.company_id = p_company_id
                )
            ) pg
        ),
        '[]'::jsonb
    ) INTO permissions;
    RETURN permissions;
END;
$$;
