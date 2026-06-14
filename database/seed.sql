-- MySQL dump 10.13  Distrib 8.4.9, for Win64 (x86_64)
--
-- Host: localhost    Database: correspondence
-- ------------------------------------------------------
-- Server version	8.4.9

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `correspondence`
--

/*!40000 DROP DATABASE IF EXISTS `correspondence`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `correspondence` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `correspondence`;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActivated` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `employeeId` int unsigned DEFAULT NULL,
  `lastLoginPositionId` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `employeeId` (`employeeId`),
  KEY `lastLoginPositionId` (`lastLoginPositionId`),
  CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `accounts_ibfk_2` FOREIGN KEY (`lastLoginPositionId`) REFERENCES `employees_positions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'elijah.ajibade@gmail.com','$2b$10$c8aF5fklSYTlLyJghhsGO.Xjo3o/wE4MEBH/6fU2WFcySDEUioCEm',1,'2026-06-14 08:39:22','2026-06-14 08:39:22',1000,NULL),(2,'samuel.ajewole@gmail.com','$2b$10$c8aF5fklSYTlLyJghhsGO.Xjo3o/wE4MEBH/6fU2WFcySDEUioCEm',1,'2026-06-14 11:50:09','2026-06-14 11:50:09',1001,NULL);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actions`
--

DROP TABLE IF EXISTS `actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `workflowId` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `workflowId` (`workflowId`),
  CONSTRAINT `actions_ibfk_1` FOREIGN KEY (`workflowId`) REFERENCES `workflows` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,'<p>Hello, this is a test mail body.</p>','2026-06-14 11:34:57',1),(2,'<p>Second test.</p>','2026-06-14 11:34:58',2);
/*!40000 ALTER TABLE `actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actions_attachments`
--

DROP TABLE IF EXISTS `actions_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actions_attachments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `fileName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileType` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` int unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `actionId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `actionId` (`actionId`),
  CONSTRAINT `actions_attachments_ibfk_1` FOREIGN KEY (`actionId`) REFERENCES `actions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions_attachments`
--

LOCK TABLES `actions_attachments` WRITE;
/*!40000 ALTER TABLE `actions_attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `actions_attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channels`
--

DROP TABLE IF EXISTS `channels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channels` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isGroup` tinyint(1) NOT NULL DEFAULT '0',
  `latestMessageId` int unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channels`
--

LOCK TABLES `channels` WRITE;
/*!40000 ALTER TABLE `channels` DISABLE KEYS */;
/*!40000 ALTER TABLE `channels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channels_members`
--

DROP TABLE IF EXISTS `channels_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channels_members` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `lastSeenMessageId` int unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `channelId` int unsigned NOT NULL,
  `memberId` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lastSeenMessageId` (`lastSeenMessageId`),
  KEY `channelId` (`channelId`),
  KEY `memberId` (`memberId`),
  CONSTRAINT `channels_members_ibfk_1` FOREIGN KEY (`lastSeenMessageId`) REFERENCES `messages` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `channels_members_ibfk_2` FOREIGN KEY (`channelId`) REFERENCES `channels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `channels_members_ibfk_3` FOREIGN KEY (`memberId`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channels_members`
--

LOCK TABLES `channels_members` WRITE;
/*!40000 ALTER TABLE `channels_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `channels_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classifications`
--

DROP TABLE IF EXISTS `classifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classifications` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classifications`
--

LOCK TABLES `classifications` WRITE;
/*!40000 ALTER TABLE `classifications` DISABLE KEYS */;
INSERT INTO `classifications` VALUES (1,'responsible','2026-06-14 08:39:21','2026-06-14 08:39:21'),(2,'subordinate','2026-06-14 08:39:21','2026-06-14 08:39:21'),(3,'secretary','2026-06-14 08:39:21','2026-06-14 08:39:21');
/*!40000 ALTER TABLE `classifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consignees_groups`
--

DROP TABLE IF EXISTS `consignees_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consignees_groups` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ownerId` int unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ownerId` (`ownerId`),
  CONSTRAINT `consignees_groups_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `employees_positions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consignees_groups`
--

LOCK TABLES `consignees_groups` WRITE;
/*!40000 ALTER TABLE `consignees_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `consignees_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consignees_groups_members`
--

DROP TABLE IF EXISTS `consignees_groups_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consignees_groups_members` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `memberId` int unsigned NOT NULL,
  `groupId` int unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_memberId_groupId` (`memberId`,`groupId`),
  KEY `groupId` (`groupId`),
  CONSTRAINT `consignees_groups_members_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `employees_positions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `consignees_groups_members_ibfk_2` FOREIGN KEY (`groupId`) REFERENCES `consignees_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consignees_groups_members`
--

LOCK TABLES `consignees_groups_members` WRITE;
/*!40000 ALTER TABLE `consignees_groups_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `consignees_groups_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middleName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phoneNumber` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hireDate` date NOT NULL,
  `birthDate` date NOT NULL,
  `gender` enum('male','female') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'male',
  `maritalStatus` enum('single','married','divorced','widowed','other') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'single',
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Tulkarm',
  `userStatus` enum('regular','in-vacation','fired','retired','resigned') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'regular',
  `role` enum('admin','moderator','employee') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'employee',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1002 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1000,'Elijah','','Ajibade','elijah.ajibade@gmail.com',NULL,'0592566124','2022-03-04','1998-01-01','male','single','Tulkarm','regular','admin','2026-06-14 08:39:22','2026-06-14 08:39:22'),(1001,'Samuel','','Ajewole','samuel.ajewole@gmail.com',NULL,'0592566200','2024-09-01','1996-05-20','male','single','Okitipupa','regular','employee','2026-06-14 11:50:09','2026-06-14 11:50:09');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees_permissions`
--

DROP TABLE IF EXISTS `employees_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees_permissions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `permissionId` int unsigned NOT NULL,
  `employeeId` int unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `composite_Employee_Permission_index` (`permissionId`,`employeeId`),
  KEY `employeeId` (`employeeId`),
  CONSTRAINT `employees_permissions_ibfk_1` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`),
  CONSTRAINT `employees_permissions_ibfk_2` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees_permissions`
--

LOCK TABLES `employees_permissions` WRITE;
/*!40000 ALTER TABLE `employees_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees_positions`
--

DROP TABLE IF EXISTS `employees_positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees_positions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `positionId` int unsigned NOT NULL,
  `classification` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jobTitleId` int unsigned NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `employeeId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `positionId` (`positionId`),
  KEY `classification` (`classification`),
  KEY `jobTitleId` (`jobTitleId`),
  KEY `employeeId` (`employeeId`),
  CONSTRAINT `employees_positions_ibfk_1` FOREIGN KEY (`positionId`) REFERENCES `positions` (`id`),
  CONSTRAINT `employees_positions_ibfk_2` FOREIGN KEY (`classification`) REFERENCES `classifications` (`name`),
  CONSTRAINT `employees_positions_ibfk_3` FOREIGN KEY (`jobTitleId`) REFERENCES `jobtitles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employees_positions_ibfk_4` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees_positions`
--

LOCK TABLES `employees_positions` WRITE;
/*!40000 ALTER TABLE `employees_positions` DISABLE KEYS */;
INSERT INTO `employees_positions` VALUES (1,1,'responsible',1,'2022-03-04',NULL,'2026-06-14 08:39:22','2026-06-14 08:39:22',1000),(2,1,'subordinate',1,'2024-09-01',NULL,'2026-06-14 11:50:09','2026-06-14 11:50:09',1001);
/*!40000 ALTER TABLE `employees_positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobtitles`
--

DROP TABLE IF EXISTS `jobtitles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobtitles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `jobTitle_index` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobtitles`
--

LOCK TABLES `jobtitles` WRITE;
/*!40000 ALTER TABLE `jobtitles` DISABLE KEYS */;
INSERT INTO `jobtitles` VALUES (1,'System Administrator','2026-06-14 08:39:22','2026-06-14 08:39:22');
/*!40000 ALTER TABLE `jobtitles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `channelId` int unsigned NOT NULL,
  `senderId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `channelId` (`channelId`),
  KEY `senderId` (`senderId`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`channelId`) REFERENCES `channels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`senderId`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Permission_index` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positions`
--

DROP TABLE IF EXISTS `positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `positions` (
  `id` int unsigned NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parentId` int unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parentId` (`parentId`),
  CONSTRAINT `positions_ibfk_1` FOREIGN KEY (`parentId`) REFERENCES `positions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positions`
--

LOCK TABLES `positions` WRITE;
/*!40000 ALTER TABLE `positions` DISABLE KEYS */;
INSERT INTO `positions` VALUES (1,'Organization Root',NULL,'2026-06-14 08:39:22','2026-06-14 08:39:22');
/*!40000 ALTER TABLE `positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positions_jobtitles`
--

DROP TABLE IF EXISTS `positions_jobtitles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `positions_jobtitles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `positionId` int unsigned NOT NULL,
  `jobTitleId` int unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `composite_Position_JobTitle_index` (`positionId`,`jobTitleId`),
  KEY `jobTitleId` (`jobTitleId`),
  CONSTRAINT `positions_jobtitles_ibfk_1` FOREIGN KEY (`positionId`) REFERENCES `positions` (`id`),
  CONSTRAINT `positions_jobtitles_ibfk_2` FOREIGN KEY (`jobTitleId`) REFERENCES `jobtitles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positions_jobtitles`
--

LOCK TABLES `positions_jobtitles` WRITE;
/*!40000 ALTER TABLE `positions_jobtitles` DISABLE KEYS */;
INSERT INTO `positions_jobtitles` VALUES (1,1,1,'2026-06-14 08:39:22','2026-06-14 08:39:22');
/*!40000 ALTER TABLE `positions_jobtitles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow_participants`
--

DROP TABLE IF EXISTS `workflow_participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workflow_participants` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `empPositionId` int unsigned NOT NULL,
  `actionType` enum('SENDER','RECIPIENT','CC') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'RECIPIENT',
  `isSeen` tinyint(1) NOT NULL DEFAULT '0',
  `isPinned` tinyint(1) NOT NULL DEFAULT '0',
  `isArchived` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `actionId` int unsigned NOT NULL,
  `workflowId` int unsigned NOT NULL,
  `overdueNotified` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `empPositionId` (`empPositionId`),
  KEY `actionId` (`actionId`),
  KEY `workflowId` (`workflowId`),
  CONSTRAINT `workflow_participants_ibfk_1` FOREIGN KEY (`empPositionId`) REFERENCES `employees_positions` (`id`),
  CONSTRAINT `workflow_participants_ibfk_2` FOREIGN KEY (`actionId`) REFERENCES `actions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `workflow_participants_ibfk_3` FOREIGN KEY (`workflowId`) REFERENCES `workflows` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow_participants`
--

LOCK TABLES `workflow_participants` WRITE;
/*!40000 ALTER TABLE `workflow_participants` DISABLE KEYS */;
INSERT INTO `workflow_participants` VALUES (1,1,'SENDER',1,0,0,'2026-06-14 11:34:58','2026-06-14 11:34:58',1,1,0),(2,1,'RECIPIENT',0,0,0,'2026-06-14 11:34:58','2026-06-14 11:51:00',1,1,1),(3,1,'SENDER',1,0,0,'2026-06-14 11:34:58','2026-06-14 11:34:58',2,2,0),(4,1,'RECIPIENT',0,0,0,'2026-06-14 11:34:58','2026-06-14 11:34:58',2,2,0);
/*!40000 ALTER TABLE `workflow_participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflows`
--

DROP TABLE IF EXISTS `workflows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workflows` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `workflowType` enum('Internal Correspondence','External Correspondence - Incoming','External Correspondence - Outgoing','Letter','Decision','Report','Instructions','Invitation') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Internal Correspondence',
  `priority` enum('Urgent','High','Medium','Low') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Medium',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `referenceNumber` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dueDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `referenceNumber` (`referenceNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflows`
--

LOCK TABLES `workflows` WRITE;
/*!40000 ALTER TABLE `workflows` DISABLE KEYS */;
INSERT INTO `workflows` VALUES (1,'Test incoming letter #1','External Correspondence - Incoming','High','2026-06-14 11:34:57','2026-06-14 11:34:57','MTS/2026/00001','2020-01-01 10:00:00'),(2,'Test internal memo #2','Internal Correspondence','Medium','2026-06-14 11:34:58','2026-06-14 11:34:58','MTS/2026/00002',NULL);
/*!40000 ALTER TABLE `workflows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'correspondence'
--

--
-- Dumping routines for database 'correspondence'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-14 12:03:23
