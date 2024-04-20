-- Set delimiter for trigger creation
DELIMITER //

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

-- Reset delimiter to default
DELIMITER ;