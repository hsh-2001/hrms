DROP FUNCTION IF EXISTS upsert_role(INT, INT, VARCHAR, TEXT);

CREATE OR REPLACE FUNCTION upsert_role(
    p_company_id INT,
    p_role_id INT,
    p_name VARCHAR,
    p_description TEXT
)
RETURNS TABLE (
    status_code INT,
    message TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    CASE
        WHEN EXISTS (SELECT 1 FROM roles WHERE id = p_role_id AND company_id = p_company_id) THEN
            UPDATE roles
            SET name = p_name,
                description = p_description,
                updated_at = NOW()
            WHERE id = p_role_id AND company_id = p_company_id;
        ELSE
             INSERT INTO roles (company_id, name, description)
             VALUES (p_company_id, p_name, p_description);
    END CASE;

    RETURN QUERY SELECT 200, 'Role updated successfully';

EXCEPTION
    WHEN OTHERS THEN
        RETURN QUERY SELECT 500, 'An error occurred: ' || SQLERRM;
END;
$$;