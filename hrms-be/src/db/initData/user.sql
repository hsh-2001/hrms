INSERT INTO users (
    username,
    email,
    phone,
    password_hash,
    role,
    is_active,
    email_verified,
    company_id
) VALUES (
    'root',
    'root@gmail.com',
    '101111111',
    '$2b$10$hapn0I4LYRAnPC8h3wfq/.H2vtmwtkipV2Rlrhvo8yd8M67nzGKR2',
    'owner',
    TRUE,
    FALSE,
    0
);