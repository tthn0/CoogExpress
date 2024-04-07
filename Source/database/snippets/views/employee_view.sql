CREATE VIEW employee_view
AS SELECT
    u.id AS user_id, u.first_name, u.last_name, u.username, u.email, u.password_hash, u.phone_number, u.phone_country_code, u.profile_picture, u.created_at, u.last_login, u.deleted,
    e.id AS employee_id, e.supervisor_employee_id, e.date_of_birth, e.gender, e.driver_license_number, e.role, e.shirt_size,
    a.id AS address_id, a.line1, a.line2, a.city, a.state, a.zip,
    su.first_name AS supervisor_first_name, su.last_name AS supervisor_last_name, su.profile_picture AS supervisor_profile_picture,
    b.id AS branch_id, b.name AS branch_name, b.address_id AS branch_address_id
FROM user AS u, address AS a, employee AS e, employee AS s, user AS su, branch AS b
WHERE
    u.id = e.user_id AND
    u.address_id = a.id AND
    e.supervisor_employee_id = s.id AND
    s.user_id = su.id AND 
    e.branch_id = b.id;