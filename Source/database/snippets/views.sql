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
    p.speed,

    sender.first_name AS sender_first_name,
    sender.last_name AS sender_last_name,
    sender.username AS sender_username,
    sender.email AS sender_email,
    sender.phone_number AS sender_phone_number,
    sender.phone_country_code AS sender_phone_country_code,
    sender.profile_picture AS sender_profile_picture,

    receiver.first_name AS receiver_first_name,
    receiver.last_name AS receiver_last_name,
    receiver.username AS receiver_username,
    receiver.email AS receiver_email,
    receiver.phone_number AS receiver_phone_number,
    receiver.phone_country_code AS receiver_phone_country_code,
    receiver.profile_picture AS receiver_profile_picture,

    b.name AS source_branch_name,

    a.line1 AS destination_address_line1,
    a.line2 AS destination_address_line2,
    a.city AS destination_address_city,
    a.state AS destination_address_state,
    a.zip AS destination_address_zip,

    (SELECT status
    FROM tracking_history AS th
    WHERE th.package_id = p.id
    ORDER BY th.timestamp DESC
    LIMIT 1) AS status,

    (SELECT timestamp
    FROM tracking_history AS th
    WHERE th.package_id = p.id
    ORDER BY th.timestamp ASC
    LIMIT 1) AS initiated_at,

    (SELECT timestamp
    FROM tracking_history AS th
    WHERE th.package_id = p.id AND th.status = 'Delivered'
    ORDER BY th.timestamp DESC
    LIMIT 1) AS delivered_at
FROM
    package AS p,
    customer_view AS sender,
    customer_view AS receiver,
    branch AS b,
    address AS a
WHERE
    p.sender_customer_id = sender.customer_id AND
    p.receiver_customer_id = receiver.customer_id AND
    p.source_branch_id = b.id AND
    p.destination_address_id = a.id;