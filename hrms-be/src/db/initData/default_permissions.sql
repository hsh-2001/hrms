-- Root account
WITH
    default_permissions (company_id, role_id, page_id, action) AS (
        VALUES
            (0, 1, 1, 1),
            (0, 1, 2, 15),
            (0, 1, 19, 15)
    )
INSERT INTO
    role_permissions (company_id, role_id, page_id, action)
SELECT
    0,
    1,
    page_id,
    action
FROM
    default_permissions ON CONFLICT (company_id, role_id, page_id) DO NOTHING;

-- Company account
WITH
    default_permissions (page_id, action) AS (
        VALUES
            (1, 1),
            (2, 0),
            (3, 15),
            (4, 15),
            (5, 15),
            (6, 1),
            (7, 1),
            (8, 0),
            (9, 15),
            (10, 1),
            (11, 15),
            (12, 15),
            (13, 1),
            (14, 1),
            (15, 1),
            (16, 1),
            (17, 15),
            (18, 15),
            (19, 15),
            (20, 15)
    )
INSERT INTO
    role_permissions (company_id, role_id, page_id, action)
SELECT
    0,
    2,
    page_id,
    action
FROM
    default_permissions ON CONFLICT (company_id, role_id, page_id) DO UPDATE SET
    action = EXCLUDED.action;