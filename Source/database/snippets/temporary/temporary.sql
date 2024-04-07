-- INSERT INTO address (line1, line2, city, state, zip)
-- SELECT '123 Main St', 'Apt 2', 'City', 'ST', '12345'
-- FROM dual
-- ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);

-- SELECT LAST_INSERT_ID();

SELECT c.*
FROM user AS u, customer_view AS c
WHERE u.email = @email AND u.id = c.user_id;
    
SELECT e.*
FROM user AS u, employee_view AS e
WHERE u.email = @email AND u.id = e.user_id;
