CREATE VIEW `inventory_view` AS
SELECT B.id AS branch_id, B.name AS branch_name, P.name AS product_name, I.product_id AS product_id, I.quantity_in_stock, I.stock_alert_threshold, I.last_stock_update, P.deleted AS product_deleted
FROM inventory I
JOIN branch B ON B.id = I.branch_id
JOIN products P ON P.id = I.product_id

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `wizard`@`%` 
    SQL SECURITY DEFINER
VIEW `inventory_view` AS
    SELECT 
        `b`.`id` AS `branch_id`,
        `b`.`name` AS `branch_name`,
        `p`.`name` AS `product_name`,
        `i`.`product_id` AS `product_id`,
        `i`.`quantity_in_stock` AS `quantity_in_stock`,
        `i`.`stock_alert_threshold` AS `stock_alert_threshold`,
        `i`.`last_stock_update` AS `last_stock_update`,
        `p`.`deleted` AS `product_deleted`
    FROM
        ((`inventory` `i`
        JOIN `branch` `b` ON ((`b`.`id` = `i`.`branch_id`)))
        JOIN `product` `p` ON ((`p`.`id` = `i`.`product_id`)))