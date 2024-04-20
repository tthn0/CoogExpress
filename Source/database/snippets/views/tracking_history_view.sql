CREATE VIEW tracking_history_view
AS SELECT
    t.id AS tracking_history_id,
    t.package_id,
    t.timestamp,
    t.status,
    a.id AS address_id,
    a.line1,
    a.line2,
    a.city,
    a.state,
    a.zip
FROM tracking_history AS t, address AS a
WHERE t.address_id = a.id
ORDER BY timestamp DESC;