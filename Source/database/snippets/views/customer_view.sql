-- CREATE VIEW customer_view
-- AS SELECT
--     u.id AS user_id, u.first_name, u.last_name, u.username, u.email, u.password_hash, u.phone_number, u.phone_country_code, u.profile_picture, u.created_at, u.last_login, u.deleted,
--     c.id AS customer_id, c.preferred_branch_id, c.preferred_communication_method,
--     a.id AS address_id, a.line1, a.line2, a.city, a.state, a.zip
-- FROM user AS u, address AS a, customer AS c
-- WHERE u.id = c.user_id AND u.address_id = a.id;

CREATE VIEW customer_view AS 
SELECT
    u.id AS user_id, u.first_name, u.last_name, u.username, u.email, u.password_hash, u.phone_number, u.phone_country_code, u.profile_picture, u.created_at, u.last_login, u.deleted,
    c.id AS customer_id, c.preferred_branch_id, c.preferred_communication_method,
    a.id AS address_id, a.line1, a.line2, a.city, a.state, a.zip,
    b.id AS billing_id, b.card_number, b.cvc, b.expiration_month, b.expiration_year, b.cardholder_name,
    ba.id AS billing_address_id, ba.line1 AS billing_line1, ba.line2 AS billing_line2, ba.city AS billing_city, ba.state AS billing_state, ba.zip AS billing_zip
FROM
    user AS u
    JOIN customer AS c ON u.id = c.user_id
    JOIN address AS a ON u.address_id = a.id
    LEFT JOIN billing AS b ON (b.customer_id = c.id AND b.preferred = 1)
    LEFT JOIN address AS ba ON b.address_id = ba.id;
