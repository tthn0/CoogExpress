DELIMITER //

-- Create a trigger that fires before inserting or updating a record in the customer table
CREATE TRIGGER ensure_single_reference_customer
BEFORE INSERT ON customer
FOR EACH ROW
BEGIN
    DECLARE user_count INT;
    
    -- Check if the user already exists in the employee table
    SELECT COUNT(*) INTO user_count FROM employee WHERE user_id = NEW.user_id;
    
    -- If the user exists in the employee table, prevent the insertion
    IF user_count > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'User already referenced in employee table';
    END IF;
END //

-- Trigger for updating customer table
CREATE TRIGGER ensure_single_reference_customer_update
BEFORE UPDATE ON customer
FOR EACH ROW
BEGIN
    DECLARE user_count INT;
    
    -- Check if the user already exists in the employee table
    SELECT COUNT(*) INTO user_count FROM employee WHERE user_id = NEW.user_id;
    
    -- If the user exists in the employee table, prevent the update
    IF user_count > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'User already referenced in employee table';
    END IF;
END //

-- Create a trigger that fires before inserting or updating a record in the employee table
CREATE TRIGGER ensure_single_reference_employee
BEFORE INSERT ON employee
FOR EACH ROW
BEGIN
    DECLARE user_count INT;
    
    -- Check if the user already exists in the customer table
    SELECT COUNT(*) INTO user_count FROM customer WHERE user_id = NEW.user_id;
    
    -- If the user exists in the customer table, prevent the insertion
    IF user_count > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'User already referenced in customer table';
    END IF;
END //

-- Trigger for updating employee table
CREATE TRIGGER ensure_single_reference_employee_update
BEFORE UPDATE ON employee
FOR EACH ROW
BEGIN
    DECLARE user_count INT;
    
    -- Check if the user already exists in the customer table
    SELECT COUNT(*) INTO user_count FROM customer WHERE user_id = NEW.user_id;
    
    -- If the user exists in the customer table, prevent the update
    IF user_count > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'User already referenced in customer table';
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER package_insert_trigger AFTER INSERT ON package
FOR EACH ROW
BEGIN
    DECLARE source_branch_address_id INT;

    -- Lookup the address_id of the branch associated with the package
    SELECT address_id INTO source_branch_address_id FROM branch WHERE id = NEW.source_branch_id;

    -- Insert the package details into the tracking_history table
    INSERT INTO tracking_history (package_id, address_id, timestamp, status)
    VALUES (NEW.id, source_branch_address_id, NOW(), 'Pending');
END;
//

DELIMITER ;

DELIMITER //

CREATE TRIGGER shipment_insert_trigger AFTER INSERT ON shipment
FOR EACH ROW
BEGIN
    DECLARE current_address_id INT;

    SELECT address_id
    INTO current_address_id
    FROM tracking_history
    WHERE package_id = NEW.package_id
    ORDER BY timestamp DESC
    LIMIT 1;

    INSERT INTO tracking_history (package_id, address_id, timestamp, status)
    VALUES (NEW.package_id, current_address_id, NOW(), 'Standby');
END;
//

DELIMITER ;

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

-- Business Triggers
DELIMITER //

CREATE TRIGGER notify_customer
AFTER INSERT ON tracking_history
FOR EACH ROW
BEGIN
	DECLARE customer_email VARCHAR(255);
	DECLARE customer_first_name VARCHAR(63);
	DECLARE email_subject VARCHAR(255);
	DECLARE email_body VARCHAR(1000);
    
    IF NEW.status = 'Delivered' THEN
		SELECT U.email, U.first_name INTO customer_email, customer_first_name
		FROM tracking_history TH
		JOIN package P ON TH.package_id = P.id
		JOIN customer C ON P.receiver_customer_id = C.id
		JOIN user U ON C.user_id = U.id
		WHERE TH.id = NEW.id;
			
		SET email_subject = 'CoogExpress: New tracking history!';
		SET email_body = CONCAT('Hello, ', customer_first_name, '!\n\n A new tracking history has been created for you.\n Tracking history ID: ', NEW.id);
		INSERT INTO email_queue (
			user_first_name,
			user_email,
			email_subject,
			email_body,
			processed
		) VALUES (customer_first_name, customer_email, email_subject, email_body, false);
    END IF;

END//

DELIMITER ;

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
    
    IF NEW.quantity_in_stock <= NEW.stock_alert_threshold AND OLD.been_notified = FALSE THEN    -- If inventory is less than threshold and not been notified.
        SET NEW.been_notified = TRUE;
        
        SET email_subject = CONCAT('CoogExpress Management: Inventory Alert at ', branch_name);
        SET email_body = CONCAT('Dear ', manager_name, '\n\nThe inventory for "', product_name, '" has reached the threshold at your branch. Please order new inventory as soon as possible for this branch\nThreshold: ', NEW.stock_alert_threshold, '\nCurrent Inventory: ', NEW.quantity_in_stock);
        
        INSERT INTO email_queue (
            user_first_name,
            user_email,
            email_subject,
            email_body,
            processed
        ) VALUES (manager_name, manager_email, email_subject, email_body, false);
    ELSEIF NEW.quantity_in_stock > NEW.stock_alert_threshold AND NEW.been_notified = TRUE THEN    -- If inventory has been restocked
        SET NEW.been_notified = FALSE;
    END IF;
    
END//

DELIMITER ;