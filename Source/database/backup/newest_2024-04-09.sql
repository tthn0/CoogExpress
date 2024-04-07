# ************************************************************
# Sequel Ace SQL dump
# Version 20064
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: cosc3380.mysql.database.azure.com (MySQL 8.0.35)
# Database: newest
# Generation Time: 2024-04-09 10:13:48 +0000
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
) ENGINE=InnoDB AUTO_INCREMENT=331 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;

INSERT INTO `address` (`id`, `line1`, `line2`, `city`, `state`, `zip`)
VALUES
	(4,'10 Pine St','Suite 100','San Francisco','CA','94101'),
	(15,'101 Apple St','','Detroit','MI','48201'),
	(24,'1010 Coconut St','','Raleigh','NC','27601'),
	(6,'111 Cedar St','','Seattle','WA','98101'),
	(1,'123 Main St','Apt 1','New York','NY','10001'),
	(25,'123 Real St','','Houston','TX','77084'),
	(16,'202 Banana St','Apt 3C','Phoenix','AZ','85001'),
	(7,'222 Birch St','','Boston','MA','02101'),
	(17,'303 Pear St','','Dallas','TX','75201'),
	(8,'333 Walnut St','','Philadelphia','PA','19101'),
	(18,'404 Watermelon St','','Charlotte','NC','28201'),
	(9,'444 Cherry St','Unit B','Austin','TX','78701'),
	(2,'456 Elm St','','Los Angeles','CA','90001'),
	(26,'456 Jump St','','Albany','NY','12345'),
	(19,'505 Kiwi St','Unit D','Minneapolis','MN','55401'),
	(5,'555 Maple Ave','','Miami','FL','33101'),
	(10,'555 Orange St','','Atlanta','GA','30301'),
	(20,'606 Avocado St','','Las Vegas','NV','89101'),
	(11,'666 Lemon St','Apt 2B','Denver','CO','80201'),
	(21,'707 Mango St','','Orlando','FL','32801'),
	(12,'777 Peach St','','Houston','TX','77001'),
	(3,'789 Oak St','','Chicago','IL','60601'),
	(27,'789 Sesame St','','Denver','CO','54321'),
	(22,'808 Papaya St','Suite 200','San Antonio','TX','78201'),
	(13,'888 Grape St','Suite 300','Portland','OR','97201'),
	(23,'909 Fig St','','Nashville','TN','37201'),
	(14,'999 Pineapple St','','San Diego','CA','92101');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;

INSERT INTO `branch` (`id`, `address_id`, `manager_employee_id`, `name`, `phone_number`, `email`, `opening_time`, `closing_time`)
VALUES
	(1,1,1,'Sunset Park Branch','1234567890','sunset.park@coog.express','08:00:00','17:00:00'),
	(2,2,1,'Maple Grove Branch','2345678901','maple.grove@coog.express','09:00:00','18:00:00'),
	(3,3,1,'Pineview Branch','3456789012','pineview@coog.express','08:30:00','17:30:00'),
	(4,4,1,'Lakeview Branch','4567890123','lakeview@coog.express','08:00:00','17:00:00'),
	(5,5,1,'Riverfront Branch','5678901234','riverfront@coog.express','09:00:00','18:00:00'),
	(6,6,1,'Highland Park Branch','6789012345','highland.park@coog.express','08:30:00','17:30:00'),
	(7,7,1,'Springfield Branch','7890123456','springfield@coog.express','08:00:00','17:00:00'),
	(8,8,1,'Oak Ridge Branch','8901234567','oak.ridge@coog.express','09:00:00','18:00:00'),
	(9,9,1,'Elmwood Branch','9012345678','elmwood@coog.express','08:30:00','17:30:00'),
	(10,10,1,'Cedar Hill Branch','0123456789','cedar.hill@coog.express','08:00:00','17:00:00');

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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;

INSERT INTO `customer` (`id`, `user_id`, `preferred_branch_id`, `preferred_communication_method`)
VALUES
	(1,20,NULL,NULL),
	(2,21,NULL,NULL),
	(3,22,NULL,NULL),
	(4,23,NULL,NULL),
	(5,24,NULL,NULL),
	(6,25,NULL,NULL);

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `email_queue` WRITE;
/*!40000 ALTER TABLE `email_queue` DISABLE KEYS */;

