DROP FUNCTION IF EXISTS get_all_departments(p_company_id INTEGER);

CREATE FUNCTION get_all_departments(p_company_id INTEGER)
RETURNS TABLE (
    id INTEGER,
    name VARCHAR,
    code VARCHAR,
    description TEXT,
    company_id INTEGER,
    manager_id UUID,
    is_active BOOLEAN,
    is_default BOOLEAN,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
) 
LANGUAGE sql
AS $$
    SELECT 
        id,
        name,
        code,
        description,
        company_id,
        manager_id,
        is_active,
        is_default,
        created_at,
        updated_at
    FROM departments
    WHERE company_id = p_company_id
    
    UNION ALL
    
    SELECT 
        id,
        name,
        code,
        description,
        company_id,
        manager_id,
        is_active,
        is_default,
        created_at,
        updated_at
    FROM departments d
    WHERE d.company_id = 0
      AND NOT EXISTS (
          SELECT 1 FROM departments d2 
          WHERE d2.company_id = p_company_id 
            AND d2.name = d.name
      )
    ORDER BY created_at DESC;
$$;
