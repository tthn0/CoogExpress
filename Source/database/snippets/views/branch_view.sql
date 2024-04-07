CREATE VIEW branch_view
AS SELECT
    b.id AS branch_id, b.name, b.phone_number, b.email, b.opening_time, b.closing_time,
    a.id AS address_id, a.line1, a.line2, a.city, a.state, a.zip,
        e.employee_id AS manager_employee_id,
        e.first_name AS manager_first_name,
        e.last_name AS manager_last_name,
        e.username AS manager_username,
        e.email AS manager_email,
        e.phone_number AS manager_phone_number,
        e.phone_country_code AS manager_phone_country_code,
        e.profile_picture AS manager_profile_picture
FROM branch AS b, employee_view as e, address AS a
WHERE b.address_id = a.id AND b.manager_employee_id = e.employee_id;