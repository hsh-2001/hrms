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
                SELECT rp.page_id as id, pg.name, pg.key, rp.action, pg.available
                FROM role_permissions rp
                INNER JOIN pages pg ON rp.page_id = pg.id
                WHERE rp.role_id = p_role_id AND rp.company_id = p_company_id
                UNION ALL
                SELECT rp2.page_id as id, pg.name, pg.key, rp2.action, pg.available
                FROM role_permissions rp2
                INNER JOIN pages pg ON rp2.page_id = pg.id
                WHERE rp2.role_id = p_role_id AND rp2.company_id = 0 AND NOT EXISTS (
                    SELECT 1 FROM role_permissions rp3
                    WHERE rp3.page_id = pg.id AND rp3.role_id = p_role_id AND rp3.company_id = p_company_id
                )

            ) rp
        ),
        '[]'::jsonb
    ) INTO permissions;
    RETURN permissions;
END;
$$;
