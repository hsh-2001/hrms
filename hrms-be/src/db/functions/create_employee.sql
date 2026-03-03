DROP FUNCTION IF EXISTS create_employee(
    VARCHAR,
    VARCHAR,
    VARCHAR,
    TEXT,
    VARCHAR,
    VARCHAR
);

CREATE FUNCTION create_employee(
    p_first_name VARCHAR,
    p_last_name VARCHAR,
    username VARCHAR,
    password_hash TEXT,
    p_email VARCHAR,
    p_phone VARCHAR
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    new_user_id UUID;
BEGIN
    INSERT INTO users (username, email, phone, password_hash, role, company_id)
    VALUES (username, p_email, p_phone, password_hash, 'employee', 0)
    RETURNING id INTO new_user_id;

    INSERT INTO employees (user_id, first_name, last_name, company_id)
    VALUES (new_user_id, p_first_name, p_last_name, 0);
    RETURN;

    EXCEPTION
        WHEN unique_violation THEN
            RAISE EXCEPTION 'Username, email, or phone already exists for this company.';
        WHEN OTHERS THEN
            RAISE EXCEPTION 'An error occurred while creating the employee: %', SQLERRM;
END;
$$;