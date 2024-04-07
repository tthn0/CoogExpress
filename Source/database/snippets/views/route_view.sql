CREATE VIEW route_view
AS SELECT
    r.id AS route_id,
    r.start_timestamp,
    r.end_timestamp,

    b1.branch_id AS source_branch_id,
    b1.name AS source_branch_name,
    b1.address_id AS source_branch_address_id,
    b1.line1 AS source_branch_line1,
    b1.line2 AS source_branch_line2,
    b1.city AS source_branch_city,
    b1.state AS source_branch_state,
    b1.zip AS source_branch_zip,

    b2.branch_id AS destination_branch_id,
    b2.name AS destination_branch_name,
    b2.address_id AS destination_branch_address_id,
    b2.line1 AS destination_branch_line1,
    b2.line2 AS destination_branch_line2,
    b2.city AS destination_branch_city,
    b2.state AS destination_branch_state,
    b2.zip AS destination_branch_zip,

    driver.employee_id AS driver_employee_id,
    driver.first_name AS driver_first_name,
    driver.last_name AS driver_last_name,
    driver.profile_picture AS driver_profile_picture,

    (SELECT COUNT(*)
    FROM shipment AS s
    WHERE s.route_id = r.id) AS package_count
FROM 
    route AS r
    LEFT JOIN branch_view AS b1 ON r.source_branch_id = b1.branch_id
    LEFT JOIN branch_view AS b2 ON r.destination_branch_id = b2.branch_id
    LEFT JOIN employee_view AS driver ON r.driver_employee_id = driver.employee_id;