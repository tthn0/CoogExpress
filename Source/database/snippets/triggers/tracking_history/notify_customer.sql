DELIMITER //

CREATE TRIGGER notify_customer
AFTER INSERT ON tracking_history
FOR EACH ROW
BEGIN
	DECLARE customer_email VARCHAR(255);
	DECLARE customer_first_name VARCHAR(63);
	DECLARE email_subject VARCHAR(255);
	DECLARE email_body VARCHAR(1000);

	SELECT U.email, U.first_name INTO customer_email, customer_first_name
	FROM tracking_history TH
	JOIN package P ON TH.package_id = P.id
	JOIN customer C ON P.receiver_customer_id = C.id
	JOIN user U ON C.user_id = U.id
	WHERE TH.id = NEW.id;
    
    IF NEW.status = 'Delivered' THEN
			
		SET email_subject = 'CoogExpress: Package Delivery Update';
		SET email_body = CONCAT(
			'Dear ', customer_first_name, ',',

			'\n\n',

			'We are writing to inform you that your package has been successfully delivered. '

			'You may view the full tracking history of your package by visiting ',

			'http://localhost:3000/#/package/', NEW.package_id,
			
            '\n\n',

            'This is an automated message. Please do not reply to this email as it is not monitored.'
		);

	ELSEIF NEW.status = 'Lost' THEN

		SET email_subject = 'CoogExpress: Package Delivery Update';
		SET email_body = CONCAT(
			'Dear ', customer_first_name, ',',

			'\n\n',

			'We are writing to inform you that your package has been lost. '

			'You may view the full tracking history of your package by visiting ',

			'http://localhost:3000/#/package/', NEW.package_id,
			
			'\n\n',

			'This is an automated message. Please do not reply to this email as it is not monitored.'
		);

    END IF;

	INSERT INTO email_queue (
		user_first_name,
		user_email,
		email_subject,
		email_body,
		processed
	) VALUES (customer_first_name, customer_email, email_subject, email_body, false);

END //

DELIMITER ;