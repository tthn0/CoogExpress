CREATE VIEW customer_view
AS SELECT
    u.id AS user_id, u.first_name, u.last_name, u.username, u.email, u.password_hash, u.phone_number, u.phone_country_code, u.profile_picture, u.created_at, u.last_login, u.deleted,
    c.id AS customer_id, c.preferred_branch_id, c.preferred_communication_method,
    a.id AS address_id, a.line1, a.line2, a.city, a.state, a.zip
FROM user AS u, address AS a, customer AS c
WHERE u.id = c.user_id AND u.address_id = a.id;