CREATE VIEW customer_view
AS SELECT
    u.id AS user_id, u.first_name, u.last_name, u.email, u.password_hash, u.phone_number, u.phone_country_code, u.profile_picture, u.created_at, u.last_login, u.deleted,
    c.id AS customer_id, c.preferred_branch_id, c.preferred_communication_method,
    a.id AS address_id, a.line1, a.line2, a.city, a.state, a.zip
FROM user AS u, address AS a, customer AS c
WHERE u.id = c.user_id AND u.address_id = a.id;

CREATE VIEW employee_view
AS SELECT
    u.id AS user_id, u.first_name, u.last_name, u.email, u.password_hash, u.phone_number, u.phone_country_code, u.profile_picture, u.created_at, u.last_login, u.deleted,
    e.id AS employee_id, e.branch_id, e.supervisor_employee_id, e.date_of_birth, e.gender, e.driver_license_number, e.role, e.shirt_size,
    a.id AS address_id, a.line1, a.line2, a.city, a.state, a.zip
FROM user AS u, address AS a, employee AS e
WHERE u.id = e.user_id AND u.address_id = a.id;