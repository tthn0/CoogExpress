CREATE VIEW receipt_view AS
SELECT
    p.id AS product_id,
    p.sku,
    p.upc,
    p.price,
    p.name,
    p.description,
    p.category,
    p.width,
    p.length,
    p.height,
    p.weight,
    p.image,
    p.deleted,

    r.amount_bought,
    r.timestamp,
    r.notes,

    p.price * r.amount_bought AS subtotal,
    ROUND(.0825 * p.price * r.amount_bought, 2) AS tax,
    ROUND(1.0825 * p.price * r.amount_bought, 2) AS total,

    c.customer_id,
    c.first_name,
    c.last_name,
    c.profile_picture,

    b.id AS branch_id,
    b.name AS branch_name
FROM
    receipt r
    JOIN product p ON r.product_id = p.id
    JOIN customer_view c ON r.customer_id = c.customer_id
    JOIN branch b ON r.branch_id = b.id;