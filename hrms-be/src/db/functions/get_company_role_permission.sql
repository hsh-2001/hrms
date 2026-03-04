DROP FUNCTION IF EXISTS get_company_role_permission(INT);

CREATE OR REPLACE FUNCTION get_company_role_permission(p_company_id INT)
RETURNS TABLE (
    role_id INT,
    role_name VARCHAR,
    permissions JSONB
)
LANGUAGE sql
AS $$
    SELECT
        r.id,
        r.name,
        COALESCE(
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
                    WHERE rp.role_id = r.id AND rp.company_id = p_company_id
                    
                    UNION ALL
                    
                    SELECT pg.id, pg.name, pg.key, pg.action, pg.available
                    FROM pages pg
                    WHERE NOT EXISTS (
                        SELECT 1 FROM role_permissions rp
                        WHERE rp.page_id = pg.id AND rp.role_id = r.id AND rp.company_id = p_company_id
                    )
                ) pg
            ),
            '[]'::jsonb
        )
    FROM roles r
    WHERE r.company_id IN (p_company_id, 0)
    GROUP BY r.id, r.name;
$$;