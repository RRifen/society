CREATE DATABASE  IF NOT EXISTS `delivery_administration` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `delivery_administration`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: delivery_administration
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `issue_point_id` int DEFAULT NULL,
  `role` varchar(100) NOT NULL DEFAULT 'ROLE_USER',
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `UC_Login` (`login`),
  UNIQUE KEY `admin_id` (`admin_id`),
  KEY `issue_point_id` (`issue_point_id`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`issue_point_id`) REFERENCES `issue_points` (`issue_point_id`),
  CONSTRAINT `admins_chk_1` CHECK ((length(`login`) > 2)),
  CONSTRAINT `admins_chk_2` CHECK ((length(`password`) > 2))
) ENGINE=InnoDB AUTO_INCREMENT=174694 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin11231235','passwordadmina1',3,'ROLE_USER'),(2,'admin2','parol',3,'ROLE_USER'),(3,'admin3','drowssapp',2,'ROLE_USER'),(5,'new admin','123321',2,'ROLE_USER'),(6,'admin6','password6',6,'ROLE_USER'),(8,'admin8','password8',9,'ROLE_USER'),(9,'admin91','password91',2,'ROLE_USER'),(10,'admin1123123123','password10',5,'ROLE_USER'),(11,'admin12323','password11',4,'ROLE_USER'),(12,'admin1256456','password11',8,'ROLE_USER'),(174677,'adminjkhhhhhh]','3333',3,'ROLE_USER'),(174678,'admin19808','asd',4,'ROLE_USER'),(174686,'sdfsdf','fewr',4,'ROLE_USER'),(174687,'asdasd','weqewq',3,'ROLE_USER'),(174688,'admin1','asdasdasfgf',3,'ROLE_USER'),(174689,'admin1_2_3','123321',NULL,'ROLE_USER'),(174690,'admin123','adddd',NULL,'ROLE_USER'),(174691,'asd','ddd',NULL,'ROLE_USER'),(174692,'asdt','ddd',NULL,'ROLE_USER'),(174693,'main','main',NULL,'ROLE_ADMIN');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `couriers`
--

DROP TABLE IF EXISTS `couriers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `couriers` (
  `courier_id` int NOT NULL AUTO_INCREMENT,
  `surname` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `patronymic` varchar(20) DEFAULT NULL,
  `violation_counter` int DEFAULT NULL,
  `phone` varchar(15) NOT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  PRIMARY KEY (`courier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `couriers`
--

