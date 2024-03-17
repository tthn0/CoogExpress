# ************************************************************
# Sequel Ace SQL dump
# Version 20062
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: cosc3380.mysql.database.azure.com (MySQL 8.0.34)
# Database: cosc3380
# Generation Time: 2024-03-17 12:44:56 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table address
# ------------------------------------------------------------

DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `line1` varchar(63) NOT NULL,
  `line2` varchar(63) DEFAULT NULL,
  `city` varchar(63) NOT NULL,
  `state` char(2) NOT NULL,
  `zip` char(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_address` (`line1`,`city`,`state`,`zip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;

INSERT INTO `address` (`id`, `line1`, `line2`, `city`, `state`, `zip`)
VALUES
	(1,'123 Main St','Apt 1','New York','NY','10001'),
	(2,'456 Elm St',NULL,'Los Angeles','CA','90001'),
	(3,'789 Oak St',NULL,'Chicago','IL','60601'),
	(4,'10 Pine St','Suite 100','San Francisco','CA','94101'),
	(5,'555 Maple Ave',NULL,'Miami','FL','33101'),
	(6,'111 Cedar St',NULL,'Seattle','WA','98101'),
	(7,'222 Birch St',NULL,'Boston','MA','02101'),
	(8,'333 Walnut St',NULL,'Philadelphia','PA','19101'),
	(9,'444 Cherry St','Unit B','Austin','TX','78701'),
	(10,'555 Orange St',NULL,'Atlanta','GA','30301'),
	(11,'666 Lemon St','Apt 2B','Denver','CO','80201'),
	(12,'777 Peach St',NULL,'Houston','TX','77001'),
	(13,'888 Grape St','Suite 300','Portland','OR','97201'),
	(14,'999 Pineapple St',NULL,'San Diego','CA','92101'),
	(15,'101 Apple St',NULL,'Detroit','MI','48201'),
	(16,'202 Banana St','Apt 3C','Phoenix','AZ','85001'),
	(17,'303 Pear St',NULL,'Dallas','TX','75201'),
	(18,'404 Watermelon St',NULL,'Charlotte','NC','28201'),
	(19,'505 Kiwi St','Unit D','Minneapolis','MN','55401'),
	(20,'606 Avocado St',NULL,'Las Vegas','NV','89101'),
	(21,'707 Mango St',NULL,'Orlando','FL','32801'),
	(22,'808 Papaya St','Suite 200','San Antonio','TX','78201'),
	(23,'909 Fig St',NULL,'Nashville','TN','37201'),
	(24,'1010 Coconut St',NULL,'Raleigh','NC','27601'),
	(101,'123 Main St',NULL,'City','ST','12345');

/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table billing
# ------------------------------------------------------------

DROP TABLE IF EXISTS `billing`;

CREATE TABLE `billing` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int unsigned NOT NULL,
  `address_id` int unsigned NOT NULL,
  `card_number` char(16) NOT NULL,
  `cvc` varchar(4) NOT NULL,
  `expiration_month` char(2) NOT NULL,
  `expiration_year` year NOT NULL,
  `cardholder_name` varchar(127) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `fk_billing_address_id` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_billing_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table branch
# ------------------------------------------------------------

DROP TABLE IF EXISTS `branch`;

CREATE TABLE `branch` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `address_id` int unsigned NOT NULL,
  `manager_employee_id` int unsigned DEFAULT NULL,
  `name` varchar(63) NOT NULL,
  `phone_number` char(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `opening_time` time NOT NULL,
  `closing_time` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `address_id` (`address_id`),
  KEY `manager_id` (`manager_employee_id`),
  CONSTRAINT `fk_branch_address_id` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_branch_manager_employee_id` FOREIGN KEY (`manager_employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;

INSERT INTO `branch` (`id`, `address_id`, `manager_employee_id`, `name`, `phone_number`, `email`, `opening_time`, `closing_time`)
VALUES
	(1,1,NULL,'Sunset Park Branch','1234567890','sunset.park@coog.express','08:00:00','17:00:00'),
	(2,2,NULL,'Maple Grove Branch','2345678901','maple.grove@coog.express','09:00:00','18:00:00'),
	(3,3,NULL,'Pineview Branch','3456789012','pineview@coog.express','08:30:00','17:30:00'),
	(4,4,NULL,'Lakeview Branch','4567890123','lakeview@coog.express','08:00:00','17:00:00'),
	(5,5,NULL,'Riverfront Branch','5678901234','riverfront@coog.express','09:00:00','18:00:00'),
	(6,6,NULL,'Highland Park Branch','6789012345','highland.park@coog.express','08:30:00','17:30:00'),
	(7,7,NULL,'Springfield Branch','7890123456','springfield@coog.express','08:00:00','17:00:00'),
	(8,8,NULL,'Oak Ridge Branch','8901234567','oak.ridge@coog.express','09:00:00','18:00:00'),
	(9,9,NULL,'Elmwood Branch','9012345678','elmwood@coog.express','08:30:00','17:30:00'),
	(10,10,NULL,'Cedar Hill Branch','0123456789','cedar.hill@coog.express','08:00:00','17:00:00');

/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table customer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `preferred_branch_id` int unsigned DEFAULT NULL,
  `preferred_communication_method` enum('Text','Email','Mail') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_id` (`user_id`),
  KEY `preferred_branch_id` (`preferred_branch_id`),
  CONSTRAINT `fk_customer_preferred_branch_id` FOREIGN KEY (`preferred_branch_id`) REFERENCES `branch` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_customer_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;

INSERT INTO `customer` (`id`, `user_id`, `preferred_branch_id`, `preferred_communication_method`)
VALUES
	(1,2,NULL,NULL);

/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

DELIMITER ;;
/*!50003 SET SESSION SQL_MODE="ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO" */;;
/*!50003 CREATE */ /*!50017 DEFINER=`wizard`@`%` */ /*!50003 TRIGGER `ensure_single_reference_customer` BEFORE INSERT ON `customer` FOR EACH ROW BEGIN
    DECLARE user_count INT;
    
    -- Check if the user already exists in the employee table
    SELECT COUNT(*) INTO user_count FROM employee WHERE user_id = NEW.user_id;
    
    -- If the user exists in the employee table, prevent the insertion
    IF user_count > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'User already referenced in employee table';
    END IF;
END */;;
/*!50003 SET SESSION SQL_MODE="ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO" */;;
/*!50003 CREATE */ /*!50017 DEFINER=`wizard`@`%` */ /*!50003 TRIGGER `ensure_single_reference_customer_update` BEFORE UPDATE ON `customer` FOR EACH ROW BEGIN
    DECLARE user_count INT;
    
    -- Check if the user already exists in the employee table
    SELECT COUNT(*) INTO user_count FROM employee WHERE user_id = NEW.user_id;
    
    -- If the user exists in the employee table, prevent the update
    IF user_count > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'User already referenced in employee table';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;




# Dump of table employee
# ------------------------------------------------------------

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `branch_id` int unsigned NOT NULL,
  `supervisor_employee_id` int unsigned NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `driver_license_number` char(13) DEFAULT NULL,
  `role` enum('Associate','Driver','Assistant Manager','General Manager') NOT NULL,
  `shirt_size` enum('XS','S','M','L','XL','2XL','3XL') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_driver_license_number` (`driver_license_number`),
  KEY `user_id` (`user_id`),
  KEY `branch_id` (`branch_id`),
  KEY `supervisor_id` (`supervisor_employee_id`),
  CONSTRAINT `fk_employee_branch_id` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_employee_supervisor_employee_id` FOREIGN KEY (`supervisor_employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_employee_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;

INSERT INTO `employee` (`id`, `user_id`, `branch_id`, `supervisor_employee_id`, `date_of_birth`, `gender`, `driver_license_number`, `role`, `shirt_size`)
VALUES
	(1,1,1,1,'2024-03-17','Male','1234567890123','General Manager','M');

/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

DELIMITER ;;
/*!50003 SET SESSION SQL_MODE="ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO" */;;
/*!50003 CREATE */ /*!50017 DEFINER=`wizard`@`%` */ /*!50003 TRIGGER `ensure_single_reference_employee` BEFORE INSERT ON `employee` FOR EACH ROW BEGIN
    DECLARE user_count INT;
    
    -- Check if the user already exists in the customer table
    SELECT COUNT(*) INTO user_count FROM customer WHERE user_id = NEW.user_id;
    
    -- If the user exists in the customer table, prevent the insertion
    IF user_count > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'User already referenced in customer table';
    END IF;
END */;;
/*!50003 SET SESSION SQL_MODE="ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO" */;;
/*!50003 CREATE */ /*!50017 DEFINER=`wizard`@`%` */ /*!50003 TRIGGER `ensure_single_reference_employee_update` BEFORE UPDATE ON `employee` FOR EACH ROW BEGIN
    DECLARE user_count INT;
    
    -- Check if the user already exists in the customer table
    SELECT COUNT(*) INTO user_count FROM customer WHERE user_id = NEW.user_id;
    
    -- If the user exists in the customer table, prevent the update
    IF user_count > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'User already referenced in customer table';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;


# Dump of table employee_schedule
# ------------------------------------------------------------

DROP TABLE IF EXISTS `employee_schedule`;

CREATE TABLE `employee_schedule` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` int unsigned NOT NULL,
  `start_timestamp` timestamp NOT NULL,
  `end_timestamp` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `fk_employee_schedule_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;





# Dump of table inventory
# ------------------------------------------------------------

DROP TABLE IF EXISTS `inventory`;

CREATE TABLE `inventory` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `branch_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `quantity_in_stock` int unsigned NOT NULL,
  `stock_alert_threshold` int unsigned DEFAULT NULL,
  `last_stock_update` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `branch_id` (`branch_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `fk_inventory_branch_id` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_inventory_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table package
# ------------------------------------------------------------

DROP TABLE IF EXISTS `package`;

CREATE TABLE `package` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `sender_customer_id` int unsigned NOT NULL,
  `receiver_customer_id` int unsigned NOT NULL,
  `source_branch_id` int unsigned NOT NULL,
  `destination_address_id` int unsigned NOT NULL,
  `shipment_id` int unsigned NOT NULL,
  `type` enum('Mail','Parcel') NOT NULL,
  `width` decimal(5,2) unsigned NOT NULL,
  `length` decimal(5,2) unsigned NOT NULL,
  `height` decimal(5,2) unsigned NOT NULL,
  `weight` decimal(8,2) unsigned NOT NULL,
  `special_handling_instructions` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `delivery_instructions` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `base_shipping_cost` decimal(5,2) unsigned NOT NULL,
  `additional_fees` decimal(5,2) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sender_customer_id` (`sender_customer_id`),
  KEY `receiver_customer_id` (`receiver_customer_id`),
  KEY `source_branch_id` (`source_branch_id`),
  KEY `destination_address_id` (`destination_address_id`),
  KEY `shipment_id` (`shipment_id`),
  CONSTRAINT `fk_package_destination_address_id` FOREIGN KEY (`destination_address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_package_receiver_customer_id` FOREIGN KEY (`receiver_customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_package_sender_customer_id` FOREIGN KEY (`sender_customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_package_shipment_id` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_package_source_branch_id` FOREIGN KEY (`source_branch_id`) REFERENCES `branch` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `sku` char(12) NOT NULL,
  `upc` char(12) NOT NULL,
  `price` decimal(5,2) unsigned NOT NULL,
  `name` varchar(63) NOT NULL,
  `description` varchar(2047) NOT NULL,
  `width` decimal(5,2) unsigned NOT NULL,
  `length` decimal(5,2) unsigned NOT NULL,
  `height` decimal(5,2) unsigned NOT NULL,
  `weight` decimal(8,2) unsigned NOT NULL,
  `image` longblob,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;

INSERT INTO `product` (`id`, `sku`, `upc`, `price`, `name`, `description`, `width`, `length`, `height`, `weight`, `image`, `deleted`)
VALUES
	(1,'SKU123456789','UPC123456789',29.99,'Cardboard box','Cardboard box description.',10.50,20.20,5.30,2.50,NULL,0),
	(2,'SKU234567890','UPC234567890',49.99,'Packing peanuts','Packing peanuts description.',15.00,25.60,7.80,3.20,NULL,0),
	(3,'SKU345678901','UPC345678901',19.99,'Sticky notes','Description for Product 3',8.80,18.30,4.50,1.80,NULL,0),
	(4,'SKU456789012','UPC456789012',39.99,'Folders','Description for Product 4',12.30,22.00,6.10,2.90,NULL,0),
	(5,'SKU567890123','UPC567890123',59.99,'Printer paper','Description for Product 5',17.60,28.90,8.40,3.70,NULL,0),
	(6,'SKU678901234','UPC678901234',24.99,'Envelopes','Description for Product 6',9.50,19.60,4.90,2.10,NULL,0),
	(7,'SKU789012345','UPC789012345',34.99,'Stamps','Description for Product 7',11.80,21.20,5.70,2.60,NULL,0),
	(8,'SKU890123456','UPC890123456',44.99,'Stapler','Description for Product 8',14.10,23.80,7.00,3.10,NULL,0),
	(9,'SKU901234567','UPC901234567',54.99,'Scissors','Description for Product 9',16.40,27.50,8.30,3.90,NULL,0),
	(10,'SKU012345678','UPC012345678',14.99,'Duct Tape','Description for Product 10',7.20,16.90,3.80,1.50,NULL,0),
	(11,'SKU112233445','UPC112233445',99.99,'Clear Tape','Description for Product 11',21.40,35.60,9.50,4.50,NULL,0),
	(12,'SKU223344556','UPC223344556',74.99,'Highlighters','Description for Product 12',18.70,30.10,8.90,3.80,NULL,0),
	(13,'SKU334455667','UPC334455667',84.99,'Pencils','Description for Product 13',20.00,32.40,9.30,4.10,NULL,0),
	(14,'SKU445566778','UPC445566778',64.99,'Markers','Description for Product 14',16.90,27.80,7.60,3.20,NULL,0),
	(15,'SKU556677889','UPC556677889',94.99,'Pens','Description for Product 15',22.60,36.50,10.10,4.70,NULL,0);

/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table receipt
# ------------------------------------------------------------

DROP TABLE IF EXISTS `receipt`;

CREATE TABLE `receipt` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int unsigned NOT NULL,
  `package_id` int unsigned DEFAULT NULL,
  `branch_id` int unsigned NOT NULL,
  `billing_id` int unsigned NOT NULL,
  `subtotal` decimal(5,2) unsigned NOT NULL,
  `tax` decimal(5,2) unsigned NOT NULL,
  `total` decimal(5,2) unsigned NOT NULL,
  `timestamp` timestamp NOT NULL,
  `notes` varchar(2047) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `package_id` (`package_id`),
  KEY `branch_id` (`branch_id`),
  KEY `billing_id` (`billing_id`),
  CONSTRAINT `fk_receipt_billing_id` FOREIGN KEY (`billing_id`) REFERENCES `billing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_receipt_branch_id` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_receipt_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_receipt_package_id` FOREIGN KEY (`package_id`) REFERENCES `package` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table route
# ------------------------------------------------------------

DROP TABLE IF EXISTS `route`;

CREATE TABLE `route` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `shipment_id` int unsigned NOT NULL,
  `start_address_id` int unsigned NOT NULL,
  `end_address_id` int unsigned NOT NULL,
  `driver_employee_id` int unsigned NOT NULL,
  `start_timestamp` timestamp NULL DEFAULT NULL,
  `end_timestamp` timestamp NULL DEFAULT NULL,
  `type` enum('Standard','Express','Overnight') NOT NULL,
  `distance` decimal(5,2) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `shipment_id` (`shipment_id`),
  KEY `start_address_id` (`start_address_id`),
  KEY `end_address_id` (`end_address_id`),
  KEY `driver_employee_id` (`driver_employee_id`),
  CONSTRAINT `fk_route_driver_employee_id` FOREIGN KEY (`driver_employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_route_end_address_id` FOREIGN KEY (`end_address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_route_shipment_id` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_route_start_address_id` FOREIGN KEY (`start_address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table shipment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `shipment`;

CREATE TABLE `shipment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `package_id` int unsigned NOT NULL,
  `route_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  KEY `route_id` (`route_id`),
  CONSTRAINT `fk_shipment_package_id` FOREIGN KEY (`package_id`) REFERENCES `package` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_shipment_route_id` FOREIGN KEY (`route_id`) REFERENCES `route` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table tracking_history
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tracking_history`;

CREATE TABLE `tracking_history` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `package_id` int unsigned NOT NULL,
  `address_id` int unsigned NOT NULL,
  `timestamp` timestamp NOT NULL,
  `status` enum('Pre-Shipment','In Transit','Out for Delivery','Delivered') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `fk_tracking_history_address_id` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_tracking_history_package_id` FOREIGN KEY (`package_id`) REFERENCES `package` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(63) NOT NULL,
  `last_name` varchar(63) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone_number` char(10) NOT NULL,
  `phone_country_code` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address_id` int unsigned NOT NULL,
  `profile_picture` longblob,
  `created_at` datetime NOT NULL,
  `last_login` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`),
  UNIQUE KEY `unique_phone_number` (`phone_number`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `fk_user_address_id` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password_hash`, `phone_number`, `phone_country_code`, `address_id`, `profile_picture`, `created_at`, `last_login`, `deleted`)
VALUES
	(1,'Thomas','Nguyen','thomas@tthn.us','password','0000000000','1',1,NULL,'2024-03-17 12:30:45','2024-03-17 12:30:45',0),
	(2,'John','Cena','john@cena.com','ucantseeme','1112223337','1',101,NULL,'2024-03-16 20:47:07','2024-03-16 20:47:07',0);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of view customer_view
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customer_view`; DROP VIEW IF EXISTS `customer_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wizard`@`%` SQL SECURITY DEFINER VIEW `customer_view`
AS SELECT
   `u`.`id` AS `user_id`,
   `u`.`first_name` AS `first_name`,
   `u`.`last_name` AS `last_name`,
   `u`.`email` AS `email`,
   `u`.`password_hash` AS `password_hash`,
   `u`.`phone_number` AS `phone_number`,
   `u`.`phone_country_code` AS `phone_country_code`,
   `u`.`profile_picture` AS `profile_picture`,
   `u`.`created_at` AS `created_at`,
   `u`.`last_login` AS `last_login`,
   `u`.`deleted` AS `deleted`,
   `c`.`id` AS `customer_id`,
   `c`.`preferred_branch_id` AS `preferred_branch_id`,
   `c`.`preferred_communication_method` AS `preferred_communication_method`,
   `a`.`id` AS `address_id`,
   `a`.`line1` AS `line1`,
   `a`.`line2` AS `line2`,
   `a`.`city` AS `city`,
   `a`.`state` AS `state`,
   `a`.`zip` AS `zip`
FROM ((`user` `u` join `address` `a`) join `customer` `c`) where ((`u`.`id` = `c`.`user_id`) and (`u`.`address_id` = `a`.`id`));

# Dump of view employee_view
# ------------------------------------------------------------

DROP TABLE IF EXISTS `employee_view`; DROP VIEW IF EXISTS `employee_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wizard`@`%` SQL SECURITY DEFINER VIEW `employee_view`
AS SELECT
   `u`.`id` AS `user_id`,
   `u`.`first_name` AS `first_name`,
   `u`.`last_name` AS `last_name`,
   `u`.`email` AS `email`,
   `u`.`password_hash` AS `password_hash`,
   `u`.`phone_number` AS `phone_number`,
   `u`.`phone_country_code` AS `phone_country_code`,
   `u`.`profile_picture` AS `profile_picture`,
   `u`.`created_at` AS `created_at`,
   `u`.`last_login` AS `last_login`,
   `u`.`deleted` AS `deleted`,
   `e`.`id` AS `employee_id`,
   `e`.`branch_id` AS `branch_id`,
   `e`.`supervisor_employee_id` AS `supervisor_employee_id`,
   `e`.`date_of_birth` AS `date_of_birth`,
   `e`.`gender` AS `gender`,
   `e`.`driver_license_number` AS `driver_license_number`,
   `e`.`role` AS `role`,
   `e`.`shirt_size` AS `shirt_size`,
   `a`.`id` AS `address_id`,
   `a`.`line1` AS `line1`,
   `a`.`line2` AS `line2`,
   `a`.`city` AS `city`,
   `a`.`state` AS `state`,
   `a`.`zip` AS `zip`
FROM ((`user` `u` join `address` `a`) join `employee` `e`) where ((`u`.`id` = `e`.`user_id`) and (`u`.`address_id` = `a`.`id`));


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
