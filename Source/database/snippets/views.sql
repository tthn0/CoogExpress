CREATE VIEW customer_view
AS SELECT
    u.id AS user_id, u.first_name, u.last_name, u.username, u.email, u.password_hash, u.phone_number, u.phone_country_code, u.profile_picture, u.created_at, u.last_login, u.deleted,
    c.id AS customer_id, c.preferred_branch_id, c.preferred_communication_method,
    a.id AS address_id, a.line1, a.line2, a.city, a.state, a.zip
FROM user AS u, address AS a, customer AS c
WHERE u.id = c.user_id AND u.address_id = a.id;

CREATE VIEW employee_view
AS SELECT
    u.id AS user_id, u.first_name, u.last_name, u.username, u.email, u.password_hash, u.phone_number, u.phone_country_code, u.profile_picture, u.created_at, u.last_login, u.deleted,
    e.id AS employee_id, e.branch_id, e.supervisor_employee_id, e.date_of_birth, e.gender, e.driver_license_number, e.role, e.shirt_size,
    a.id AS address_id, a.line1, a.line2, a.city, a.state, a.zip
FROM user AS u, address AS a, employee AS e
WHERE u.id = e.user_id AND u.address_id = a.id;

CREATE VIEW package_view
AS SELECT
    p.id AS package_id,
    p.sender_customer_id,
    p.receiver_customer_id,
    p.source_branch_id,
    p.destination_address_id,
    p.type,
    p.width,
    p.length,
    p.height,
    p.weight,
    p.special_handling_instructions,
    p.delivery_instructions,
    p.base_shipping_cost,
    p.additional_fees,

    sender.first_name AS sender_first_name,
    sender.last_name AS sender_last_name,
    sender.username AS sender_username,
    sender.email AS sender_email,
    sender.phone_number AS sender_phone_number,
    sender.phone_country_code AS sender_phone_country_code,
    sender.profile_picture AS sender_profile_picture,

    recipient.first_name AS recipient_first_name,
    recipient.last_name AS recipient_last_name,
    recipient.username AS recipient_username,
    recipient.email AS recipient_email,
    recipient.phone_number AS recipient_phone_number,
    recipient.phone_country_code AS recipient_phone_country_code,
    recipient.profile_picture AS recipient_profile_picture,

    b.name AS source_branch_name,

    a.line1 AS destination_address_line1,
    a.line2 AS destination_address_line2,
    a.city AS destination_address_city,
    a.state AS destination_address_state,
    a.zip AS destination_address_zip

FROM package AS p, customer_view AS sender, customer_view AS recipient, branch AS b, address AS a
WHERE
    p.sender_customer_id = sender.customer_id AND
    p.receiver_customer_id = recipient.customer_id AND
    p.source_branch_id = b.id AND
    p.destination_address_id = a.id;