LOCK TABLES `couriers` WRITE;
/*!40000 ALTER TABLE `couriers` DISABLE KEYS */;
INSERT INTO `couriers` VALUES (1,'Dostaevskiii','Fedorr','Vladimirovichch',12,'8999999999922',NULL,NULL),(2,'Courierov','Fedot','Ivanovich',12,'89999999123',NULL,NULL),(4,'12','12','12',9,'89999999135',NULL,NULL),(14,'fsdfs','das','asdas',620,'4235',NULL,NULL),(15,'dsa','asd','ewrwet',5,'9999',NULL,NULL);
/*!40000 ALTER TABLE `couriers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment_types`
--

DROP TABLE IF EXISTS `equipment_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment_types` (
  `equipment_type_id` int NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  PRIMARY KEY (`equipment_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_types`
--

LOCK TABLES `equipment_types` WRITE;
/*!40000 ALTER TABLE `equipment_types` DISABLE KEYS */;
INSERT INTO `equipment_types` VALUES (1,'Delivery Bag'),(2,'Scooter'),(3,'Uniform'),(4,'GPS');
/*!40000 ALTER TABLE `equipment_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipments`
--

DROP TABLE IF EXISTS `equipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipments` (
  `equipment_id` int NOT NULL AUTO_INCREMENT,
  `equipment_type_id` int NOT NULL,
  `courier_id` int DEFAULT NULL,
  PRIMARY KEY (`equipment_id`),
  KEY `equipment_type_id` (`equipment_type_id`),
  KEY `courier_id` (`courier_id`),
  CONSTRAINT `equipments_ibfk_1` FOREIGN KEY (`equipment_type_id`) REFERENCES `equipment_types` (`equipment_type_id`),
  CONSTRAINT `equipments_ibfk_2` FOREIGN KEY (`courier_id`) REFERENCES `couriers` (`courier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipments`
--

LOCK TABLES `equipments` WRITE;
/*!40000 ALTER TABLE `equipments` DISABLE KEYS */;
INSERT INTO `equipments` VALUES (3,2,1),(4,3,2),(5,3,1),(6,4,1),(7,4,2),(8,3,1),(10,2,2),(12,3,2),(17,4,2),(18,4,2),(19,4,2),(20,2,1),(23,3,4),(24,1,2),(25,1,2);
/*!40000 ALTER TABLE `equipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `good_types`
--

DROP TABLE IF EXISTS `good_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `good_types` (
  `good_type_id` int NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  PRIMARY KEY (`good_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `good_types`
--

LOCK TABLES `good_types` WRITE;
/*!40000 ALTER TABLE `good_types` DISABLE KEYS */;
INSERT INTO `good_types` VALUES (1,'Computer'),(2,'Laptop'),(3,'Keyboard'),(4,'Monitor'),(5,'CPU'),(6,'HDD'),(7,'RAM'),(8,'Power supply'),(9,'System unit'),(10,'Graphics card');
/*!40000 ALTER TABLE `good_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods` (
  `good_id` int NOT NULL,
  `provider_id` int NOT NULL,
  `good_type_id` int NOT NULL,
  `description` text NOT NULL,
  `count` int NOT NULL DEFAULT (0),
  PRIMARY KEY (`good_id`,`provider_id`),
  KEY `provider_id` (`provider_id`),
  KEY `good_type_id` (`good_type_id`),
  CONSTRAINT `goods_ibfk_1` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`provider_id`),
  CONSTRAINT `goods_ibfk_2` FOREIGN KEY (`good_type_id`) REFERENCES `good_types` (`good_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (2,1,2,'Laptop Good2 Prov1',0),(3,1,3,'Description 4',6),(3,9,5,'Description 5',7),(4,6,2,'Description 7',20),(5,9,9,'Description 8',17),(6,10,6,'Description 9',9),(7,4,8,'Description 10',2),(7,5,8,'Description 11',5),(7,7,9,'Description 12',8),(48,6,2,'asd',5);
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issue_points`
--

DROP TABLE IF EXISTS `issue_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issue_points` (
  `issue_point_id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(50) NOT NULL,
  PRIMARY KEY (`issue_point_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue_points`
--

LOCK TABLES `issue_points` WRITE;
/*!40000 ALTER TABLE `issue_points` DISABLE KEYS */;
INSERT INTO `issue_points` VALUES (1,'Moscow Prospect Vernadskogo 78'),(2,'Moscow, Stromynka Street 20'),(3,'Saint-Petersburg, Dumskaya Street 1'),(4,'123 Main Street, City1'),(5,'456 Oak Avenue, City2'),(6,'789 Pine Road, City3'),(7,'222 Long Street, City4'),(8,'333 Short Road, City5'),(9,'444 Rage Avenue, City6');
/*!40000 ALTER TABLE `issue_points` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `courier_id` int DEFAULT NULL,
  `delivery_address` varchar(50) NOT NULL,
  `estimated_delivery_time` timestamp NOT NULL,
  `admin_id` int NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `courier_id` (`courier_id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`courier_id`) REFERENCES `couriers` (`courier_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,2,'Moscow, Studencheskaya 22','2023-12-29 08:11:00',2);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `providers`
--

DROP TABLE IF EXISTS `providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `providers` (
  `provider_id` int NOT NULL AUTO_INCREMENT,
  `provider_name` varchar(50) DEFAULT NULL,
  `description` text NOT NULL,
  `admin_id` int NOT NULL,
  PRIMARY KEY (`provider_id`),
  UNIQUE KEY `provider_name` (`provider_name`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `providers_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES (1,'provider_1','provider1',1),(3,'provider_3','provider3',3),(4,'provider_4','provider4',5),(5,'provider_5','provider5',5),(6,'provider_6','provider6',5),(7,'provider_7','provider7',9),(8,'provider_8','provider8',6),(9,'provider_19','provider9',5),(10,'provider_10','provider10',3),(11,'provider_11','provider11',8);
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_types`
--

DROP TABLE IF EXISTS `report_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_types` (
  `report_type_id` int NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  PRIMARY KEY (`report_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_types`
--

LOCK TABLES `report_types` WRITE;
/*!40000 ALTER TABLE `report_types` DISABLE KEYS */;
INSERT INTO `report_types` VALUES (1,'Report Money'),(2,'Report Time'),(3,'Report Mistake');
/*!40000 ALTER TABLE `report_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL,
  `report_type_id` int NOT NULL,
  `report_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `report_text` text NOT NULL,
  PRIMARY KEY (`report_id`),
  KEY `admin_id` (`admin_id`),
  KEY `report_type_id` (`report_type_id`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`),
  CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`report_type_id`) REFERENCES `report_types` (`report_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,2,1,'2023-12-04 03:14:00','Where is Money?'),(2,3,1,'2023-08-29 14:37:00','What a stupid mistake'),(6,174692,2,'2023-12-04 13:40:09','asfasdgsfgsdfsdfsdfsdf');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-10  1:19:32
