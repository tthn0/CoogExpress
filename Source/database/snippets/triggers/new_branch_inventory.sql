DELIMITER //
CREATE TRIGGER branch_inventory_trigger
AFTER INSERT ON branch
FOR EACH ROW
BEGIN
    DECLARE product_id INT;
    DECLARE done BOOLEAN DEFAULT FALSE;
    DECLARE product_cursor CURSOR FOR 
        SELECT id
        FROM product;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN product_cursor;
    product_loop: LOOP
        FETCH product_cursor INTO product_id;
        
        IF done THEN
            LEAVE product_loop;
        END IF;
        
        INSERT INTO inventory (
            branch_id, 
            product_id, 
            quantity_in_stock,
            stock_alert_threshold,
            last_stock_update,
            been_notified
        )VALUES (NEW.id, product_id, 0, 200, NOW(), 0);
    END LOOP;
    CLOSE product_cursor;
END;
//
DELIMITER ;
