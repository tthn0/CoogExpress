# ************************************************************
# Sequel Ace SQL dump
# Version 20064
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: cosc3380.mysql.database.azure.com (MySQL 8.0.35)
# Database: newv2
# Generation Time: 2024-04-18 21:59:28 +0000
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
  `line2` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `city` varchar(63) NOT NULL,
  `state` char(2) NOT NULL,
  `zip` char(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_address` (`line1`,`line2`,`city`,`state`,`zip`)
) ENGINE=InnoDB AUTO_INCREMENT=646 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;

INSERT INTO `address` (`id`, `line1`, `line2`, `city`, `state`, `zip`)
VALUES
	(587,'1 Apple Cr','','San Francisco','CA','48201'),
	(596,'1 Apple Cr','','Sugar Land','TX','27601'),
	(513,'1 Apple Cr','','Sugar Land','TX','77479'),
	(585,'1 Petersen House','','Washington','DC','99094'),
	(623,'10 Pine St','Apt 2B','Seattle','WA','27601'),
	(4,'10 Pine St','Suite 100','San Francisco','CA','94101'),
	(15,'101 Apple St','','Detroit','MI','48201'),
	(558,'101 Apple St','','Raleigh','TX','77479'),
	(397,'101 Apple St','','Raleigh','TX','94101'),
	(391,'101 Apple St','','San Francisco','TX','77084'),
	(567,'101 Apple St','','Seattle','NC','77479'),
	(643,'101 Apple St','','Seattle','WA','27601'),
	(386,'101 Apple St','','Seattle','WA','77084'),
	(546,'101 Apple St','Apt 1','Seattle','TX','77084'),
	(24,'1010 Coconut St','','Raleigh','NC','27601'),
	(387,'1010 Coconut St','','Seattle','TX','27601'),
	(383,'1010 Coconut St','','Seattle','TX','48201'),
	(390,'1010 Coconut St','Apt 2B','Raleigh','NC','27601'),
	(6,'111 Cedar St','','Seattle','WA','98101'),
	(491,'111 Cedar St','Apt 1','New York','TX','75201'),
	(622,'111 Cedar St','Unit D','New York','OR','94101'),
	(512,'111 Test St','','Sugar Land','NY','77479'),
	(507,'1111 Street','','City','NY','77479'),
	(543,'123 Branch Street','','Houston','TX','77479'),
	(645,'123 Bro St','','Houston','TX','77449'),
	(575,'123 Fake St','','Dallas','CA','77449'),
	(539,'123 Location Rd','','OIOI city','OI','77777'),
	(560,'123 Main Dr','','Katy','TX','70833'),
	(378,'123 Main St','','Austin','CA','77084'),
	(608,'123 Main St','','Detroit','MI','48201'),
	(590,'123 Main St','','Houston','TX','77449'),
	(495,'123 Main St','Apt 1','Houston','TX','77084'),
	(1,'123 Main St','Apt 1','New York','NY','10001'),
	(492,'123 Main St','Apt 1','Seattle','TX','77084'),
	(400,'123 Main St','Apt 1','Springfield','IL','62701'),
	(577,'123 Main St','Suite 300','Sugar Land','NC','77479'),
	(376,'123 My St','','Houston','TX','12345'),
	(25,'123 Real St','','Fort Worth','TX','77084'),
	(615,'123 Real St','','Houston','TX','77044'),
	(588,'123 Real St','','Houston','TX','77449'),
	(584,'1600 Penn Avenue','NW','Washington','DC','20500'),
	(16,'202 Banana St','Apt 3C','Phoenix','AZ','85001'),
	(469,'217 Casa Blanca dr','','Brownsville','TX','78521'),
	(7,'222 Birch St','','Boston','MA','02101'),
	(568,'234 Bro St','Suite 300','Seattle','TX','94101'),
	(559,'234 Brown Ln','','College Station','AZ','29342'),
	(504,'29243 Jump St','','Houston','TX','77084'),
	(17,'303 Pear St','','Dallas','NY','75201'),
	(544,'321 Going Ln','','Houston','TX','77889'),
	(520,'333 Test St','','Sugar Land','TX','77479'),
	(519,'333 Test Street','','Sugar Land','TX','77479'),
	(8,'333 Walnut St','','Philadelphia','PA','19101'),
	(633,'400 Eigth Ct','','Queens','MA','66101'),
	(555,'400 Real St','','Houston','TX','77665'),
	(18,'404 Watermelon St','','Charlotte','NC','28201'),
	(375,'404 Watermelon St','','Orlando','OR','80201'),
	(597,'404 Watermelon St','','Washington','CA','75201'),
	(9,'444 Cherry St','Unit B','Austin','TX','78701'),
	(522,'444 Test St','','New York','NY','19899'),
	(518,'444 Test Street','','Zealand','TX','77479'),
	(561,'456 Elm St','','California','CA','92873'),
	(613,'456 Elm St','','Galveston','TX','77880'),
	(2,'456 Elm St','','Los Angeles','CA','90001'),
	(609,'456 Elm St','','Waco','TX','77394'),
	(624,'456 Elm St','Suite 300','Raleigh','HI','27601'),
	(580,'456 Fake St','','Phoenix','AZ','98765'),
	(26,'456 Jump St','','Albany','NY','12345'),
	(530,'456 Lol Dr','','Cincinnati','TY','77777'),
	(19,'505 Kiwi St','Unit D','Minneapolis','MN','55401'),
	(586,'5200 Hines Blvd','','Dallas','TX','75235'),
	(5,'555 Maple Ave','','Miami','FL','33101'),
	(10,'555 Orange St','','Atlanta','GA','30301'),
	(523,'555 Test St','','Raleigh','WA','77084'),
	(569,'600 Real Ct','Building 1','Galveston','CA','23948'),
	(20,'606 Avocado St','','Las Vegas','NV','89101'),
	(377,'606 Avocado St','','Seattle','NC','48201'),
	(625,'654 Jump Ln','','Tokyo','PA','44603'),
	(11,'666 Lemon St','Apt 2B','Denver','CO','80201'),
	(524,'666 Test St','','Raleigh','TX','77084'),
	(637,'6827 Fourth Ln','','Toronto','AZ','33084'),
	(21,'707 Mango St','','Orlando','FL','32801'),
	(576,'765 Drive Ln','','Houston','TX','77084'),
	(548,'7654 Different St','','Sugar Land','TX','77889'),
	(12,'777 Peach St','','Houston','TX','77001'),
	(525,'777 Test St','','San Francisco','NC','48201'),
	(563,'789 Blah','','Bro','NY','98273'),
	(614,'789 Fake St','','Fake','MA','12345'),
	(3,'789 Oak St','','Chicago','IL','60601'),
	(27,'789 Sesame St','','Denver','CO','54321'),
	(22,'808 Papaya St','Suite 200','San Antonio','TX','78201'),
	(13,'888 Grape St','Suite 300','Portland','OR','97201'),
	(533,'888 test St','','Albany','HI','01010'),
	(514,'8888 Test Street','','Sugar Land','TX','77479'),
	(23,'909 Fig St','','Nashville','TN','37201'),
	(630,'987 Sesame Rd','','Beijing','AL','55601'),
	(528,'999 Lmao St','','Fortune','NY','77479'),
	(621,'999 Pineapple St','','Dallas','NC','99094'),
	(14,'999 Pineapple St','','San Diego','CA','92101'),
	(526,'999 Test Ln','','Miami','NY','77479'),
	(534,'first update 111','','Landmark','OH','11111'),
	(538,'New Test St','','San Francisco','TX','77777'),
	(536,'Test Drive','','Sugar Land','TX','77479'),
	(541,'Test St','','Flint','MI','75201');

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
  `preferred` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `fk_billing_address_id` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_billing_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `billing` WRITE;
/*!40000 ALTER TABLE `billing` DISABLE KEYS */;

INSERT INTO `billing` (`id`, `customer_id`, `address_id`, `card_number`, `cvc`, `expiration_month`, `expiration_year`, `cardholder_name`, `preferred`)
VALUES
	(26,1,1,'1238749273489271','2934','01','2024','Real Name',1),
	(31,1,2,'2743829479238472','3234','02','2025','Fake Name',0),
	(33,1,3,'3472347274283493','2342','03','2026','Test User',0),
	(36,1,4,'4111666677778884','123','04','2027','Sam Test',0),
	(37,2,5,'5234729834729835','2934','05','2028','Renu Khator',1),
	(46,20,590,'4294782394724792','123','05','2030','Kaitlin Wood',1),
	(47,3,645,'9273489729847239','212','4','2077','Ada Lovelace',1);

/*!40000 ALTER TABLE `billing` ENABLE KEYS */;
UNLOCK TABLES;


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
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `address_id` (`address_id`),
  KEY `manager_id` (`manager_employee_id`),
  CONSTRAINT `fk_branch_address_id` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_branch_manager_employee_id` FOREIGN KEY (`manager_employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;

INSERT INTO `branch` (`id`, `address_id`, `manager_employee_id`, `name`, `phone_number`, `email`, `opening_time`, `closing_time`, `image`)
VALUES
	(1,1,1,'Sunset Park Branch','1234567890','sunset.park@coog.express','08:00:00','17:00:00','https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/EdithburghPostOffice.JPG/1280px-EdithburghPostOffice.JPG'),
	(2,2,10,'Maple Grove Branch','2345678901','maple.grove@coog.express','09:00:00','18:00:00','https://www.rd.com/wp-content/uploads/2020/09/GettyImages-869271116-e1599763398142.jpg'),
	(3,3,20,'Pineview Branch','3456789012','pineview@coog.express','08:30:00','17:30:00','https://www.rd.com/wp-content/uploads/2020/09/GettyImages-1145607768-scaled.jpg'),
	(4,4,1,'Lakeview Branch','4567890123','lakeview@coog.express','08:00:00','17:00:00','https://cdnassets.hw.net/f4/1f/65d6a0e24c3b8455772d0cc45673/united-states-post-office-plymouth-wisconsin-2020-9598.jpg'),
	(5,5,1,'Riverfront Branch','5678901234','riverfront@coog.express','09:00:00','18:00:00','https://www.thoughtco.com/thmb/kNONe5jM_OTUDtOtVZ7sP6WWVv8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PO-kansas-56a02b0c3df78cafdaa06347.jpg'),
	(6,6,1,'Highland Park Branch','6789012345','highland.park@coog.express','08:30:00','17:30:00','https://upload.wikimedia.org/wikipedia/commons/8/84/2017_US_Post_Office%2C_Central_Square%2C_Cambridge%2C_Massachusetts.jpg'),
	(7,7,1,'Springfield Branch','7890123456','springfield@coog.express','08:00:00','17:00:00','https://images.squarespace-cdn.com/content/v1/5ddb4ef7782768313a3942ab/1576699977884-89WXCCUFFROZNADVDCAY/eagle-grove-post-office.jpg'),
	(8,8,1,'Oak Ridge Branch','8901234567','oak.ridge@coog.express','09:00:00','18:00:00','https://dnr.mo.gov/sites/dnr/files/media/image/2020/12/post-office-redevelopment.jpg'),
	(9,9,1,'Elmwood Branch','9012345678','elmwood@coog.express','08:30:00','17:30:00','https://www.wbrcae.com/uploads/uspspix4-1400x800.jpg'),
	(10,10,1,'Cedar Hill Branch','0123456789','cedar.hill@coog.express','08:00:00','17:00:00','https://static01.nyt.com/packages/images/newsgraphics/2013/0226-usps-buliding-sales/santamonica_ext.jpg'),
	(14,22,1,'Garden Ridge Branch','1112224567','garden.ridge@coog.express','19:09:45','19:09:45','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFks4eEWgkTgxeXObXqTW5A6v87oy1MfmFXQ&s');

/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

DELIMITER ;;
/*!50003 SET SESSION SQL_MODE="ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO" */;;
/*!50003 CREATE */ /*!50017 DEFINER=`wizard`@`%` */ /*!50003 TRIGGER `branch_inventory_trigger` AFTER INSERT ON `branch` FOR EACH ROW BEGIN
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
END */;;
DELIMITER ;
/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;




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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;

INSERT INTO `customer` (`id`, `user_id`, `preferred_branch_id`, `preferred_communication_method`)
VALUES
	(1,20,NULL,NULL),
	(2,21,NULL,NULL),
	(3,22,NULL,NULL),
	(4,23,NULL,NULL),
	(5,24,NULL,NULL),
	(6,25,NULL,NULL),
	(7,26,NULL,NULL),
	(8,27,NULL,NULL),
	(9,28,NULL,NULL),
	(10,29,NULL,NULL),
	(20,100,NULL,NULL);

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




# Dump of table email_queue
# ------------------------------------------------------------

DROP TABLE IF EXISTS `email_queue`;

CREATE TABLE `email_queue` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_first_name` varchar(63) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `email_subject` varchar(255) DEFAULT NULL,
  `email_body` varchar(1000) DEFAULT NULL,
  `processed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_email_processed` (`processed`)
) ENGINE=InnoDB AUTO_INCREMENT=360 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `email_queue` WRITE;
/*!40000 ALTER TABLE `email_queue` DISABLE KEYS */;

INSERT INTO `email_queue` (`id`, `user_first_name`, `user_email`, `email_subject`, `email_body`, `processed`)
VALUES
	(3,'Thomas','thomas@tthn.us','Inventory Threshold Alert at: Lakeview Branch','Dear Thomas\n\nThe inventory for \"Folders\" has reached below the threshold. Please purchase new products for this branch\nThreshold: 200\nCurrent Inventory: 199',1),
	(4,'Thomas','thomas@tthn.us','Inventory Threshold Alert at: Lakeview Branch','Dear Thomas\n\nThe inventory for \"Folders\" has reached below the threshold. Please purchase new products for this branch\nThreshold: 200\nCurrent Inventory: 198',1),
	(5,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace\n\n! A new tracking history has been created for you.\n Tracking history ID: 35',1),
	(6,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace\n\n! A new tracking history has been created for you.\n Tracking history ID: 36',1),
	(8,'Thomas','thomas@tthn.us','CoogExpress Management: Inventory Alert at Lakeview Branch','Dear Thomas\n\nThe inventory for \"Folders\" has reached the threshold at your branch. Please order new inventory as soon as possible for this branch\nThreshold: 200\nCurrent Inventory: 200',1),
	(9,'Thomas','thomas@tthn.us','CoogExpress Management: Inventory Alert at Lakeview Branch',NULL,1),
	(10,'Thomas','thomas@tthn.us','CoogExpress Management: Inventory Alert at Lakeview Branch','Dear Thomas\n\nThe inventory for \"Folders\" has reached the threshold at your branch. Please order new inventory as soon as possible for this branch\nThreshold: 200\nCurrent Inventory: 200',1),
	(11,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace\n\n! A new tracking history has been created for you.\n Tracking history ID: 37',1),
	(12,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 38',1),
	(13,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 39',1),
	(14,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 40',1),
	(15,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 41',1),
	(16,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 42',1),
	(17,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 43',1),
	(18,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 44',1),
	(19,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 45',1),
	(20,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 46',1),
	(21,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 47',1),
	(22,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 48',1),
	(23,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 49',1),
	(24,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 50',1),
	(25,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 51',1),
	(26,'Alan','alan@turing.com','CoogExpress: New tracking history!','Hello, Alan!\n\n A new tracking history has been created for you.\n Tracking history ID: 52',1),
	(27,'Alan','alan@turing.com','CoogExpress: New tracking history!','Hello, Alan!\n\n A new tracking history has been created for you.\n Tracking history ID: 53',1),
	(28,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 54',1),
	(29,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 55',1),
	(30,'ben','b@b.com','CoogExpress: New tracking history!','Hello, ben!\n\n A new tracking history has been created for you.\n Tracking history ID: 56',1),
	(31,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 57',1),
	(32,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 58',1),
	(33,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 59',1),
	(34,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 60',1),
	(35,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 61',1),
	(36,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 62',1),
	(37,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 63',1),
	(38,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 64',1),
	(39,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 65',1),
	(40,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 66',1),
	(41,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 67',1),
	(42,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 68',1),
	(43,'ben','b@b.com','CoogExpress: New tracking history!','Hello, ben!\n\n A new tracking history has been created for you.\n Tracking history ID: 69',1),
	(44,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 70',1),
	(45,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 71',1),
	(46,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 72',1),
	(47,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 73',1),
	(48,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 74',1),
	(49,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 75',1),
	(50,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 76',1),
	(51,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 77',1),
	(52,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 78',1),
	(53,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 79',1),
	(54,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 80',1),
	(55,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 81',1),
	(56,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 82',1),
	(57,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 83',1),
	(58,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 84',1),
	(59,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 85',1),
	(60,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 86',1),
	(61,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 87',1),
	(62,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 88',1),
	(63,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 89',1),
	(64,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 90',1),
	(65,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 91',1),
	(66,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 92',1),
	(67,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 93',1),
	(68,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 94',1),
	(69,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 95',1),
	(70,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 96',1),
	(71,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 97',1),
	(72,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 1',1),
	(73,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 2',1),
	(74,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 3',1),
	(75,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 4',1),
	(76,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 5',1),
	(77,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 6',1),
	(78,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 7',1),
	(79,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 8',1),
	(80,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 9',1),
	(81,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 10',1),
	(82,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 11',1),
	(83,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 12',1),
	(84,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 13',1),
	(85,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 14',1),
	(86,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 15',1),
	(87,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 16',1),
	(88,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 17',1),
	(89,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 18',1),
	(90,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 19',1),
	(91,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 20',1),
	(92,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 21',1),
	(93,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 22',1),
	(94,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 23',1),
	(95,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 24',1),
	(96,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 25',1),
	(97,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 26',1),
	(98,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 27',1),
	(99,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 28',1),
	(100,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 29',1),
	(101,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 30',1),
	(102,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 31',1),
	(103,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 32',1),
	(104,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 33',1),
	(105,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 34',1),
	(106,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 35',1),
	(107,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 36',1),
	(108,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 37',1),
	(109,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 38',1),
	(110,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 39',1),
	(111,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 40',1),
	(112,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 41',1),
	(113,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 42',1),
	(114,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 43',1),
	(115,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 44',1),
	(116,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 45',1),
	(117,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 46',1),
	(118,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 47',1),
	(119,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 48',1),
	(120,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 50',1),
	(121,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 49',1),
	(122,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 51',1),
	(123,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 52',1),
	(124,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 53',1),
	(125,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 54',1),
	(126,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 55',1),
	(127,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 56',1),
	(128,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 57',1),
	(129,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 58',1),
	(130,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 59',1),
	(131,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 60',1),
	(132,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 61',1),
	(133,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 62',1),
	(134,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 63',1),
	(135,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 64',1),
	(136,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 66',1),
	(137,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 65',1),
	(138,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 67',1),
	(139,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 68',1),
	(140,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 69',1),
	(141,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 70',1),
	(142,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 71',1),
	(143,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 72',1),
	(144,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 73',1),
	(145,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 74',1),
	(146,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 75',1),
	(147,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 76',1),
	(148,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 77',1),
	(149,'Alan','alan@turing.com','CoogExpress: New tracking history!','Hello, Alan!\n\n A new tracking history has been created for you.\n Tracking history ID: 78',1),
	(150,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 79',1),
	(151,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 80',1),
	(152,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 81',1),
	(153,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 82',1),
	(154,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 83',1),
	(155,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 84',1),
	(156,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 85',1),
	(157,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 86',1),
	(158,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 87',1),
	(159,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 88',1),
	(160,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 89',1),
	(161,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 90',1),
	(162,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 91',1),
	(163,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 92',1),
	(164,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 93',1),
	(165,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 94',1),
	(166,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 95',1),
	(167,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 96',1),
	(168,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 97',1),
	(169,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 98',1),
	(170,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 99',1),
	(171,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 100',1),
	(172,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 101',1),
	(173,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 102',1),
	(174,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 103',1),
	(175,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 104',1),
	(176,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 105',1),
	(177,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 106',1),
	(178,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 107',1),
	(179,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 108',1),
	(180,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 109',1),
	(181,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 110',1),
	(182,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 111',1),
	(183,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 112',1),
	(184,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 113',1),
	(185,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 114',1),
	(186,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 115',1),
	(187,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 116',1),
	(188,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 117',1),
	(189,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 118',1),
	(190,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 119',1),
	(191,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 120',1),
	(192,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 121',1),
	(193,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 122',1),
	(194,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 123',1),
	(195,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 124',1),
	(196,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 125',1),
	(197,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 126',1),
	(198,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 127',1),
	(199,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 128',1),
	(200,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 129',1),
	(201,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 130',1),
	(202,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 131',1),
	(203,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 132',1),
	(204,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 133',1),
	(205,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 134',1),
	(206,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 135',1),
	(207,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 136',1),
	(208,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 137',1),
	(209,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 138',1),
	(210,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 139',1),
	(211,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 140',1),
	(212,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 141',1),
	(213,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 142',1),
	(214,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 143',1),
	(215,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 144',1),
	(216,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 145',1),
	(217,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 146',1),
	(218,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 147',1),
	(219,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 148',1),
	(220,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 149',1),
	(221,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 150',1),
	(222,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 151',1),
	(223,'Alan','alan@turing.com','CoogExpress: New tracking history!','Hello, Alan!\n\n A new tracking history has been created for you.\n Tracking history ID: 152',1),
	(224,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 153',1),
	(225,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 154',1),
	(226,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 155',1),
	(227,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 156',1),
	(228,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 157',1),
	(229,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 158',1),
	(230,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 159',1),
	(231,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 160',1),
	(232,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 161',1),
	(233,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 162',1),
	(234,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 163',1),
	(235,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 164',1),
	(236,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 165',1),
	(237,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 166',1),
	(238,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 167',1),
	(239,'Alan','alan@turing.com','CoogExpress: New tracking history!','Hello, Alan!\n\n A new tracking history has been created for you.\n Tracking history ID: 168',1),
	(240,'Alan','alan@turing.com','CoogExpress: New tracking history!','Hello, Alan!\n\n A new tracking history has been created for you.\n Tracking history ID: 169',1),
	(241,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 170',1),
	(242,'Alan','alan@turing.com','CoogExpress: New tracking history!','Hello, Alan!\n\n A new tracking history has been created for you.\n Tracking history ID: 171',1),
	(243,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 172',1),
	(244,'Alan','alan@turing.com','CoogExpress: New tracking history!','Hello, Alan!\n\n A new tracking history has been created for you.\n Tracking history ID: 173',1),
	(245,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 174',1),
	(246,'Kaitlin','wood.kaitlin3@gmail.com','CoogExpress: New tracking history!','Hello, Kaitlin!\n\n A new tracking history has been created for you.\n Tracking history ID: 175',1),
	(247,'Kaitlin','wood.kaitlin3@gmail.com','CoogExpress: New tracking history!','Hello, Kaitlin!\n\n A new tracking history has been created for you.\n Tracking history ID: 176',1),
	(248,'Kaitlin','wood.kaitlin3@gmail.com','CoogExpress: New tracking history!','Hello, Kaitlin!\n\n A new tracking history has been created for you.\n Tracking history ID: 177',1),
	(249,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 178',1),
	(250,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 179',1),
	(251,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 180',1),
	(252,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 181',1),
	(253,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 182',1),
	(254,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 183',1),
	(255,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 184',1),
	(256,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 185',1),
	(257,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 186',1),
	(258,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 187',1),
	(259,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 188',1),
	(260,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 189',1),
	(261,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 190',1),
	(262,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 191',1),
	(263,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 192',1),
	(264,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 193',1),
	(265,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 194',1),
	(266,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 195',1),
	(267,'Ada','nikolasvelazquez@yahoo.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 196',1),
	(268,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 197',1),
	(269,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 198',1),
	(270,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 199',1),
	(271,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 200',1),
	(272,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 201',1),
	(273,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 202',1),
	(274,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 203',1),
	(275,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 204',1),
	(276,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 205',1),
	(277,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 206',1),
	(278,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 207',1),
	(279,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 208',1),
	(280,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 209',1),
	(281,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 210',1),
	(282,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 211',1),
	(283,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 212',1),
	(284,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 213',1),
	(285,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 214',1),
	(286,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 215',1),
	(287,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 216',1),
	(288,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 217',1),
	(289,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 218',1),
	(290,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 219',1),
	(291,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 220',1),
	(292,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 221',1),
	(293,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 222',1),
	(294,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 223',1),
	(295,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 224',1),
	(296,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 225',1),
	(297,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 226',1),
	(298,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 227',1),
	(299,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 228',1),
	(300,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 229',1),
	(301,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 230',1),
	(302,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 231',1),
	(303,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 232',1),
	(304,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 233',1),
	(305,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 234',1),
	(306,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 235',1),
	(307,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 236',1),
	(308,'Kaitlin','wood.kaitlin3@gmail.com','CoogExpress: New tracking history!','Hello, Kaitlin!\n\n A new tracking history has been created for you.\n Tracking history ID: 237',1),
	(309,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 238',1),
	(310,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 239',1),
	(311,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 240',1),
	(312,'Kaitlin','wood.kaitlin3@gmail.com','CoogExpress: New tracking history!','Hello, Kaitlin!\n\n A new tracking history has been created for you.\n Tracking history ID: 241',1),
	(313,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 242',1),
	(314,'Kaitlin','wood.kaitlin3@gmail.com','CoogExpress: New tracking history!','Hello, Kaitlin!\n\n A new tracking history has been created for you.\n Tracking history ID: 243',1),
	(315,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 244',1),
	(316,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 245',1),
	(317,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 246',1),
	(318,'Kaitlin','wood.kaitlin3@gmail.com','CoogExpress: New tracking history!','Hello, Kaitlin!\n\n A new tracking history has been created for you.\n Tracking history ID: 247',1),
	(319,'Sam','samtest4@gmail.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 248',1),
	(320,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 249',1),
	(321,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 250',1),
	(322,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 251',1),
	(323,'Sam','samtest3@gamil.com','CoogExpress: New tracking history!','Hello, Sam!\n\n A new tracking history has been created for you.\n Tracking history ID: 252',1),
	(324,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 253',1),
	(325,'Bro','bro@bro.com','CoogExpress: New tracking history!','Hello, Bro!\n\n A new tracking history has been created for you.\n Tracking history ID: 254',1),
	(326,'Bro','bro@bro.com','CoogExpress: New tracking history!','Hello, Bro!\n\n A new tracking history has been created for you.\n Tracking history ID: 255',1),
	(327,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 256',1),
	(328,'Bro','bro@bro.com','CoogExpress: New tracking history!','Hello, Bro!\n\n A new tracking history has been created for you.\n Tracking history ID: 257',1),
	(329,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 258',1),
	(330,'Bro','bro@bro.com','CoogExpress: New tracking history!','Hello, Bro!\n\n A new tracking history has been created for you.\n Tracking history ID: 259',1),
	(331,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 260',1),
	(332,'Bro','bro@bro.com','CoogExpress: New tracking history!','Hello, Bro!\n\n A new tracking history has been created for you.\n Tracking history ID: 261',1),
	(333,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 262',1),
	(334,'Kaitlin','wood.kaitlin3@gmail.com','CoogExpress: New tracking history!','Hello, Kaitlin!\n\n A new tracking history has been created for you.\n Tracking history ID: 263',1),
	(335,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 264',1),
	(336,'Kaitlin','wood.kaitlin3@gmail.com','CoogExpress: New tracking history!','Hello, Kaitlin!\n\n A new tracking history has been created for you.\n Tracking history ID: 265',1),
	(337,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 266',1),
	(338,'Kaitlin','wood.kaitlin3@gmail.com','CoogExpress: New tracking history!','Hello, Kaitlin!\n\n A new tracking history has been created for you.\n Tracking history ID: 267',1),
	(339,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 268',1),
	(340,'Kaitlin','wood.kaitlin3@gmail.com','CoogExpress: New tracking history!','Hello, Kaitlin!\n\n A new tracking history has been created for you.\n Tracking history ID: 269',1),
	(341,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 270',1),
	(342,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 271',1),
	(343,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 272',1),
	(344,'Thomas','thomas@tthn.us','CoogExpress Management: Inventory Alert at Garden Ridge Branch','Dear Thomas\n\nThe inventory for \"Pens\" has reached the threshold at your branch. Please order new inventory as soon as possible for this branch\nThreshold: 200\nCurrent Inventory: 149',1),
	(345,'Thomas','thomas@tthn.us','CoogExpress Management: Inventory Alert at Garden Ridge Branch','Dear Thomas\n\nThe inventory for \"Markers\" has reached the threshold at your branch. Please order new inventory as soon as possible for this branch\nThreshold: 200\nCurrent Inventory: 26',1),
	(346,'Thomas','thomas@tthn.us','CoogExpress Management: Inventory Alert at Garden Ridge Branch','Dear Thomas\n\nThe inventory for \"Pencils\" has reached the threshold at your branch. Please order new inventory as soon as possible for this branch\nThreshold: 200\nCurrent Inventory: 10',1),
	(347,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 277',1),
	(348,'Kaitlin','wood.kaitlin3@gmail.com','CoogExpress: New tracking history!','Hello, Kaitlin!\n\n A new tracking history has been created for you.\n Tracking history ID: 280',1),
	(349,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 285',1),
	(350,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 291',1),
	(351,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 302',1),
	(352,'Alan','alan@turing.com','CoogExpress: New tracking history!','Hello, Alan!\n\n A new tracking history has been created for you.\n Tracking history ID: 303',1),
	(353,'Alan','alan@turing.com','CoogExpress: New tracking history!','Hello, Alan!\n\n A new tracking history has been created for you.\n Tracking history ID: 316',1),
	(354,'Alan','alan@turing.com','CoogExpress: New tracking history!','Hello, Alan!\n\n A new tracking history has been created for you.\n Tracking history ID: 323',1),
	(355,'Santa','santa@clause.com','CoogExpress: New tracking history!','Hello, Santa!\n\n A new tracking history has been created for you.\n Tracking history ID: 326',1),
	(356,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 327',1),
	(357,'Thomas','tommithn@icloud.com','CoogExpress Management: Inventory Alert at Sunset Park Branch','Dear Thomas\n\nThe inventory for \"Cardboard box\" has reached the threshold at your branch. Please order new inventory as soon as possible for this branch\nThreshold: 200\nCurrent Inventory: 199',1),
	(358,'Thomas','thomas@tthn.us','CoogExpress Management: Inventory Alert at Sunset Park Branch','Dear Thomas\n\nThe inventory for \"Packing peanuts\" has reached the threshold at your branch. Please order new inventory as soon as possible for this branch\nThreshold: 200\nCurrent Inventory: 200',1),
	(359,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 330',1);

/*!40000 ALTER TABLE `email_queue` ENABLE KEYS */;
UNLOCK TABLES;


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
  `role` enum('Associate','Driver','Manager') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `shirt_size` enum('XS','S','M','L','XL','2XL','3XL') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_driver_license_number` (`driver_license_number`),
  KEY `user_id` (`user_id`),
  KEY `branch_id` (`branch_id`),
  KEY `supervisor_id` (`supervisor_employee_id`),
  CONSTRAINT `fk_employee_branch_id` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_employee_supervisor_employee_id` FOREIGN KEY (`supervisor_employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_employee_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;

INSERT INTO `employee` (`id`, `user_id`, `branch_id`, `supervisor_employee_id`, `date_of_birth`, `gender`, `driver_license_number`, `role`, `shirt_size`)
VALUES
	(1,1,1,1,'2000-01-01','Male','1234567890123','Manager','M'),
	(2,2,1,1,'2001-02-02','Male','2345678901234','Associate','M'),
	(3,3,1,1,'2002-03-03','Male','3456789012345','Driver','M'),
	(4,4,1,1,'2004-04-04','Male','4567890123456','Driver','S'),
	(5,5,1,1,'2005-05-05','Male','5678901234567','Driver','S'),
	(6,6,1,1,'2024-04-19','Male','9234928749823','Manager','M'),
	(10,10,2,10,'2006-06-06','Male','0001234567890','Manager','XL'),
	(11,11,2,10,'2007-07-07','Male','0002345678901','Driver','M'),
	(12,12,2,10,'2008-08-08','Female','0004567890123','Associate','XS'),
	(20,50,3,20,'1972-12-26','Male','2200000000000','Manager','XL'),
	(21,51,3,20,'1909-02-12','Male','2200000000001','Driver','2XL'),
	(22,52,3,20,'1917-05-29','Male','2200000000002','Associate','L');

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
  `been_notified` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `branch_id` (`branch_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `fk_inventory_branch_id` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_inventory_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=213 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;

INSERT INTO `inventory` (`id`, `branch_id`, `product_id`, `quantity_in_stock`, `stock_alert_threshold`, `last_stock_update`, `been_notified`)
VALUES
	(33,14,1,204,200,'2024-04-18 16:19:25',0),
	(34,14,2,201,200,'2024-04-17 09:45:30',0),
	(35,14,3,2001,200,'2024-04-17 09:45:25',0),
	(36,14,4,0,200,'2024-04-15 19:09:45',0),
	(37,14,5,0,200,'2024-04-15 19:09:45',0),
	(38,14,6,0,200,'2024-04-15 19:09:45',0),
	(39,14,7,0,200,'2024-04-15 19:09:45',0),
	(40,14,8,0,200,'2024-04-15 19:09:45',0),
	(41,14,9,0,200,'2024-04-15 19:09:45',0),
	(42,14,10,0,200,'2024-04-15 19:09:45',0),
	(43,14,11,0,200,'2024-04-15 19:09:45',0),
	(44,14,12,0,200,'2024-04-15 19:09:45',0),
	(45,14,13,10,200,'2024-04-17 18:51:55',1),
	(46,14,14,26,200,'2024-04-17 18:51:30',1),
	(47,14,15,6600,200,'2024-04-17 09:52:46',0),
	(48,1,1,185,200,'2024-04-18 16:55:25',1),
	(49,1,2,192,200,'2024-04-18 16:19:25',1),
	(50,1,3,201,200,'2024-04-17 19:36:07',0),
	(51,1,4,201,200,'2024-04-17 19:36:07',0),
	(52,1,5,201,200,'2024-04-17 19:36:07',0),
	(53,1,6,201,200,'2024-04-17 19:36:07',0),
	(54,1,7,201,200,'2024-04-17 19:36:07',0),
	(55,1,8,201,200,'2024-04-17 19:36:07',0),
	(56,1,9,201,200,'2024-04-17 19:36:07',0),
	(57,1,10,201,200,'2024-04-17 19:36:07',0),
	(58,1,11,201,200,'2024-04-17 19:36:07',0),
	(59,1,12,201,200,'2024-04-17 19:36:07',0),
	(60,1,13,201,200,'2024-04-17 19:36:08',0),
	(61,1,14,201,200,'2024-04-17 19:36:08',0),
	(62,1,15,201,200,'2024-04-17 19:36:08',0),
	(63,2,1,201,200,'2024-04-17 19:40:03',0),
	(64,2,2,201,200,'2024-04-17 19:40:04',0),
	(65,2,3,201,200,'2024-04-17 19:40:04',0),
	(66,2,4,201,200,'2024-04-17 19:40:04',0),
	(67,2,5,201,200,'2024-04-17 19:40:04',0),
	(68,2,6,201,200,'2024-04-17 19:40:04',0),
	(69,2,7,201,200,'2024-04-17 19:40:04',0),
	(70,2,8,201,200,'2024-04-17 19:40:04',0),
	(71,2,9,201,200,'2024-04-17 19:40:04',0),
	(72,2,10,201,200,'2024-04-17 19:40:04',0),
	(73,2,11,201,200,'2024-04-17 19:40:04',0),
	(74,2,12,201,200,'2024-04-17 19:40:04',0),
	(75,2,13,201,200,'2024-04-17 19:40:04',0),
	(76,2,14,201,200,'2024-04-17 19:40:04',0),
	(77,2,15,201,200,'2024-04-17 19:40:04',0),
	(78,3,1,201,200,'2024-04-17 19:40:09',0),
	(79,3,2,201,200,'2024-04-17 19:40:09',0),
	(80,3,3,201,200,'2024-04-17 19:40:09',0),
	(81,3,4,201,200,'2024-04-17 19:40:09',0),
	(82,3,5,201,200,'2024-04-17 19:40:09',0),
	(83,3,6,201,200,'2024-04-17 19:40:10',0),
	(84,3,7,201,200,'2024-04-17 19:40:10',0),
	(85,3,8,201,200,'2024-04-17 19:40:10',0),
	(86,3,9,201,200,'2024-04-17 19:40:10',0),
	(87,3,10,201,200,'2024-04-17 19:40:10',0),
	(88,3,11,201,200,'2024-04-17 19:40:10',0),
	(89,3,12,201,200,'2024-04-17 19:40:10',0),
	(90,3,13,201,200,'2024-04-17 19:40:10',0),
	(91,3,14,201,200,'2024-04-17 19:40:10',0),
	(92,3,15,201,200,'2024-04-17 19:40:10',0),
	(93,4,1,201,200,'2024-04-17 19:40:15',0),
	(94,4,2,201,200,'2024-04-17 19:40:15',0),
	(95,4,3,201,200,'2024-04-17 19:40:15',0),
	(96,4,4,201,200,'2024-04-17 19:40:15',0),
	(97,4,5,201,200,'2024-04-17 19:40:15',0),
	(98,4,6,201,200,'2024-04-17 19:40:15',0),
	(99,4,7,201,200,'2024-04-17 19:40:15',0),
	(100,4,8,201,200,'2024-04-17 19:40:15',0),
	(101,4,9,201,200,'2024-04-17 19:40:15',0),
	(102,4,10,201,200,'2024-04-17 19:40:15',0),
	(103,4,11,201,200,'2024-04-17 19:40:16',0),
	(104,4,12,201,200,'2024-04-17 19:40:16',0),
	(105,4,13,201,200,'2024-04-17 19:40:16',0),
	(106,4,14,201,200,'2024-04-17 19:40:16',0),
	(107,4,15,201,200,'2024-04-17 19:40:16',0),
	(108,5,1,201,200,'2024-04-17 19:40:27',0),
	(109,5,2,201,200,'2024-04-17 19:40:27',0),
	(110,5,3,201,200,'2024-04-17 19:40:27',0),
	(111,5,4,201,200,'2024-04-17 19:40:27',0),
	(112,5,5,201,200,'2024-04-17 19:40:27',0),
	(113,5,6,201,200,'2024-04-17 19:40:27',0),
	(114,5,7,201,200,'2024-04-17 19:40:27',0),
	(115,5,8,201,200,'2024-04-17 19:40:27',0),
	(116,5,9,201,200,'2024-04-17 19:40:27',0),
	(117,5,10,201,200,'2024-04-17 19:40:27',0),
	(118,5,11,201,200,'2024-04-17 19:40:27',0),
	(119,5,12,201,200,'2024-04-17 19:40:27',0),
	(120,5,13,201,200,'2024-04-17 19:40:27',0),
	(121,5,14,201,200,'2024-04-17 19:40:27',0),
	(122,5,15,201,200,'2024-04-17 19:40:28',0),
	(123,6,1,201,200,'2024-04-17 19:40:30',0),
	(124,6,2,201,200,'2024-04-17 19:40:31',0),
	(125,6,3,201,200,'2024-04-17 19:40:31',0),
	(126,6,4,201,200,'2024-04-17 19:40:31',0),
	(127,6,5,201,200,'2024-04-17 19:40:31',0),
	(128,6,6,201,200,'2024-04-17 19:40:31',0),
	(129,6,7,201,200,'2024-04-17 19:40:31',0),
	(130,6,8,201,200,'2024-04-17 19:40:31',0),
	(131,6,9,201,200,'2024-04-17 19:40:31',0),
	(132,6,10,201,200,'2024-04-17 19:40:31',0),
	(133,6,11,201,200,'2024-04-17 19:40:31',0),
	(134,6,12,201,200,'2024-04-17 19:40:31',0),
	(135,6,13,201,200,'2024-04-17 19:40:31',0),
	(136,6,14,201,200,'2024-04-17 19:40:31',0),
	(137,6,15,201,200,'2024-04-17 19:40:31',0),
	(138,7,1,201,200,'2024-04-17 19:40:34',0),
	(139,7,2,201,200,'2024-04-17 19:40:34',0),
	(140,7,3,201,200,'2024-04-17 19:40:34',0),
	(141,7,4,201,200,'2024-04-17 19:40:34',0),
	(142,7,5,201,200,'2024-04-17 19:40:34',0),
	(143,7,6,201,200,'2024-04-17 19:40:34',0),
	(144,7,7,201,200,'2024-04-17 19:40:34',0),
	(145,7,8,201,200,'2024-04-17 19:40:34',0),
	(146,7,9,201,200,'2024-04-17 19:40:34',0),
	(147,7,10,201,200,'2024-04-17 19:40:34',0),
	(148,7,11,201,200,'2024-04-17 19:40:34',0),
	(149,7,12,201,200,'2024-04-17 19:40:34',0),
	(150,7,13,201,200,'2024-04-17 19:40:34',0),
	(151,7,14,201,200,'2024-04-17 19:40:34',0),
	(152,7,15,201,200,'2024-04-17 19:40:34',0),
	(153,8,1,201,200,'2024-04-17 19:40:36',0),
	(154,8,2,201,200,'2024-04-17 19:40:37',0),
	(155,8,3,201,200,'2024-04-17 19:40:37',0),
	(156,8,4,201,200,'2024-04-17 19:40:37',0),
	(157,8,5,201,200,'2024-04-17 19:40:37',0),
	(158,8,6,201,200,'2024-04-17 19:40:37',0),
	(159,8,7,201,200,'2024-04-17 19:40:37',0),
	(160,8,8,201,200,'2024-04-17 19:40:37',0),
	(161,8,9,201,200,'2024-04-17 19:40:37',0),
	(162,8,10,201,200,'2024-04-17 19:40:37',0),
	(163,8,11,201,200,'2024-04-17 19:40:37',0),
	(164,8,12,201,200,'2024-04-17 19:40:37',0),
	(165,8,13,201,200,'2024-04-17 19:40:37',0),
	(166,8,14,201,200,'2024-04-17 19:40:37',0),
	(167,8,15,201,200,'2024-04-17 19:40:37',0),
	(168,9,1,201,200,'2024-04-17 19:40:39',0),
	(169,9,2,201,200,'2024-04-17 19:40:39',0),
	(170,9,3,201,200,'2024-04-17 19:40:40',0),
	(171,9,4,201,200,'2024-04-17 19:40:40',0),
	(172,9,5,201,200,'2024-04-17 19:40:40',0),
	(173,9,6,201,200,'2024-04-17 19:40:40',0),
	(174,9,7,201,200,'2024-04-17 19:40:40',0),
	(175,9,8,201,200,'2024-04-17 19:40:40',0),
	(176,9,9,201,200,'2024-04-17 19:40:40',0),
	(177,9,10,201,200,'2024-04-17 19:40:40',0),
	(178,9,11,201,200,'2024-04-17 19:40:40',0),
	(179,9,12,201,200,'2024-04-17 19:40:40',0),
	(180,9,13,201,200,'2024-04-17 19:40:40',0),
	(181,9,14,201,200,'2024-04-17 19:40:40',0),
	(182,9,15,201,200,'2024-04-17 19:40:40',0),
	(183,10,1,201,200,'2024-04-17 19:40:43',0),
	(184,10,2,201,200,'2024-04-17 19:40:43',0),
	(185,10,3,201,200,'2024-04-17 19:40:43',0),
	(186,10,4,201,200,'2024-04-17 19:40:43',0),
	(187,10,5,201,200,'2024-04-17 19:40:43',0),
	(188,10,6,201,200,'2024-04-17 19:40:43',0),
	(189,10,7,201,200,'2024-04-17 19:40:43',0),
	(190,10,8,201,200,'2024-04-17 19:40:43',0),
	(191,10,9,201,200,'2024-04-17 19:40:43',0),
	(192,10,10,201,200,'2024-04-17 19:40:44',0),
	(193,10,11,201,200,'2024-04-17 19:40:44',0),
	(194,10,12,201,200,'2024-04-17 19:40:44',0),
	(195,10,13,201,200,'2024-04-17 19:40:44',0),
	(196,10,14,201,200,'2024-04-17 19:40:44',0),
	(197,10,15,201,200,'2024-04-17 19:40:44',0);

/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

DELIMITER ;;
/*!50003 SET SESSION SQL_MODE="ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO" */;;
/*!50003 CREATE */ /*!50017 DEFINER=`wizard`@`%` */ /*!50003 TRIGGER `notify_manager_inventory` BEFORE UPDATE ON `inventory` FOR EACH ROW BEGIN
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
    
	IF NEW.quantity_in_stock <= NEW.stock_alert_threshold AND OLD.been_notified = FALSE THEN	-- If inventory is less than threshold and not been notified.
		SET NEW.been_notified = TRUE;
        
        SET email_subject = CONCAT('CoogExpress Management: Inventory Alert at ', branch_name);
        SET email_body = CONCAT('Dear ', manager_name, '

The inventory for "', product_name, '" has reached the threshold at your branch. Please order new inventory as soon as possible for this branch
Threshold: ', NEW.stock_alert_threshold, '
Current Inventory: ', NEW.quantity_in_stock);
        
		INSERT INTO email_queue (
			user_first_name,
            user_email,
            email_subject,
            email_body,
            processed
        ) VALUES (manager_name, manager_email, email_subject, email_body, false);
	ELSEIF NEW.quantity_in_stock > NEW.stock_alert_threshold AND NEW.been_notified = TRUE THEN	-- If inventory has been restocked
		SET NEW.been_notified = FALSE;
	END IF;
    
END */;;
DELIMITER ;
/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;




# Dump of table package
# ------------------------------------------------------------

DROP TABLE IF EXISTS `package`;

CREATE TABLE `package` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `sender_customer_id` int unsigned NOT NULL,
  `receiver_customer_id` int unsigned NOT NULL,
  `source_branch_id` int unsigned NOT NULL,
  `destination_address_id` int unsigned NOT NULL,
  `type` enum('Mail','Parcel') NOT NULL,
  `width` int unsigned NOT NULL,
  `length` int unsigned NOT NULL,
  `height` int unsigned NOT NULL,
  `weight` int unsigned NOT NULL,
  `special_handling_instructions` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `delivery_instructions` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `base_shipping_cost` decimal(5,2) unsigned NOT NULL,
  `additional_fees` decimal(5,2) unsigned NOT NULL,
  `speed` enum('Standard','Express','Overnight') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sender_customer_id` (`sender_customer_id`),
  KEY `receiver_customer_id` (`receiver_customer_id`),
  KEY `source_branch_id` (`source_branch_id`),
  KEY `destination_address_id` (`destination_address_id`),
  CONSTRAINT `fk_package_destination_address_id` FOREIGN KEY (`destination_address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_package_receiver_customer_id` FOREIGN KEY (`receiver_customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_package_sender_customer_id` FOREIGN KEY (`sender_customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_package_source_branch_id` FOREIGN KEY (`source_branch_id`) REFERENCES `branch` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;

INSERT INTO `package` (`id`, `sender_customer_id`, `receiver_customer_id`, `source_branch_id`, `destination_address_id`, `type`, `width`, `length`, `height`, `weight`, `special_handling_instructions`, `delivery_instructions`, `base_shipping_cost`, `additional_fees`, `speed`)
VALUES
	(8,3,5,1,1,'Parcel',1,2,3,4,NULL,NULL,4.99,1.99,'Express'),
	(9,20,1,1,377,'Parcel',1,2,3,4,'Whatever','Bruh',4.99,4.99,'Overnight'),
	(10,4,20,1,383,'Parcel',1,2,3,4,NULL,NULL,4.99,1.99,'Express'),
	(11,3,6,1,386,'Parcel',1,2,3,0,NULL,NULL,4.99,1.99,'Standard'),
	(12,2,5,1,1,'Mail',3,4,60,188,NULL,NULL,0.99,4.99,'Overnight'),
	(13,2,5,1,390,'Parcel',2,3,4,0,NULL,NULL,4.99,1.99,'Express'),
	(14,2,4,1,391,'Parcel',3,4,5,0,NULL,NULL,4.99,1.99,'Express'),
	(15,4,3,1,397,'Parcel',2,3,4,5,NULL,NULL,4.99,1.99,'Express'),
	(16,1,6,1,491,'Mail',1,2,3,4,'Fragile, keep upright','Ring doorbell',0.99,1.99,'Express'),
	(17,6,3,1,492,'Parcel',7,6,5,4,NULL,NULL,4.99,4.99,'Overnight'),
	(18,8,9,1,520,'Mail',1,2,3,4,'Call me','Don\'t call me',0.99,0.00,'Standard'),
	(19,8,9,1,522,'Parcel',1,1,1,1,'Test 4','Test 444',4.99,1.99,'Express'),
	(20,8,9,1,523,'Parcel',7,7,7,7,'Test 5 hello','hello test 5',4.99,0.00,'Standard'),
	(21,9,8,1,524,'Parcel',1,12,222,222,'Test 6 yes','Test 6 no',4.99,0.00,'Standard'),
	(22,8,9,1,525,'Parcel',12,12,12,12,'Test 7 iii','Test 7 ooo',4.99,0.00,'Standard'),
	(23,8,9,2,533,'Parcel',5,5,5,5,'Hi','Hi',4.99,0.00,'Standard'),
	(24,9,8,1,538,'Parcel',11,1,1,1,'New Test','New Test',4.99,0.00,'Standard'),
	(25,9,8,1,541,'Mail',1,1,1,1,'Hello','Can you see me?',0.99,1.99,'Express'),
	(26,8,9,1,543,'Parcel',1,1,1,1,'Different branch plz','different branch',4.99,0.00,'Standard'),
	(27,3,6,1,546,'Parcel',1,2,3,4,NULL,NULL,4.99,1.99,'Express'),
	(28,9,8,1,555,'Parcel',99,999,999,999,'Hello,','Don\'t knock',4.99,1.99,'Express'),
	(29,10,4,1,558,'Parcel',7,8,6,9,'Fragile, keep upright','Ring doorbell',4.99,1.99,'Express'),
	(30,3,10,1,559,'Mail',8,6,5,93,'aewfawef','awefawef',0.99,0.00,'Standard'),
	(31,10,20,1,567,'Parcel',234,232,23,234,NULL,NULL,4.99,1.99,'Express'),
	(32,10,6,1,568,'Mail',98,987,7,8,NULL,NULL,0.99,0.00,'Standard'),
	(33,5,6,2,577,'Parcel',5,4,3,7,NULL,NULL,4.99,1.99,'Express'),
	(34,3,20,1,580,'Mail',1,2,3,4,NULL,NULL,4.99,1.99,'Overnight'),
	(35,1,2,1,587,'Parcel',1,2,3,4,'Hello','World',4.99,1.99,'Standard'),
	(36,20,2,1,596,'Mail',1,2,3,4,NULL,NULL,4.99,1.99,'Express'),
	(37,1,4,1,597,'Mail',9,8,7,6,NULL,NULL,0.99,0.00,'Standard'),
	(38,1,5,2,608,'Mail',1,2,3,4,NULL,NULL,0.99,4.99,'Overnight'),
	(39,1,2,1,590,'Mail',1,2,3,4,NULL,NULL,0.99,4.99,'Overnight'),
	(40,2,1,1,613,'Mail',1,2,3,4,NULL,NULL,0.99,0.00,'Standard'),
	(41,1,3,1,614,'Parcel',7,8,9,100,NULL,NULL,4.99,0.00,'Standard'),
	(42,20,1,1,621,'Parcel',8,8,8,6,NULL,NULL,4.99,0.00,'Standard'),
	(43,2,1,1,622,'Parcel',6,6,6,6,NULL,NULL,4.99,4.99,'Overnight'),
	(44,1,3,1,623,'Mail',9,9,9,9,NULL,NULL,0.99,4.99,'Overnight'),
	(45,1,8,1,624,'Parcel',1,2,3,10,NULL,NULL,4.99,1.99,'Express'),
	(46,2,6,1,643,'Parcel',1,2,3,4,NULL,NULL,4.99,4.99,'Overnight');

/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;

DELIMITER ;;
/*!50003 SET SESSION SQL_MODE="ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO" */;;
/*!50003 CREATE */ /*!50017 DEFINER=`wizard`@`%` */ /*!50003 TRIGGER `package_insert_trigger` AFTER INSERT ON `package` FOR EACH ROW BEGIN
    DECLARE source_branch_address_id INT;

    -- Lookup the address_id of the branch associated with the package
    SELECT address_id INTO source_branch_address_id FROM branch WHERE id = NEW.source_branch_id;

    -- Insert the package details into the tracking_history table
    INSERT INTO tracking_history (package_id, address_id, timestamp, status)
    VALUES (NEW.id, source_branch_address_id, NOW(), 'Pending');
END */;;
DELIMITER ;
/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;




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
  `category` enum('','Packaging Supplies','Mailing Supplies','Office Supplies','Writing Instruments') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `width` decimal(5,2) unsigned NOT NULL,
  `length` decimal(5,2) unsigned NOT NULL,
  `height` decimal(5,2) unsigned NOT NULL,
  `weight` decimal(8,2) unsigned NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;

INSERT INTO `product` (`id`, `sku`, `upc`, `price`, `name`, `description`, `category`, `width`, `length`, `height`, `weight`, `image`, `deleted`)
VALUES
	(1,'SKU123456789','UPC123456789',29.99,'Cardboard box','Cardboard box description.','Packaging Supplies',10.50,20.20,5.30,2.50,'https://mobileimages.lowes.com/productimages/afed5ff5-1bda-4ad2-b031-a13314fa16e7/42684443.jpg',0),
	(2,'SKU234567890','UPC234567890',49.99,'Packing peanuts','Packing peanuts description.','Packaging Supplies',15.00,25.60,7.80,3.20,'https://i.ebayimg.com/images/g/CjQAAOSwkIViQ0CH/s-l1600.jpg',0),
	(3,'SKU345678901','UPC345678901',19.99,'Sticky notes','Description for Product 3','Office Supplies',8.80,18.30,4.50,1.80,'https://m.media-amazon.com/images/I/31RenxZFmyL._AC_.jpg',0),
	(4,'SKU456789012','UPC456789012',39.99,'Folders','Description for Product 4','Office Supplies',12.30,22.00,6.10,2.90,'https://content.oppictures.com/Master_Images/Master_Variants/Variant_1500/318407.jpg',0),
	(5,'SKU567890123','UPC567890123',59.99,'Printer paper','Description for Product 5','Office Supplies',17.60,28.90,8.40,3.70,'https://m.media-amazon.com/images/I/51UdahrtjbL._AC_UF894,1000_QL80_.jpg',0),
	(6,'SKU678901234','UPC678901234',24.99,'Envelopes','Description for Product 6','Mailing Supplies',9.50,19.60,4.90,2.10,'https://www.thepapermillstore.com/media/catalog/product/cache/5047a2311a997d085667c7c24fe13a2a/F/i/Fine_Impressions_Ecru_Envelopes_No_4_Baronial.jpg',0),
	(7,'SKU789012345','UPC789012345',34.99,'Stamps','Description for Product 7','Mailing Supplies',11.80,21.20,5.70,2.60,'https://cdn11.bigcommerce.com/s-9xwo1raw7u/images/stencil/1280x1280/products/80281/102834/USA-5655__43248.1711098030.jpg?c=1',0),
	(8,'SKU890123456','UPC890123456',44.99,'Stapler','Description for Product 8','Office Supplies',14.10,23.80,7.00,3.10,'https://media.accobrands.com/media/560-560/400328.jpg?width=680px&height=449px',0),
	(9,'SKU901234567','UPC901234567',54.99,'Scissors','Description for Product 9','Office Supplies',16.40,27.50,8.30,3.90,'https://m.media-amazon.com/images/I/41KNc7ewKIL._AC_UF1000,1000_QL80_.jpg',0),
	(10,'SKU012345678','UPC012345678',14.99,'Duct Tape','Description for Product 10','Office Supplies',7.20,16.90,3.80,1.50,'https://img.uline.com/is/image/uline/S-6519?$Mobile_Zoom$',0),
	(11,'SKU112233445','UPC112233445',99.99,'Clear Tape','Description for Product 11','Office Supplies',21.40,35.60,9.50,4.50,'https://www.lpmsystems.com/Shared/Images/Product/2-X-100M-Clear-Tape-2-Mil-Acrylic/GTA48MMx100M.png',0),
	(12,'SKU223344556','UPC223344556',74.99,'Highlighters','Description for Product 12','Writing Instruments',18.70,30.10,8.90,3.80,'https://media.officedepot.com/images/f_auto,q_auto,e_sharpen,h_450/products/128844/128844_o03_office_depot_brand_chisel_tip_highlighter_051623/128844',0),
	(13,'SKU334455667','UPC334455667',84.99,'Pencils','Description for Product 13','Writing Instruments',20.00,32.40,9.30,4.10,'https://m.media-amazon.com/images/I/81qxJ-PgGLL.jpg',0),
	(14,'SKU445566778','UPC445566778',64.99,'Markers','Description for Product 14','Writing Instruments',16.90,27.80,7.60,3.20,'https://dmzn2b8hkpq8b.cloudfront.net/images/products/515x515/S1234885_0.jpg',0),
	(15,'SKU556677889','UPC556677889',94.99,'Pens','Description for Product 15','Writing Instruments',22.60,36.50,10.10,4.70,'https://cdn.shopify.com/s/files/1/0013/9676/8815/products/BK440-A.png?v=1540500416&width=533',0);

/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table receipt
# ------------------------------------------------------------

DROP TABLE IF EXISTS `receipt`;

CREATE TABLE `receipt` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int unsigned NOT NULL,
  `branch_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `billing_id` int unsigned NOT NULL,
  `amount_bought` int unsigned NOT NULL,
  `subtotal` decimal(5,2) unsigned NOT NULL,
  `tax` decimal(5,2) unsigned NOT NULL,
  `total` decimal(5,2) unsigned NOT NULL,
  `timestamp` timestamp NOT NULL,
  `notes` varchar(2047) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `branch_id` (`branch_id`),
  KEY `billing_id` (`billing_id`),
  CONSTRAINT `fk_receipt_billing_id` FOREIGN KEY (`billing_id`) REFERENCES `billing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_receipt_branch_id` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_receipt_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `receipt` WRITE;
/*!40000 ALTER TABLE `receipt` DISABLE KEYS */;

INSERT INTO `receipt` (`id`, `customer_id`, `branch_id`, `product_id`, `billing_id`, `amount_bought`, `subtotal`, `tax`, `total`, `timestamp`, `notes`)
VALUES
	(1,1,1,1,31,1,0.00,0.00,0.00,'2024-04-13 21:13:27',''),
	(2,2,1,2,31,2,0.00,0.00,0.00,'2024-04-13 21:14:22',''),
	(3,2,1,3,31,3,0.00,0.00,0.00,'2024-04-14 23:49:15',''),
	(4,3,1,4,31,1,0.00,0.00,0.00,'2024-04-15 11:36:20',''),
	(5,3,1,5,31,4,0.00,0.00,0.00,'2024-04-16 11:39:02',''),
	(6,3,1,6,31,3,0.00,0.00,0.00,'2024-04-17 11:39:11',''),
	(7,4,1,7,31,2,0.00,0.00,0.00,'2024-04-17 11:50:39',''),
	(8,4,2,4,46,2,0.00,0.00,0.00,'2024-04-17 15:39:29','');

/*!40000 ALTER TABLE `receipt` ENABLE KEYS */;
UNLOCK TABLES;




# Dump of table route
# ------------------------------------------------------------

DROP TABLE IF EXISTS `route`;

CREATE TABLE `route` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `source_branch_id` int unsigned NOT NULL,
  `destination_branch_id` int unsigned NOT NULL,
  `driver_employee_id` int unsigned DEFAULT NULL,
  `start_timestamp` timestamp NULL DEFAULT NULL,
  `end_timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `start_address_id` (`source_branch_id`),
  KEY `end_address_id` (`destination_branch_id`),
  KEY `driver_employee_id` (`driver_employee_id`),
  CONSTRAINT `fk_route_driver_employee_id` FOREIGN KEY (`driver_employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_route_end_address_id` FOREIGN KEY (`destination_branch_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_route_start_address_id` FOREIGN KEY (`source_branch_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;

INSERT INTO `route` (`id`, `source_branch_id`, `destination_branch_id`, `driver_employee_id`, `start_timestamp`, `end_timestamp`)
VALUES
	(5,1,1,5,'2024-03-31 02:05:33','2024-04-01 21:08:00'),
	(6,1,2,3,'2024-04-01 03:06:33',NULL),
	(7,1,1,5,'2024-04-01 03:07:33',NULL),
	(8,1,2,4,'2024-04-01 03:08:33',NULL),
	(9,1,1,5,'2024-04-01 03:09:33',NULL),
	(10,1,1,5,'2024-04-01 03:10:12','2024-04-01 04:07:33'),
	(11,1,2,5,'2024-04-01 05:07:33','2024-04-02 05:06:33'),
	(12,1,2,4,'2024-04-02 06:06:33',NULL),
	(13,1,1,3,'2024-04-02 06:06:33',NULL),
	(14,1,8,5,'2024-04-02 06:06:33',NULL),
	(15,1,4,5,'2024-04-02 07:08:33','2024-04-02 08:09:33'),
	(16,1,4,5,'2024-04-03 08:09:33','2024-04-04 08:09:33'),
	(17,1,1,5,'2024-04-05 08:09:33','2024-04-06 01:09:33'),
	(18,1,2,5,'2024-04-07 02:09:33','2024-04-08 03:04:33'),
	(19,1,2,5,'2024-04-09 04:04:33','2024-04-09 06:02:33'),
	(20,1,2,5,'2024-04-10 07:02:33','2024-04-10 08:02:33'),
	(21,2,2,11,'2024-04-11 09:02:33','2024-04-11 13:02:33'),
	(22,2,2,11,'2024-04-11 14:01:33','2024-04-11 17:00:00'),
	(23,1,1,5,'2024-04-12 18:30:00','2024-04-12 19:20:00'),
	(24,1,1,5,'2024-04-12 20:30:00','2024-04-12 22:45:00'),
	(25,1,2,4,'2024-04-13 22:45:00','2024-04-13 23:15:00'),
	(26,2,2,11,'2024-04-14 00:15:00','2024-04-14 10:15:00'),
	(27,2,1,11,'2024-04-14 10:15:00',NULL),
	(28,1,1,5,'2024-04-16 00:15:00','2024-04-16 10:15:00'),
	(29,1,1,5,'2024-04-16 11:20:00','2024-04-17 04:10:00'),
	(30,1,1,5,'2024-04-17 11:10:00','2024-04-18 05:15:15'),
	(31,2,1,11,'2024-04-18 05:35:34','2024-04-18 05:35:53'),
	(32,1,1,5,'2024-04-18 05:36:46','2024-04-18 05:36:49'),
	(33,1,1,5,'2024-04-18 06:59:18','2024-04-18 06:59:52'),
	(34,1,1,5,'2024-04-18 07:03:51','2024-04-18 07:06:00'),
	(35,1,1,5,'2024-04-18 16:12:31','2024-04-18 16:12:38');

/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;




# Dump of table shipment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `shipment`;

CREATE TABLE `shipment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `package_id` int unsigned NOT NULL,
  `route_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_package_id_route_id` (`package_id`,`route_id`),
  KEY `package_id` (`package_id`),
  KEY `route_id` (`route_id`),
  CONSTRAINT `fk_shipment_package_id` FOREIGN KEY (`package_id`) REFERENCES `package` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_shipment_route_id` FOREIGN KEY (`route_id`) REFERENCES `route` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `shipment` WRITE;
/*!40000 ALTER TABLE `shipment` DISABLE KEYS */;

INSERT INTO `shipment` (`id`, `package_id`, `route_id`)
VALUES
	(14,8,5),
	(13,9,5),
	(15,10,6),
	(32,10,21),
	(36,10,22),
	(16,11,7),
	(17,12,8),
	(18,13,9),
	(19,14,10),
	(20,15,11),
	(21,16,12),
	(22,18,12),
	(23,19,13),
	(24,20,14),
	(25,21,15),
	(26,23,16),
	(27,24,17),
	(28,25,18),
	(31,25,21),
	(35,25,22),
	(29,26,19),
	(33,26,21),
	(34,26,22),
	(30,27,20),
	(37,27,22),
	(38,28,23),
	(40,29,24),
	(39,30,24),
	(41,31,25),
	(42,32,25),
	(43,32,26),
	(44,33,27),
	(45,33,28),
	(46,34,29),
	(47,37,30),
	(48,38,31),
	(49,38,32),
	(52,39,33),
	(51,40,33),
	(50,41,33),
	(54,42,34),
	(53,43,34),
	(56,44,34),
	(55,45,34),
	(57,46,35);

/*!40000 ALTER TABLE `shipment` ENABLE KEYS */;
UNLOCK TABLES;

DELIMITER ;;
/*!50003 SET SESSION SQL_MODE="ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO" */;;
/*!50003 CREATE */ /*!50017 DEFINER=`wizard`@`%` */ /*!50003 TRIGGER `shipment_insert_trigger` AFTER INSERT ON `shipment` FOR EACH ROW BEGIN
    DECLARE current_address_id INT;

    SELECT address_id
    INTO current_address_id
    FROM tracking_history
    WHERE package_id = NEW.package_id
    ORDER BY timestamp DESC
    LIMIT 1;

    INSERT INTO tracking_history (package_id, address_id, timestamp, status)
    VALUES (NEW.package_id, current_address_id, NOW(), 'Standby');
END */;;
DELIMITER ;
/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;


# Dump of table shopping_cart
# ------------------------------------------------------------

DROP TABLE IF EXISTS `shopping_cart`;

CREATE TABLE `shopping_cart` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `branch_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `quantity` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `branch_id` (`branch_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `shopping_cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `shopping_cart_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `shopping_cart_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;

INSERT INTO `shopping_cart` (`id`, `user_id`, `branch_id`, `product_id`, `quantity`)
VALUES
	(2,5,14,1,2),
	(15,5,1,2,8),
	(19,4,2,1,12),
	(20,4,1,3,3),
	(21,4,1,5,1),
	(22,4,1,6,10),
	(23,4,1,4,16),
	(27,22,1,1,1);

/*!40000 ALTER TABLE `shopping_cart` ENABLE KEYS */;
UNLOCK TABLES;




# Dump of table tracking_history
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tracking_history`;

CREATE TABLE `tracking_history` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `package_id` int unsigned NOT NULL,
  `address_id` int unsigned NOT NULL,
  `timestamp` timestamp NOT NULL,
  `status` enum('Pending','Standby','Shipping','Delivered','Lost') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `fk_tracking_history_address_id` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_tracking_history_package_id` FOREIGN KEY (`package_id`) REFERENCES `package` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=331 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `tracking_history` WRITE;
/*!40000 ALTER TABLE `tracking_history` DISABLE KEYS */;

INSERT INTO `tracking_history` (`id`, `package_id`, `address_id`, `timestamp`, `status`)
VALUES
	(167,8,1,'2024-03-23 08:36:59','Pending'),
	(168,9,1,'2024-03-29 16:04:11','Pending'),
	(169,9,1,'2024-04-01 16:05:12','Standby'),
	(170,8,1,'2024-04-02 16:05:12','Standby'),
	(171,9,378,'2024-04-03 16:05:50','Shipping'),
	(172,8,378,'2024-04-04 16:05:50','Shipping'),
	(173,9,377,'2024-04-11 16:07:27','Delivered'),
	(174,8,375,'2024-04-11 16:07:52','Lost'),
	(175,10,1,'2024-03-29 16:34:26','Pending'),
	(176,10,1,'2024-04-11 16:35:14','Standby'),
	(177,10,2,'2024-04-11 16:36:03','Pending'),
	(178,11,1,'2024-04-13 12:42:21','Pending'),
	(179,12,1,'2024-04-13 12:43:55','Pending'),
	(181,11,1,'2024-04-14 02:49:04','Standby'),
	(182,12,1,'2024-04-14 02:49:25','Standby'),
	(183,12,1,'2024-04-14 02:50:36','Lost'),
	(184,13,1,'2024-04-14 02:51:41','Pending'),
	(185,14,1,'2024-04-14 02:55:39','Pending'),
	(186,13,1,'2024-04-14 02:55:53','Standby'),
	(189,14,1,'2024-04-14 03:06:01','Standby'),
	(192,14,391,'2024-04-14 03:06:52','Delivered'),
	(193,15,1,'2024-04-14 03:07:31','Pending'),
	(195,15,1,'2024-04-14 03:08:16','Standby'),
	(196,15,397,'2024-04-14 03:08:25','Lost'),
	(197,16,1,'2024-04-15 23:56:36','Pending'),
	(198,17,1,'2024-04-15 23:57:08','Pending'),
	(200,18,1,'2024-04-16 17:04:32','Pending'),
	(201,17,492,'2024-04-16 17:06:39','Lost'),
	(202,16,1,'2024-04-16 17:07:14','Standby'),
	(203,18,1,'2024-04-16 17:07:19','Standby'),
	(204,19,1,'2024-04-16 17:10:57','Pending'),
	(205,20,1,'2024-04-16 17:11:57','Pending'),
	(206,21,1,'2024-04-16 17:12:58','Pending'),
	(207,22,1,'2024-04-16 17:14:34','Pending'),
	(208,18,526,'2024-04-16 17:26:48','Shipping'),
	(209,16,526,'2024-04-16 17:26:48','Shipping'),
	(210,16,528,'2024-04-16 17:32:15','Shipping'),
	(211,18,528,'2024-04-16 17:32:15','Shipping'),
	(212,19,1,'2024-04-16 17:37:38','Standby'),
	(213,20,1,'2024-04-16 17:43:19','Standby'),
	(214,21,1,'2024-04-16 17:43:51','Standby'),
	(215,21,530,'2024-04-16 17:47:45','Shipping'),
	(216,21,4,'2024-04-16 17:47:49','Pending'),
	(217,22,525,'2024-04-16 17:49:21','Lost'),
	(218,23,1,'2024-04-16 17:50:22','Pending'),
	(219,23,1,'2024-04-16 17:50:34','Standby'),
	(220,23,534,'2024-04-16 17:51:56','Shipping'),
	(221,23,4,'2024-04-16 17:52:08','Pending'),
	(222,24,1,'2024-04-16 18:13:29','Pending'),
	(223,24,1,'2024-04-16 18:17:00','Standby'),
	(224,24,539,'2024-04-16 18:18:16','Shipping'),
	(225,24,538,'2024-04-16 18:19:11','Delivered'),
	(226,25,1,'2024-04-16 18:22:43','Pending'),
	(227,25,1,'2024-04-16 18:23:05','Standby'),
	(228,25,2,'2024-04-16 18:25:21','Pending'),
	(229,26,1,'2024-04-16 18:29:04','Pending'),
	(230,26,1,'2024-04-16 18:29:17','Standby'),
	(231,26,544,'2024-04-16 18:30:04','Shipping'),
	(232,26,2,'2024-04-16 18:30:14','Pending'),
	(233,27,1,'2024-04-16 18:31:35','Pending'),
	(234,27,1,'2024-04-16 18:32:03','Standby'),
	(235,27,2,'2024-04-16 18:33:02','Pending'),
	(236,25,2,'2024-04-16 18:39:00','Standby'),
	(237,10,2,'2024-04-16 18:39:00','Standby'),
	(238,26,2,'2024-04-16 18:39:05','Standby'),
	(239,26,2,'2024-04-16 18:39:10','Standby'),
	(240,25,2,'2024-04-16 18:39:10','Standby'),
	(241,10,2,'2024-04-16 18:39:10','Standby'),
	(242,27,2,'2024-04-16 18:39:10','Standby'),
	(243,10,548,'2024-04-16 18:40:39','Shipping'),
	(244,26,548,'2024-04-16 18:40:39','Shipping'),
	(245,25,548,'2024-04-16 18:40:39','Shipping'),
	(246,25,541,'2024-04-16 18:40:45','Delivered'),
	(247,10,383,'2024-04-16 18:40:49','Delivered'),
	(248,26,543,'2024-04-16 18:40:51','Delivered'),
	(249,27,546,'2024-04-16 18:52:24','Lost'),
	(250,28,1,'2024-04-16 18:54:35','Pending'),
	(251,28,1,'2024-04-16 18:54:45','Standby'),
	(252,28,555,'2024-04-16 18:55:02','Lost'),
	(253,29,1,'2024-04-16 19:05:59','Pending'),
	(254,30,1,'2024-04-16 19:06:43','Pending'),
	(255,30,1,'2024-04-16 19:07:48','Standby'),
	(256,29,1,'2024-04-16 19:07:48','Standby'),
	(257,30,561,'2024-04-16 19:09:15','Shipping'),
	(258,29,561,'2024-04-16 19:09:15','Shipping'),
	(259,30,563,'2024-04-16 19:10:02','Shipping'),
	(260,29,563,'2024-04-16 19:10:02','Shipping'),
	(261,30,559,'2024-04-16 19:10:19','Delivered'),
	(262,29,558,'2024-04-16 19:10:34','Delivered'),
	(263,31,1,'2024-04-16 19:11:54','Pending'),
	(264,32,1,'2024-04-16 19:12:20','Pending'),
	(265,31,1,'2024-04-16 19:12:36','Standby'),
	(266,32,1,'2024-04-16 19:12:36','Standby'),
	(267,31,569,'2024-04-16 19:13:40','Shipping'),
	(268,32,569,'2024-04-16 19:13:40','Shipping'),
	(269,31,567,'2024-04-16 19:13:47','Lost'),
	(270,32,2,'2024-04-16 19:14:09','Pending'),
	(271,32,2,'2024-04-16 19:14:36','Standby'),
	(272,32,568,'2024-04-16 19:14:56','Delivered'),
	(273,33,2,'2024-04-17 20:22:55','Pending'),
	(274,33,2,'2024-04-17 20:24:35','Standby'),
	(275,33,1,'2024-04-17 20:24:43','Pending'),
	(276,33,1,'2024-04-17 20:25:14','Standby'),
	(277,33,577,'2024-04-17 20:25:23','Delivered'),
	(278,34,1,'2024-04-17 20:45:43','Pending'),
	(279,34,1,'2024-04-17 20:46:06','Standby'),
	(280,34,580,'2024-04-17 20:46:18','Delivered'),
	(281,35,1,'2024-04-17 23:34:27','Pending'),
	(282,36,1,'2024-04-17 23:54:28','Pending'),
	(283,37,1,'2024-04-18 04:54:40','Pending'),
	(284,37,1,'2024-04-18 04:54:49','Standby'),
	(285,37,597,'2024-04-18 04:55:13','Delivered'),
	(286,38,2,'2024-04-18 05:35:02','Pending'),
	(287,38,2,'2024-04-18 05:35:21','Standby'),
	(288,38,609,'2024-04-18 05:35:50','Shipping'),
	(289,38,1,'2024-04-18 05:35:52','Pending'),
	(290,38,1,'2024-04-18 05:36:35','Standby'),
	(291,38,608,'2024-04-18 05:36:48','Delivered'),
	(292,39,1,'2024-04-18 06:57:44','Pending'),
	(293,40,1,'2024-04-18 06:58:23','Pending'),
	(294,41,1,'2024-04-18 06:58:56','Pending'),
	(295,41,1,'2024-04-18 06:59:11','Standby'),
	(296,40,1,'2024-04-18 06:59:11','Standby'),
	(297,39,1,'2024-04-18 06:59:11','Standby'),
	(298,41,615,'2024-04-18 06:59:44','Shipping'),
	(299,40,615,'2024-04-18 06:59:44','Shipping'),
	(300,39,615,'2024-04-18 06:59:44','Shipping'),
	(301,41,614,'2024-04-18 06:59:45','Lost'),
	(302,39,590,'2024-04-18 06:59:48','Delivered'),
	(303,40,613,'2024-04-18 06:59:49','Delivered'),
	(304,42,1,'2024-04-18 07:01:12','Pending'),
	(305,43,1,'2024-04-18 07:01:50','Pending'),
	(306,44,1,'2024-04-18 07:02:25','Pending'),
	(307,45,1,'2024-04-18 07:03:21','Pending'),
	(308,43,1,'2024-04-18 07:03:47','Standby'),
	(309,42,1,'2024-04-18 07:03:47','Standby'),
	(310,45,1,'2024-04-18 07:03:47','Standby'),
	(311,44,1,'2024-04-18 07:03:47','Standby'),
	(312,44,625,'2024-04-18 07:04:26','Shipping'),
	(313,45,625,'2024-04-18 07:04:26','Shipping'),
	(314,43,625,'2024-04-18 07:04:26','Shipping'),
	(315,42,625,'2024-04-18 07:04:26','Shipping'),
	(316,43,622,'2024-04-18 07:04:29','Delivered'),
	(317,44,630,'2024-04-18 07:04:53','Shipping'),
	(318,45,630,'2024-04-18 07:04:53','Shipping'),
	(319,42,630,'2024-04-18 07:04:53','Shipping'),
	(320,45,633,'2024-04-18 07:05:19','Shipping'),
	(321,44,633,'2024-04-18 07:05:19','Shipping'),
	(322,42,633,'2024-04-18 07:05:19','Shipping'),
	(323,42,621,'2024-04-18 07:05:21','Delivered'),
	(324,44,637,'2024-04-18 07:05:53','Shipping'),
	(325,45,637,'2024-04-18 07:05:53','Shipping'),
	(326,45,624,'2024-04-18 07:05:55','Delivered'),
	(327,44,623,'2024-04-18 07:05:57','Delivered'),
	(328,46,1,'2024-04-18 16:12:10','Pending'),
	(329,46,1,'2024-04-18 16:12:17','Standby'),
	(330,46,643,'2024-04-18 16:12:33','Delivered');

/*!40000 ALTER TABLE `tracking_history` ENABLE KEYS */;
UNLOCK TABLES;

DELIMITER ;;
/*!50003 SET SESSION SQL_MODE="ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO" */;;
/*!50003 CREATE */ /*!50017 DEFINER=`wizard`@`%` */ /*!50003 TRIGGER `notify_customer` AFTER INSERT ON `tracking_history` FOR EACH ROW BEGIN
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
		SET email_body = CONCAT('Hello, ', customer_first_name, '!

 A new tracking history has been created for you.
 Tracking history ID: ', NEW.id);
		INSERT INTO email_queue (
			user_first_name,
			user_email,
			email_subject,
			email_body,
			processed
		) VALUES (customer_first_name, customer_email, email_subject, email_body, false);
    END IF;

END */;;
DELIMITER ;
/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;




# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(63) NOT NULL,
  `last_name` varchar(63) NOT NULL,
  `username` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone_number` char(10) NOT NULL,
  `phone_country_code` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address_id` int unsigned NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `last_login` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`),
  UNIQUE KEY `unique_phone_number` (`phone_number`),
  UNIQUE KEY `unique_username` (`username`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `fk_user_address_id` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `email`, `password_hash`, `phone_number`, `phone_country_code`, `address_id`, `profile_picture`, `created_at`, `last_login`, `deleted`)
VALUES
	(1,'Thomas','Nguyen','thomas','thomas@tthn.us','nguyen','0000000000','1',1,'https://cdn.discordapp.com/avatars/354864663579590656/63557e1ac09d078162e402b7ccb4f8d5.png?size=128','2024-03-17 12:30:45','2024-04-18 16:24:09',0),
	(2,'Brandon','Miramontes','brandon','brandon@miramontes.com','miramontes','1111111111','1',2,'https://cdn.discordapp.com/avatars/1074077467796582401/59b4e2334926f1a3ec85261648464c6d.png?size=128','2024-03-23 13:42:02','2024-04-18 16:11:05',0),
	(3,'Salim','Sanogho','salim','salim@sanogho.com','sanogho','2222222222','1',3,'https://cdn.discordapp.com/avatars/1013124526768406658/ece88637647dbdf3cc441279bc9355be.png?size=128','2024-03-23 13:45:09','2024-04-08 09:38:21',0),
	(4,'Nikolas','Velazquez','nikolas','nikolas@velazquez.com','velazquez','3333333333','1',4,'https://cdn.discordapp.com/avatars/234144333161299978/c0411ce9c43f2397d4626b650159fdce.png?size=128','2024-03-23 13:45:09','2024-04-18 12:42:58',0),
	(5,'Sam','Li','sam','sam@li.com','lilili','4444444444','1',5,'https://cdn.discordapp.com/avatars/550888319182176287/6023d54c18e7853518137efee812d10f.png?size=128','2024-03-23 13:45:09','2024-04-18 16:12:30',0),
	(6,'Ben','Tuason','ben','ben@tuanson.com','tuason','2810000000','1',575,NULL,'2024-04-16 19:28:42','2024-04-16 19:28:53',0),
	(10,'John','Cena','manager2','manager@branch2.com','manager2','1111100000','1',1,'https://i.pravatar.cc/400?img=11','2024-03-23 13:45:09','2024-04-17 22:34:50',0),
	(11,'Bob','Ross','driver2','driver@branch2.com','driver2','2222200000','1',2,'https://i.pravatar.cc/400?img=13','2024-03-23 13:45:09','2024-04-18 05:35:31',0),
	(12,'Felicia','Karen','associate2','associate@branch2.com','associate2','3333300000','1',3,'https://i.pravatar.cc/400?img=38','2024-03-23 13:45:09','2024-04-18 05:34:34',0),
	(20,'Alan','Turing','alan','alan@turing.com','turing','0000011111','1',1,'https://xsgames.co/randomusers/assets/avatars/male/1.jpg','2024-04-08 09:23:16','2024-04-18 16:22:23',0),
	(21,'Grace','Hopper','grace','grace@hopper.com','hopper','0000022222','1',2,'https://xsgames.co/randomusers/assets/avatars/female/2.jpg','2024-04-08 09:24:56','2024-04-18 16:10:58',0),
	(22,'Ada','Lovelace','ada','ada@lovelace.com','lovelace','0000033333','1',3,'https://xsgames.co/randomusers/assets/avatars/female/3.jpg','2024-04-08 09:26:06','2024-04-18 16:23:27',0),
	(23,'Dennis','Ritchie','dennis','dennis@ritchie.com','ritchie','0000044444','1',4,'https://xsgames.co/randomusers/assets/avatars/male/4.jpg','2024-04-08 09:27:28','2024-04-15 23:52:46',0),
	(24,'Linus','Torvalds','linus','linus@torvalds.com','torvalds','0000055555','1',5,'https://xsgames.co/randomusers/assets/avatars/male/5.jpg','2024-04-08 09:28:18','2024-04-08 09:37:33',0),
	(25,'John','Conway','john','john@conway.com','conway','0000066666','1',6,'https://xsgames.co/randomusers/assets/avatars/male/6.jpg','2024-04-08 09:28:53','2024-04-08 09:53:16',0),
	(26,'Sammy','Green','sammy','sammy@green.com','password','0000077777','1',507,'https://xsgames.co/randomusers/assets/avatars/male/7.jpg','2024-04-16 16:22:45','2024-04-16 16:29:42',1),
	(27,'Santa','Clause','santa','santa@clause.com','password','0000088888','1',514,'https://xsgames.co/randomusers/assets/avatars/male/8.jpg','2024-04-16 16:36:56','2024-04-16 18:55:14',0),
	(28,'Hello','World','hello','hello@world.com','password','0000099999','1',518,'https://xsgames.co/randomusers/assets/avatars/male/4.jpg','2024-04-16 16:58:19','2024-04-16 18:23:19',0),
	(29,'Real','User','real','real@user.com','password','0001111000','1',378,'https://xsgames.co/randomusers/assets/avatars/male/8.jpg','2024-04-16 19:04:32','2024-04-16 19:17:09',1),
	(50,'Harry','Truman','manager3','harry@truman.com','manager3','2200000000','1',584,NULL,'2024-04-17 22:31:54','2024-04-17 22:35:03',0),
	(51,'Abraham','Lincoln','driver3','abraham@lincoln.com','driver3','2200000001','1',585,NULL,'2024-04-17 22:37:09','2024-04-17 22:37:09',0),
	(52,'John','Kennedy','associate3','john@kennedy.com','associate3','2200000002','1',586,NULL,'2024-04-17 22:40:04','2024-04-17 22:40:04',0),
	(100,'Kaitlin','Wood','kaitlin','wood.kaitlin3@gmail.com','pass123','7130000000','1',376,'https://i.imgur.com/eNAyC5U.jpeg','2024-04-11 16:01:39','2024-04-17 23:43:08',0);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of view package_view
# ------------------------------------------------------------

DROP TABLE IF EXISTS `package_view`; DROP VIEW IF EXISTS `package_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wizard`@`%` SQL SECURITY DEFINER VIEW `package_view`
AS SELECT
   `p`.`id` AS `package_id`,
   `p`.`sender_customer_id` AS `sender_customer_id`,
   `p`.`receiver_customer_id` AS `receiver_customer_id`,
   `p`.`source_branch_id` AS `source_branch_id`,
   `p`.`destination_address_id` AS `destination_address_id`,
   `p`.`type` AS `type`,
   `p`.`width` AS `width`,
   `p`.`length` AS `length`,
   `p`.`height` AS `height`,
   `p`.`weight` AS `weight`,
   `p`.`special_handling_instructions` AS `special_handling_instructions`,
   `p`.`delivery_instructions` AS `delivery_instructions`,
   `p`.`base_shipping_cost` AS `base_shipping_cost`,
   `p`.`additional_fees` AS `additional_fees`,
   `p`.`speed` AS `speed`,
   `sender`.`first_name` AS `sender_first_name`,
   `sender`.`last_name` AS `sender_last_name`,
   `sender`.`username` AS `sender_username`,
   `sender`.`email` AS `sender_email`,
   `sender`.`phone_number` AS `sender_phone_number`,
   `sender`.`phone_country_code` AS `sender_phone_country_code`,
   `sender`.`profile_picture` AS `sender_profile_picture`,
   `receiver`.`first_name` AS `receiver_first_name`,
   `receiver`.`last_name` AS `receiver_last_name`,
   `receiver`.`username` AS `receiver_username`,
   `receiver`.`email` AS `receiver_email`,
   `receiver`.`phone_number` AS `receiver_phone_number`,
   `receiver`.`phone_country_code` AS `receiver_phone_country_code`,
   `receiver`.`profile_picture` AS `receiver_profile_picture`,
   `b`.`name` AS `source_branch_name`,
   `destination_address`.`line1` AS `destination_address_line1`,
   `destination_address`.`line2` AS `destination_address_line2`,
   `destination_address`.`city` AS `destination_address_city`,
   `destination_address`.`state` AS `destination_address_state`,
   `destination_address`.`zip` AS `destination_address_zip`,
   `current_address`.`id` AS `current_address_id`,
   `current_address`.`line1` AS `current_address_line1`,
   `current_address`.`line2` AS `current_address_line2`,
   `current_address`.`city` AS `current_address_city`,
   `current_address`.`state` AS `current_address_state`,
   `current_address`.`zip` AS `current_address_zip`,(select `th`.`status`
FROM `tracking_history` `th` where (`th`.`package_id` = `p`.`id`) order by `th`.`timestamp` desc limit 1) AS `status`,(select `th`.`timestamp` from `tracking_history` `th` where (`th`.`package_id` = `p`.`id`) order by `th`.`timestamp` limit 1) AS `initiated_at`,(select `th`.`timestamp` from `tracking_history` `th` where ((`th`.`package_id` = `p`.`id`) and (`th`.`status` = 'Delivered')) order by `th`.`timestamp` desc limit 1) AS `delivered_at` from ((((((`package` `p` join `customer_view` `sender`) join `customer_view` `receiver`) join `branch` `b`) join `address` `destination_address`) join `address` `current_address`) join `tracking_history` `th`) where ((`p`.`sender_customer_id` = `sender`.`customer_id`) and (`p`.`receiver_customer_id` = `receiver`.`customer_id`) and (`p`.`source_branch_id` = `b`.`id`) and (`p`.`destination_address_id` = `destination_address`.`id`) and (`th`.`package_id` = `p`.`id`) and (`th`.`timestamp` = (select max(`tracking_history`.`timestamp`) from `tracking_history` where (`tracking_history`.`package_id` = `p`.`id`))) and (`th`.`address_id` = `current_address`.`id`)) order by `p`.`id`;

# Dump of view route_view
# ------------------------------------------------------------

DROP TABLE IF EXISTS `route_view`; DROP VIEW IF EXISTS `route_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wizard`@`%` SQL SECURITY DEFINER VIEW `route_view`
AS SELECT
   `r`.`id` AS `route_id`,
   `r`.`start_timestamp` AS `start_timestamp`,
   `r`.`end_timestamp` AS `end_timestamp`,
   `b1`.`branch_id` AS `source_branch_id`,
   `b1`.`name` AS `source_branch_name`,
   `b1`.`address_id` AS `source_branch_address_id`,
   `b1`.`line1` AS `source_branch_line1`,
   `b1`.`line2` AS `source_branch_line2`,
   `b1`.`city` AS `source_branch_city`,
   `b1`.`state` AS `source_branch_state`,
   `b1`.`zip` AS `source_branch_zip`,
   `b2`.`branch_id` AS `destination_branch_id`,
   `b2`.`name` AS `destination_branch_name`,
   `b2`.`address_id` AS `destination_branch_address_id`,
   `b2`.`line1` AS `destination_branch_line1`,
   `b2`.`line2` AS `destination_branch_line2`,
   `b2`.`city` AS `destination_branch_city`,
   `b2`.`state` AS `destination_branch_state`,
   `b2`.`zip` AS `destination_branch_zip`,
   `driver`.`employee_id` AS `driver_employee_id`,
   `driver`.`first_name` AS `driver_first_name`,
   `driver`.`last_name` AS `driver_last_name`,
   `driver`.`profile_picture` AS `driver_profile_picture`,
   `driver`.`branch_id` AS `driver_branch_id`,(select count(0)
FROM `shipment` `s` where (`s`.`route_id` = `r`.`id`)) AS `package_count`,(select round(((((count(0) * 1) + (rand(`r`.`id`) * pow(10,12))) - floor((rand(`r`.`id`) * pow(10,12)))) - 0.5),2) from `shipment` `s` where (`s`.`route_id` = `r`.`id`)) AS `estimated_fuel`,(select ((count(0) * 20) + floor(((((rand(`r`.`id`) * pow(10,12)) - floor((rand(`r`.`id`) * pow(10,12)))) * (10 + 1)) - 5))) from `shipment` `s` where (`s`.`route_id` = `r`.`id`)) AS `estimated_distance`,(select count(0) from (`tracking_history` `t` join `shipment` `s` on((`t`.`package_id` = `s`.`package_id`))) where ((`t`.`status` = 'Lost') and (`s`.`route_id` = `r`.`id`))) AS `lost_count` from (((`route` `r` left join `branch_view` `b1` on((`r`.`source_branch_id` = `b1`.`branch_id`))) left join `branch_view` `b2` on((`r`.`destination_branch_id` = `b2`.`branch_id`))) left join `employee_view` `driver` on((`r`.`driver_employee_id` = `driver`.`employee_id`)));

# Dump of view branch_view
# ------------------------------------------------------------

DROP TABLE IF EXISTS `branch_view`; DROP VIEW IF EXISTS `branch_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wizard`@`%` SQL SECURITY DEFINER VIEW `branch_view`
AS SELECT
   `b`.`id` AS `branch_id`,
   `b`.`name` AS `name`,
   `b`.`phone_number` AS `phone_number`,
   `b`.`email` AS `email`,
   `b`.`opening_time` AS `opening_time`,
   `b`.`closing_time` AS `closing_time`,
   `b`.`image` AS `image`,
   `a`.`id` AS `address_id`,
   `a`.`line1` AS `line1`,
   `a`.`line2` AS `line2`,
   `a`.`city` AS `city`,
   `a`.`state` AS `state`,
   `a`.`zip` AS `zip`,
   `e`.`employee_id` AS `manager_employee_id`,
   `e`.`first_name` AS `manager_first_name`,
   `e`.`last_name` AS `manager_last_name`,
   `e`.`username` AS `manager_username`,
   `e`.`email` AS `manager_email`,
   `e`.`phone_number` AS `manager_phone_number`,
   `e`.`phone_country_code` AS `manager_phone_country_code`,
   `e`.`profile_picture` AS `manager_profile_picture`
FROM ((`branch` `b` join `employee_view` `e`) join `address` `a`) where ((`b`.`address_id` = `a`.`id`) and (`b`.`manager_employee_id` = `e`.`employee_id`));

# Dump of view employee_view
# ------------------------------------------------------------

DROP TABLE IF EXISTS `employee_view`; DROP VIEW IF EXISTS `employee_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wizard`@`%` SQL SECURITY DEFINER VIEW `employee_view`
AS SELECT
   `u`.`id` AS `user_id`,
   `u`.`first_name` AS `first_name`,
   `u`.`last_name` AS `last_name`,
   `u`.`username` AS `username`,
   `u`.`email` AS `email`,
   `u`.`password_hash` AS `password_hash`,
   `u`.`phone_number` AS `phone_number`,
   `u`.`phone_country_code` AS `phone_country_code`,
   `u`.`profile_picture` AS `profile_picture`,
   `u`.`created_at` AS `created_at`,
   `u`.`last_login` AS `last_login`,
   `u`.`deleted` AS `deleted`,
   `e`.`id` AS `employee_id`,
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
   `a`.`zip` AS `zip`,
   `su`.`first_name` AS `supervisor_first_name`,
   `su`.`last_name` AS `supervisor_last_name`,
   `su`.`profile_picture` AS `supervisor_profile_picture`,
   `b`.`id` AS `branch_id`,
   `b`.`name` AS `branch_name`,
   `b`.`address_id` AS `branch_address_id`
FROM (((((`user` `u` join `address` `a`) join `employee` `e`) join `employee` `s`) join `user` `su`) join `branch` `b`) where ((`u`.`id` = `e`.`user_id`) and (`u`.`address_id` = `a`.`id`) and (`e`.`supervisor_employee_id` = `s`.`id`) and (`s`.`user_id` = `su`.`id`) and (`e`.`branch_id` = `b`.`id`));

# Dump of view inventory_view
# ------------------------------------------------------------

DROP TABLE IF EXISTS `inventory_view`; DROP VIEW IF EXISTS `inventory_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wizard`@`%` SQL SECURITY DEFINER VIEW `inventory_view`
AS SELECT
   `i`.`id` AS `inventory_id`,
   `b`.`id` AS `branch_id`,
   `b`.`name` AS `branch_name`,
   `p`.`name` AS `product_name`,
   `p`.`image` AS `product_image`,
   `i`.`product_id` AS `product_id`,
   `i`.`quantity_in_stock` AS `quantity_in_stock`,
   `i`.`stock_alert_threshold` AS `stock_alert_threshold`,
   `i`.`last_stock_update` AS `last_stock_update`,
   `p`.`deleted` AS `product_deleted`
FROM ((`inventory` `i` join `branch` `b`) join `product` `p`) where ((`b`.`id` = `i`.`branch_id`) and (`p`.`id` = `i`.`product_id`));

# Dump of view receipt_view
# ------------------------------------------------------------

DROP TABLE IF EXISTS `receipt_view`; DROP VIEW IF EXISTS `receipt_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wizard`@`%` SQL SECURITY DEFINER VIEW `receipt_view`
AS SELECT
   `p`.`id` AS `product_id`,
   `p`.`sku` AS `sku`,
   `p`.`upc` AS `upc`,
   `p`.`price` AS `price`,
   `p`.`name` AS `name`,
   `p`.`description` AS `description`,
   `p`.`category` AS `category`,
   `p`.`width` AS `width`,
   `p`.`length` AS `length`,
   `p`.`height` AS `height`,
   `p`.`weight` AS `weight`,
   `p`.`image` AS `image`,
   `p`.`deleted` AS `deleted`,
   `r`.`amount_bought` AS `amount_bought`,
   `r`.`timestamp` AS `timestamp`,
   `r`.`notes` AS `notes`,(`p`.`price` * `r`.`amount_bought`) AS `subtotal`,round(((0.0825 * `p`.`price`) * `r`.`amount_bought`),2) AS `tax`,round(((1.0825 * `p`.`price`) * `r`.`amount_bought`),2) AS `total`,
   `c`.`customer_id` AS `customer_id`,
   `c`.`first_name` AS `first_name`,
   `c`.`last_name` AS `last_name`,
   `c`.`profile_picture` AS `profile_picture`,
   `b`.`id` AS `branch_id`,
   `b`.`name` AS `branch_name`
FROM (((`receipt` `r` join `product` `p` on((`r`.`product_id` = `p`.`id`))) join `customer_view` `c` on((`r`.`customer_id` = `c`.`customer_id`))) join `branch` `b` on((`r`.`branch_id` = `b`.`id`)));

# Dump of view customer_view
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customer_view`; DROP VIEW IF EXISTS `customer_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wizard`@`%` SQL SECURITY DEFINER VIEW `customer_view`
AS SELECT
   `u`.`id` AS `user_id`,
   `u`.`first_name` AS `first_name`,
   `u`.`last_name` AS `last_name`,
   `u`.`username` AS `username`,
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
   `a`.`zip` AS `zip`,
   `b`.`id` AS `billing_id`,
   `b`.`card_number` AS `card_number`,
   `b`.`cvc` AS `cvc`,
   `b`.`expiration_month` AS `expiration_month`,
   `b`.`expiration_year` AS `expiration_year`,
   `b`.`cardholder_name` AS `cardholder_name`,
   `ba`.`id` AS `billing_address_id`,
   `ba`.`line1` AS `billing_line1`,
   `ba`.`line2` AS `billing_line2`,
   `ba`.`city` AS `billing_city`,
   `ba`.`state` AS `billing_state`,
   `ba`.`zip` AS `billing_zip`
FROM ((((`user` `u` join `customer` `c` on((`u`.`id` = `c`.`user_id`))) join `address` `a` on((`u`.`address_id` = `a`.`id`))) left join `billing` `b` on(((`b`.`customer_id` = `c`.`id`) and (`b`.`preferred` = 1)))) left join `address` `ba` on((`b`.`address_id` = `ba`.`id`)));

# Dump of view shopping_cart_view
# ------------------------------------------------------------

DROP TABLE IF EXISTS `shopping_cart_view`; DROP VIEW IF EXISTS `shopping_cart_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wizard`@`%` SQL SECURITY DEFINER VIEW `shopping_cart_view`
AS SELECT
   `sc`.`id` AS `shopping_cart_id`,
   `sc`.`user_id` AS `user_id`,
   `sc`.`branch_id` AS `branch_id`,
   `b`.`name` AS `branch_name`,
   `sc`.`product_id` AS `product_id`,
   `p`.`name` AS `product_name`,
   `p`.`description` AS `product_desc`,
   `p`.`image` AS `product_image`,
   `sc`.`quantity` AS `product_quantity`,
   `p`.`price` AS `price`
FROM ((`shopping_cart` `sc` join `branch` `b`) join `product` `p`) where ((`sc`.`branch_id` = `b`.`id`) and (`sc`.`product_id` = `p`.`id`));

# Dump of view tracking_history_view
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tracking_history_view`; DROP VIEW IF EXISTS `tracking_history_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wizard`@`%` SQL SECURITY DEFINER VIEW `tracking_history_view`
AS SELECT
   `t`.`id` AS `tracking_history_id`,
   `t`.`package_id` AS `package_id`,
   `t`.`timestamp` AS `timestamp`,
   `t`.`status` AS `status`,
   `a`.`id` AS `address_id`,
   `a`.`line1` AS `line1`,
   `a`.`line2` AS `line2`,
   `a`.`city` AS `city`,
   `a`.`state` AS `state`,
   `a`.`zip` AS `zip`
FROM (`tracking_history` `t` join `address` `a`) where (`t`.`address_id` = `a`.`id`) order by `t`.`timestamp` desc;


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
