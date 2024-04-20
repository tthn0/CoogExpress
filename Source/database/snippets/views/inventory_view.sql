CREATE VIEW `inventory_view` 
AS SELECT 
	I.id AS inventory_id,
    B.id AS branch_id, 
    B.name AS branch_name, 
    P.name AS product_name, 
    p.image AS product_image,
    I.product_id AS product_id, 
    I.quantity_in_stock, 
    I.stock_alert_threshold, 
    I.last_stock_update, 
    P.deleted AS product_deleted
FROM inventory I, branch B, product P
WHERE B.id = I.branch_id AND P.id = I.product_id