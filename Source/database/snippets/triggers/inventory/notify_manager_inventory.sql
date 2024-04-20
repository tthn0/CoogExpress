DELIMITER //

CREATE TRIGGER notify_manager_inventory
BEFORE UPDATE ON inventory
FOR EACH ROW
BEGIN
    DECLARE product_name VARCHAR(63);
    DECLARE branch_name VARCHAR(63);
    DECLARE manager_email VARCHAR(255);
    DECLARE manager_name VARCHAR(63);
    DECLARE email_subject VARCHAR(255);
    DECLARE email_body VARCHAR(1000);
    
    SELECT P.name, U.email, U.first_name, B.name
    INTO product_name, manager_email, manager_name, branch_name
    FROM inventory I, product P, branch B, user U, employee E
    WHERE 
        I.product_id = P.id AND
        I.branch_id = B.id AND
        B.manager_employee_id = E.id AND
        E.user_id = U.id AND
        I.id = NEW.id;
        
    IF manager_name IS NULL THEN
        SIGNAL SQLSTATE '01000' SET MESSAGE_TEXT = 'WARNING MESSAGE: manager_name is NULL';
    END IF;
    
    IF NEW.quantity_in_stock <= NEW.stock_alert_threshold AND OLD.been_notified = FALSE THEN
        SET NEW.been_notified = TRUE;
        
        SET email_subject = CONCAT('CoogExpress Management: Inventory Alert at ', branch_name);
        SET email_body = CONCAT(
            'Dear ', manager_name, ',',
            
            '\n\n',

            'The inventory for "', product_name, '" has reached the threshold amount at your branch.',

            ' ',

            'Please order new inventory and restock as soon as possible.'
            
            '\n\n'
            
            'Threshold Amount: ', NEW.stock_alert_threshold,
            
            '\n',

            'Current Inventory: ', NEW.quantity_in_stock,

            '\n\n',

            'This is an automated message. Please do not reply to this email as it is not monitored.'
        );
        
        INSERT INTO email_queue (
            user_first_name,
            user_email,
            email_subject,
            email_body,
            processed
        ) VALUES (manager_name, manager_email, email_subject, email_body, false);
    ELSEIF NEW.quantity_in_stock > NEW.stock_alert_threshold AND NEW.been_notified = TRUE THEN
        SET NEW.been_notified = FALSE;
    END IF;
    
END; //

DELIMITER ;