INSERT INTO `email_queue` (`id`, `user_first_name`, `user_email`, `email_subject`, `email_body`, `processed`)
VALUES
	(3,'Thomas','thomas@tthn.us','Inventory Threshold Alert at: Lakeview Branch','Dear Thomas\n\nThe inventory for \"Folders\" has reached below the threshold. Please purchase new products for this branch\nThreshold: 200\nCurrent Inventory: 199',0),
	(4,'Thomas','thomas@tthn.us','Inventory Threshold Alert at: Lakeview Branch','Dear Thomas\n\nThe inventory for \"Folders\" has reached below the threshold. Please purchase new products for this branch\nThreshold: 200\nCurrent Inventory: 198',0),
	(5,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace\n\n! A new tracking history has been created for you.\n Tracking history ID: 35',0),
	(6,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace\n\n! A new tracking history has been created for you.\n Tracking history ID: 36',0),
	(8,'Thomas','thomas@tthn.us','CoogExpress Management: Inventory Alert at Lakeview Branch','Dear Thomas\n\nThe inventory for \"Folders\" has reached the threshold at your branch. Please order new inventory as soon as possible for this branch\nThreshold: 200\nCurrent Inventory: 200',0),
	(9,'Thomas','thomas@tthn.us','CoogExpress Management: Inventory Alert at Lakeview Branch',NULL,0),
	(10,'Thomas','thomas@tthn.us','CoogExpress Management: Inventory Alert at Lakeview Branch','Dear Thomas\n\nThe inventory for \"Folders\" has reached the threshold at your branch. Please order new inventory as soon as possible for this branch\nThreshold: 200\nCurrent Inventory: 200',0),
	(11,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace\n\n! A new tracking history has been created for you.\n Tracking history ID: 37',0),
	(12,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 38',0),
	(13,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 39',0),
	(14,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 40',0),
	(15,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 41',0),
	(16,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 42',0),
	(17,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 43',0),
	(18,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 44',0),
	(19,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 45',0),
	(20,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 46',0),
	(21,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 47',0),
	(22,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 48',0),
	(23,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 49',0),
	(24,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 50',0),
	(25,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 51',0),
	(26,'Alan','alan@turing.com','CoogExpress: New tracking history!','Hello, Alan!\n\n A new tracking history has been created for you.\n Tracking history ID: 52',0),
	(27,'Alan','alan@turing.com','CoogExpress: New tracking history!','Hello, Alan!\n\n A new tracking history has been created for you.\n Tracking history ID: 53',0),
	(28,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 54',0),
	(29,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 55',0),
	(30,'ben','b@b.com','CoogExpress: New tracking history!','Hello, ben!\n\n A new tracking history has been created for you.\n Tracking history ID: 56',0),
	(31,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 57',0),
	(32,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 58',0),
	(33,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 59',0),
	(34,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 60',0),
	(35,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 61',0),
	(36,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 62',0),
	(37,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 63',0),
	(38,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 64',0),
	(39,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 65',0),
	(40,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 66',0),
	(41,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 67',0),
	(42,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 68',0),
	(43,'ben','b@b.com','CoogExpress: New tracking history!','Hello, ben!\n\n A new tracking history has been created for you.\n Tracking history ID: 69',0),
	(44,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 70',0),
	(45,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 71',0),
	(46,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 72',0),
	(47,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 73',0),
	(48,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 74',0),
	(49,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 75',0),
	(50,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 76',0),
	(51,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 77',0),
	(52,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 78',0),
	(53,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 79',0),
	(54,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 80',0),
	(55,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 81',0),
	(56,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 82',0),
	(57,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 83',0),
	(58,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 84',0),
	(59,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 85',0),
	(60,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 86',0),
	(61,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 87',0),
	(62,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 88',0),
	(63,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 89',0),
	(64,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 90',0),
	(65,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 91',0),
	(66,'meow','meow@gmail.com','CoogExpress: New tracking history!','Hello, meow!\n\n A new tracking history has been created for you.\n Tracking history ID: 92',0),
	(67,'Diana','dianasaur@school.com','CoogExpress: New tracking history!','Hello, Diana!\n\n A new tracking history has been created for you.\n Tracking history ID: 93',0),
	(68,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 94',0),
	(69,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 95',0),
	(70,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 96',0),
	(71,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 97',0),
	(72,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 1',0),
	(73,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 2',0),
	(74,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 3',0),
	(75,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 4',0),
	(76,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 5',0),
	(77,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 6',0),
	(78,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 7',0),
	(79,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 8',0),
	(80,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 9',0),
	(81,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 10',0),
	(82,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 11',0),
	(83,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 12',0),
	(84,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 13',0),
	(85,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 14',0),
	(86,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 15',0),
	(87,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 16',0),
	(88,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 17',0),
	(89,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 18',0),
	(90,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 19',0),
	(91,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 20',0),
	(92,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 21',0),
	(93,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 22',0),
	(94,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 23',0),
	(95,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 24',0),
	(96,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 25',0),
	(97,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 26',0),
	(98,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 27',0),
	(99,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 28',0),
	(100,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 29',0),
	(101,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 30',0),
	(102,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 31',0),
	(103,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 32',0),
	(104,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 33',0),
	(105,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 34',0),
	(106,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 35',0),
	(107,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 36',0),
	(108,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 37',0),
	(109,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 38',0),
	(110,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 39',0),
	(111,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 40',0),
	(112,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 41',0),
	(113,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 42',0),
	(114,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 43',0),
	(115,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 44',0),
	(116,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 45',0),
	(117,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 46',0),
	(118,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 47',0),
	(119,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 48',0),
	(120,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 50',0),
	(121,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 49',0),
	(122,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 51',0),
	(123,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 52',0),
	(124,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 53',0),
	(125,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 54',0),
	(126,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 55',0),
	(127,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 56',0),
	(128,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 57',0),
	(129,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 58',0),
	(130,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 59',0),
	(131,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 60',0),
	(132,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 61',0),
	(133,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 62',0),
	(134,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 63',0),
	(135,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 64',0),
	(136,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 66',0),
	(137,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 65',0),
	(138,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 67',0),
	(139,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 68',0),
	(140,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 69',0),
	(141,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 70',0),
	(142,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 71',0),
	(143,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 72',0),
	(144,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 73',0),
	(145,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 74',0),
	(146,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 75',0),
	(147,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 76',0),
	(148,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 77',0),
	(149,'Alan','alan@turing.com','CoogExpress: New tracking history!','Hello, Alan!\n\n A new tracking history has been created for you.\n Tracking history ID: 78',0),
	(150,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 79',0),
	(151,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 80',0),
	(152,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 81',0),
	(153,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 82',0),
	(154,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 83',0),
	(155,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 84',0),
	(156,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 85',0),
	(157,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 86',0),
	(158,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 87',0),
	(159,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 88',0),
	(160,'John','john@conway.com','CoogExpress: New tracking history!','Hello, John!\n\n A new tracking history has been created for you.\n Tracking history ID: 89',0),
	(161,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 90',0),
	(162,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 91',0),
	(163,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 92',0),
	(164,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 93',0),
	(165,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 94',0),
	(166,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 95',0),
	(167,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 96',0),
	(168,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 97',0),
	(169,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 98',0),
	(170,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 99',0),
	(171,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 100',0),
	(172,'Dennis','dennis@ritchie.com','CoogExpress: New tracking history!','Hello, Dennis!\n\n A new tracking history has been created for you.\n Tracking history ID: 101',0),
	(173,'Ada','ada@lovelace.com','CoogExpress: New tracking history!','Hello, Ada!\n\n A new tracking history has been created for you.\n Tracking history ID: 102',0),
	(174,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 103',0),
	(175,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 104',0),
	(176,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 105',0),
	(177,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 106',0),
	(178,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 107',0),
	(179,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 108',0),
	(180,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 109',0),
	(181,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 110',0),
	(182,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 111',0),
	(183,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 112',0),
	(184,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 113',0),
	(185,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 114',0),
	(186,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 115',0),
	(187,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 116',0),
	(188,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 117',0),
	(189,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 118',0),
	(190,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 119',0),
	(191,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 120',0),
	(192,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 121',0),
	(193,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 122',0),
	(194,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 123',0),
	(195,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 124',0),
	(196,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 125',0),
	(197,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 126',0),
	(198,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 127',0),
	(199,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 128',0),
	(200,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 129',0),
	(201,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 130',0),
	(202,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 131',0),
	(203,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 132',0),
	(204,'Grace','grace@hopper.com','CoogExpress: New tracking history!','Hello, Grace!\n\n A new tracking history has been created for you.\n Tracking history ID: 133',0),
	(205,'Linus','linus@torvalds.com','CoogExpress: New tracking history!','Hello, Linus!\n\n A new tracking history has been created for you.\n Tracking history ID: 134',0);

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;

INSERT INTO `employee` (`id`, `user_id`, `branch_id`, `supervisor_employee_id`, `date_of_birth`, `gender`, `driver_license_number`, `role`, `shirt_size`)
VALUES
	(1,1,1,1,'2000-01-01','Male','1234567890123','Manager','M'),
	(2,2,1,1,'2001-02-02','Male','2345678901234','Associate','M'),
	(3,3,1,1,'2002-03-03','Male','3456789012345','Driver','M'),
	(4,4,1,1,'2004-04-04','Male','4567890123456','Driver','S'),
	(5,5,1,1,'2005-05-05','Male','5678901234567','Driver','S'),
	(10,10,2,10,'2006-06-06','Male','0001234567890','Manager','XL'),
	(11,11,2,10,'2007-07-07','Male','0002345678901','Driver','M'),
	(12,12,2,10,'2008-08-08','Female','0004567890123','Associate','XS');

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;

INSERT INTO `inventory` (`id`, `branch_id`, `product_id`, `quantity_in_stock`, `stock_alert_threshold`, `last_stock_update`, `been_notified`)
VALUES
	(1,4,4,201,200,'2016-08-10 06:15:00',0);

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
  `width` decimal(5,2) unsigned NOT NULL,
  `length` decimal(5,2) unsigned NOT NULL,
  `height` decimal(5,2) unsigned NOT NULL,
  `weight` decimal(8,2) unsigned NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


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
  `width` decimal(5,2) unsigned NOT NULL,
  `length` decimal(5,2) unsigned NOT NULL,
  `height` decimal(5,2) unsigned NOT NULL,
  `weight` decimal(8,2) unsigned NOT NULL,
  `image` longblob,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;





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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


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


# Dump of table tracking_history
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tracking_history`;

CREATE TABLE `tracking_history` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `package_id` int unsigned NOT NULL,
  `address_id` int unsigned NOT NULL,
  `timestamp` timestamp NOT NULL,
  `status` enum('Pending','Standby','Shipping','Delivered') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `fk_tracking_history_address_id` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_tracking_history_package_id` FOREIGN KEY (`package_id`) REFERENCES `package` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DELIMITER ;;
/*!50003 SET SESSION SQL_MODE="ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO" */;;
/*!50003 CREATE */ /*!50017 DEFINER=`wizard`@`%` */ /*!50003 TRIGGER `notify_customer` AFTER INSERT ON `tracking_history` FOR EACH ROW BEGIN
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
    
    SET email_subject = "CoogExpress: New tracking history!";
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
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `email`, `password_hash`, `phone_number`, `phone_country_code`, `address_id`, `profile_picture`, `created_at`, `last_login`, `deleted`)
VALUES
	(1,'Thomas','Nguyen','thomas','thomas@tthn.us','nguyen','0000000000','1',1,'https://cdn.discordapp.com/avatars/354864663579590656/63557e1ac09d078162e402b7ccb4f8d5.png?size=128','2024-03-17 12:30:45','2024-04-08 09:37:51',0),
	(2,'Brandon','Miramontes','brandon','brandon@miramontes.com','miramontes','1111111111','1',2,'https://cdn.discordapp.com/avatars/1074077467796582401/59b4e2334926f1a3ec85261648464c6d.png?size=128','2024-03-23 13:42:02','2024-04-08 09:38:06',0),
	(3,'Salim','Sanogho','salim','salim@sanogho.com','sanogho','2222222222','1',3,'https://cdn.discordapp.com/avatars/1013124526768406658/ece88637647dbdf3cc441279bc9355be.png?size=128','2024-03-23 13:45:09','2024-04-08 09:38:21',0),
	(4,'Nikolas','Velazquez','nikolas','nikolas@velazquez.com','velazquez','3333333333','1',4,'https://cdn.discordapp.com/avatars/234144333161299978/c0411ce9c43f2397d4626b650159fdce.png?size=128','2024-03-23 13:45:09','2024-04-08 09:38:36',0),
	(5,'Sam','Li','sam','sam@li.com','lilili','4444444444','1',5,'https://cdn.discordapp.com/avatars/550888319182176287/6023d54c18e7853518137efee812d10f.png?size=128','2024-03-23 13:45:09','2024-04-09 09:28:26',0),
	(10,'Manager','Employee','manager','manager@branch2.com','manager','1111100000','1',1,'https://i.pravatar.cc/400?img=11','2024-03-23 13:45:09','2024-04-08 09:50:14',0),
	(11,'Driver','Employee','driver','driver@branch2.com','driver','2222200000','1',2,'https://i.pravatar.cc/400?img=13','2024-03-23 13:45:09','2024-04-08 09:50:25',0),
	(12,'Associate','Employee','associate','associate@branch2.com','associate','3333300000','1',3,'https://i.pravatar.cc/400?img=38','2024-03-23 13:45:09','2024-04-09 09:43:11',0),
	(20,'Alan','Turing','alan','alan@turing.com','turing','0000011111','1',1,'https://xsgames.co/randomusers/assets/avatars/male/1.jpg','2024-04-08 09:23:16','2024-04-09 03:40:07',0),
	(21,'Grace','Hopper','grace','grace@hopper.com','hopper','0000022222','1',2,'https://xsgames.co/randomusers/assets/avatars/female/2.jpg','2024-04-08 09:24:56','2024-04-08 09:37:19',0),
	(22,'Ada','Lovelace','ada','ada@lovelace.com','lovelace','0000033333','1',3,'https://xsgames.co/randomusers/assets/avatars/female/3.jpg','2024-04-08 09:26:06','2024-04-08 09:37:13',0),
	(23,'Dennis','Ritchie','dennis','dennis@ritchie.com','ritchie','0000044444','1',4,'https://xsgames.co/randomusers/assets/avatars/male/4.jpg','2024-04-08 09:27:28','2024-04-08 09:37:26',0),
	(24,'Linus','Torvalds','linus','linus@torvalds.com','torvalds','0000055555','1',5,'https://xsgames.co/randomusers/assets/avatars/male/5.jpg','2024-04-08 09:28:18','2024-04-08 09:37:33',0),
	(25,'John','Conway','john','john@conway.com','conway','0000066666','1',6,'https://xsgames.co/randomusers/assets/avatars/male/6.jpg','2024-04-08 09:28:53','2024-04-08 09:53:16',0);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


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
   `driver`.`profile_picture` AS `driver_profile_picture`,(select count(0)
FROM `shipment` `s` where (`s`.`route_id` = `r`.`id`)) AS `package_count` from (((`route` `r` left join `branch_view` `b1` on((`r`.`source_branch_id` = `b1`.`branch_id`))) left join `branch_view` `b2` on((`r`.`destination_branch_id` = `b2`.`branch_id`))) left join `employee_view` `driver` on((`r`.`driver_employee_id` = `driver`.`employee_id`)));

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
   `a`.`zip` AS `zip`
FROM ((`user` `u` join `address` `a`) join `customer` `c`) where ((`u`.`id` = `c`.`user_id`) and (`u`.`address_id` = `a`.`id`));


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
