DROP FUNCTION IF EXISTS update_role_permissions(
    INTEGER,
    INTEGER,
    INTEGER[],
    INTEGER[]
);
CREATE OR REPLACE FUNCTION update_role_permissions(
    p_company_id INTEGER,
    p_role_id INTEGER,
    p_page_ids INTEGER[],
    p_actions INTEGER[]
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check same length
    IF array_length(p_page_ids, 1) <> array_length(p_actions, 1) THEN
        RAISE EXCEPTION 'page_ids and actions length mismatch';
    END IF;

    INSERT INTO role_permissions (
        company_id,
        role_id,
        page_id,
        action,
        updated_at
    )
    SELECT
        p_company_id,
        p_role_id,
        p.page_id,
        a.action,
        NOW()
    FROM unnest(p_page_ids) WITH ORDINALITY AS p(page_id, idx)
    JOIN unnest(p_actions) WITH ORDINALITY AS a(action, idx2)
        ON idx = idx2

    ON CONFLICT (company_id, role_id, page_id)
    DO UPDATE
    SET
        action = EXCLUDED.action,
        updated_at = NOW();
END;
$$;