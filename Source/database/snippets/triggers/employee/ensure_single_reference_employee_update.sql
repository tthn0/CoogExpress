-- Set delimiter for trigger creation
DELIMITER //

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

-- Reset delimiter to default
DELIMITER ;