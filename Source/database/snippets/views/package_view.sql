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
    p.destination_address_id = a.id
ORDER BY p.id;