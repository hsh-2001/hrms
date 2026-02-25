DROP FUNCTION IF EXISTS get_all_positions(p_company_id INTEGER);

CREATE FUNCTION get_all_positions(p_company_id INTEGER)
RETURNS TABLE (
    id INTEGER,
    company_id INTEGER,
    department_id INTEGER,
    title VARCHAR(150),
    code VARCHAR(50),
    description TEXT,
    is_active BOOLEAN,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
LANGUAGE sql
AS $$
    SELECT 
        id,
        company_id,
        department_id,
        title,
        code,
        description,
        is_active,
        created_at,
        updated_at
    FROM positions
    WHERE company_id = p_company_id

    UNION ALL
    SELECT 
        id,
        company_id,
        department_id,
        title,
        code,
        description,
        is_active,
        created_at,
        updated_at
    FROM positions p
    WHERE p.company_id = 0
      AND NOT EXISTS (
          SELECT 1 FROM positions p2 
          WHERE p2.company_id = p_company_id 
            AND p2.title = p.title
      )
    ORDER BY created_at DESC;
$$;
