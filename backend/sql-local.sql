CREATE DATABASE  IF NOT EXISTS `swp_fpt` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `swp_fpt`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: swp_fpt
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `point` int DEFAULT '0',
  `status_id` int DEFAULT NULL,
  `refresh_token` text,
  `dob` date DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `account_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'Admin','admin@gmail.com','$2a$10$.SLoZzQHYFujJscYnH6ly.dnCeQ39hNhOs9nmGX8sDjBP0JkANcrS',NULL,NULL,1,0,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoxLCJmdWxsX25hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicGhvbmVfbnVtYmVyIjpudWxsLCJkb2IiOm51bGwsImF2YXRhciI6bnVsbCwicm9sZV9pZCI6MSwicG9pbnQiOjAsInN0YXR1c19pZCI6MiwiaWF0IjoxNzIxMjUzMjIwLCJleHAiOjE3NTI3ODkyMjB9.uafJAaAFOMd5aFbEUOrV8inWgd9ySSNfXMc_zg810tQ',NULL),(2,'Content Manager','cm@gmail.com','$2a$10$whXPvUfplRlRYklmooTDvuqNoInNw/9KU1erD8axd5XMH8MZsBLkC',NULL,NULL,2,0,2,NULL,NULL),(3,'Content Creator','cc@gmail.com','$2a$10$whXPvUfplRlRYklmooTDvuqNoInNw/9KU1erD8axd5XMH8MZsBLkC',NULL,NULL,3,0,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjozLCJmdWxsX25hbWUiOiJDb250ZW50IENyZWF0b3IiLCJlbWFpbCI6ImNjQGdtYWlsLmNvbSIsInBob25lX251bWJlciI6bnVsbCwiZG9iIjpudWxsLCJhdmF0YXIiOm51bGwsInJvbGVfaWQiOjMsInBvaW50IjowLCJzdGF0dXNfaWQiOjIsImlhdCI6MTcxODg0OTc3MCwiZXhwIjoxNzUwMzg1NzcwfQ.CtmyE2MA1bA-5HKzv-3UNRTY6P0RkMPLnxsNkCwSeqI',NULL),(4,'Nguyen Van A','user@gmail.com','$2a$10$whXPvUfplRlRYklmooTDvuqNoInNw/9KU1erD8axd5XMH8MZsBLkC','0123456789','string',4,1000,2,NULL,'2001-04-22'),(7,'Do Tran Quang Huy','huy@gmail.com','$2a$10$edBlNlninVw8Yad1n9VOJun7VWDAwgDJJn1rVV9UjmHYnmgGYqPfq','01234554512','string',4,1000,2,NULL,'2001-06-05'),(8,'Nguyễn Đình Thành Quang','quanggk98@gmail.com','$2a$10$9EqnGiTP5O5o8omqEJm7XO1/d5PXLF2clu6W.B2iBWGcT81Ju36I6',NULL,NULL,4,0,2,NULL,NULL),(9,'Nguyen Chi Hai','hai@gmail.com','$2a$10$DEOlKQoscNlHMXZUfyEU1eqlR9IIN7MTOvsJNNZF8Mq7fFiW/Aq/u',NULL,NULL,4,0,2,NULL,NULL),(10,'Tran Thi Thao','thao@gmail.com','$2a$10$4iDowFtAYoPDTmvkRemzYumYK9P5yOpbyL3yBttEtRqYUV6K4TuqG',NULL,NULL,4,0,3,NULL,NULL),(11,'Bui Kieu Mai','mai@gmail.com','$2a$10$ALDX1Cf7EBEQXQVfioG/sOHeXFdWeyfiGQOzm54lNUlInZf7mwgpG',NULL,NULL,4,0,2,NULL,NULL),(12,'Ta Nhat Minh','minh@gmail.com','$2a$10$6HCqA63.sxmdgcSbNnHA8.pFtaELbRfriizy1BTCqpfjZd64t0CAC',NULL,NULL,4,0,3,NULL,NULL),(14,'test','test@gmail.com','$2a$10$KdvoAYEmYR9WWrQz7br68OIuRTbO79DP7P1DyWXL7KP/HYLiMwDwe','0123456789','string',4,1000,1,NULL,'2001-04-22'),(15,'Mai','buimai@gmail.com','$2a$10$KIa4/SjMfEqQBxDhImslzeBZI2k.N5DFpP16oa5kasnGwXvf04yOC',NULL,NULL,4,0,2,NULL,NULL),(16,'Do Tran Quang Huy ','huydo@gmail.com','$2a$10$DrcZyGV0jsN.LBsx2e3r9.7lR9OBovLREpVF6a65UJuFAzzxivvei',NULL,NULL,4,0,2,NULL,NULL),(17,'minhtn','minhtn123@gmail.com','$2a$10$z3xn6Ogay0z1ujzlwnnooO5YufOzIe/spgCYml88naAvU8xrEOtia','0955444578','',4,0,2,NULL,'2008-03-05'),(18,'Ta Nhat Minh','minhtn1234@gmail.com','$2a$10$pSdyrDMDdk1cIh/MuuguUuPT7J1wLhvFtI2wjFp1kRV8Nt8E2ecKu',NULL,NULL,4,0,2,NULL,NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accountday`
--

DROP TABLE IF EXISTS `accountday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accountday` (
  `account_day_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `day_id` int NOT NULL,
  `day_process` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`account_day_id`),
  KEY `account_id` (`account_id`),
  KEY `day_id` (`day_id`),
  CONSTRAINT `accountday_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`),
  CONSTRAINT `accountday_ibfk_2` FOREIGN KEY (`day_id`) REFERENCES `day` (`day_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountday`
--

LOCK TABLES `accountday` WRITE;
/*!40000 ALTER TABLE `accountday` DISABLE KEYS */;
INSERT INTO `accountday` VALUES (1,7,1,'done'),(2,7,2,'undone'),(3,7,1,' test create'),(4,7,1,' test create'),(5,7,1,' test create');
/*!40000 ALTER TABLE `accountday` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accountquiz`
--

DROP TABLE IF EXISTS `accountquiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accountquiz` (
  `account_quiz_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `quiz_id` int NOT NULL,
  `finish_date` datetime DEFAULT NULL,
  `quiz_point` int DEFAULT NULL,
  PRIMARY KEY (`account_quiz_id`),
  KEY `account_id` (`account_id`),
  KEY `quiz_id` (`quiz_id`),
  CONSTRAINT `accountquiz_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`),
  CONSTRAINT `accountquiz_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`quiz_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountquiz`
--

LOCK TABLES `accountquiz` WRITE;
/*!40000 ALTER TABLE `accountquiz` DISABLE KEYS */;
/*!40000 ALTER TABLE `accountquiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accountweek`
--

DROP TABLE IF EXISTS `accountweek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accountweek` (
  `account_week_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `week_id` int NOT NULL,
  `finish_date` date DEFAULT NULL,
  PRIMARY KEY (`account_week_id`),
  KEY `account_id` (`account_id`),
  KEY `week_id` (`week_id`),
  CONSTRAINT `accountweek_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`),
  CONSTRAINT `accountweek_ibfk_2` FOREIGN KEY (`week_id`) REFERENCES `week` (`week_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountweek`
--

LOCK TABLES `accountweek` WRITE;
/*!40000 ALTER TABLE `accountweek` DISABLE KEYS */;
INSERT INTO `accountweek` VALUES (1,7,1,'2024-05-02'),(2,7,1,'2024-05-06'),(3,7,1,'2024-01-06');
/*!40000 ALTER TABLE `accountweek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alphabet`
--

DROP TABLE IF EXISTS `alphabet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alphabet` (
  `alphabet_id` int NOT NULL AUTO_INCREMENT,
  `type_id` int DEFAULT NULL,
  `japanese_character` varchar(255) DEFAULT NULL,
  `romaji_character` varchar(255) DEFAULT NULL,
  `alphabet_audio` varchar(255) DEFAULT NULL,
  `alphabet_image` text,
  PRIMARY KEY (`alphabet_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `alphabet_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `alphabettype` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=264 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alphabet`
--

LOCK TABLES `alphabet` WRITE;
/*!40000 ALTER TABLE `alphabet` DISABLE KEYS */;
INSERT INTO `alphabet` VALUES (1,1,'あ','a','/alphabet/hiragana/audio/a.mp3','/alphabet/hiragana/image/a.gif'),(2,1,'い','i','/alphabet/hiragana/audio/i.mp3','/alphabet/hiragana/image/i.gif'),(3,1,'う','u','/alphabet/hiragana/audio/u.mp3','/alphabet/hiragana/image/u.gif'),(4,1,'え','e','/alphabet/hiragana/audio/e.mp3','/alphabet/hiragana/image/e.gif'),(5,1,'お','o','/alphabet/hiragana/audio/o.mp3','/alphabet/hiragana/image/o.gif'),(6,1,'か','ka','/alphabet/hiragana/audio/ka.mp3','/alphabet/hiragana/image/ka.gif'),(7,1,'き','ki','/alphabet/hiragana/audio/ki.mp3','/alphabet/hiragana/image/ki.gif'),(8,1,'く','ku','/alphabet/hiragana/audio/ku.mp3','/alphabet/hiragana/image/ku.gif'),(9,1,'け','ke','/alphabet/hiragana/audio/ke.mp3','/alphabet/hiragana/image/ke.gif'),(10,1,'こ','ko','/alphabet/hiragana/audio/ko.mp3','/alphabet/hiragana/image/ko.gif'),(11,1,'さ','sa','/alphabet/hiragana/audio/sa.mp3','/alphabet/hiragana/image/sa.gif'),(12,1,'し','shi','/alphabet/hiragana/audio/shi.mp3','/alphabet/hiragana/image/shi.gif'),(13,1,'す','su','/alphabet/hiragana/audio/su.mp3','/alphabet/hiragana/image/su.gif'),(14,1,'せ','se','/alphabet/hiragana/audio/se.mp3','/alphabet/hiragana/image/se.gif'),(15,1,'そ','so','/alphabet/hiragana/audio/so.mp3','/alphabet/hiragana/image/so.gif'),(16,1,'た','ta','/alphabet/hiragana/audio/ta.mp3','/alphabet/hiragana/image/ta.gif'),(17,1,'ち','chi','/alphabet/hiragana/audio/chi.mp3','/alphabet/hiragana/image/chi.gif'),(18,1,'つ','tsu','/alphabet/hiragana/audio/tsu.mp3','/alphabet/hiragana/image/tsu.gif'),(19,1,'て','te','/alphabet/hiragana/audio/te.mp3','/alphabet/hiragana/image/te.gif'),(20,1,'と','to','/alphabet/hiragana/audio/to.mp3','/alphabet/hiragana/image/to.gif'),(21,1,'な','na','/alphabet/hiragana/audio/na.mp3','/alphabet/hiragana/image/na.gif'),(22,1,'に','ni','/alphabet/hiragana/audio/ni.mp3','/alphabet/hiragana/image/ni.gif'),(23,1,'ぬ','nu','/alphabet/hiragana/audio/nu.mp3','/alphabet/hiragana/image/nu.gif'),(24,1,'ね','ne','/alphabet/hiragana/audio/ne.mp3','/alphabet/hiragana/image/ne.gif'),(25,1,'の','no','/alphabet/hiragana/audio/no.mp3','/alphabet/hiragana/image/no.gif'),(26,1,'は','ha','/alphabet/hiragana/audio/ha.mp3','/alphabet/hiragana/image/ha.gif'),(27,1,'ひ','hi','/alphabet/hiragana/audio/hi.mp3','/alphabet/hiragana/image/hi.gif'),(28,1,'ふ','fu','/alphabet/hiragana/audio/fu.mp3','/alphabet/hiragana/image/fu.gif'),(29,1,'へ','he','/alphabet/hiragana/audio/he.mp3','/alphabet/hiragana/image/he.gif'),(30,1,'ほ','ho','/alphabet/hiragana/audio/ho.mp3','/alphabet/hiragana/image/ho.gif'),(31,1,'ま','ma','/alphabet/hiragana/audio/ma.mp3','/alphabet/hiragana/image/ma.gif'),(32,1,'み','mi','/alphabet/hiragana/audio/mi.mp3','/alphabet/hiragana/image/mi.gif'),(33,1,'む','mu','/alphabet/hiragana/audio/mu.mp3','/alphabet/hiragana/image/mu.gif'),(34,1,'め','me','/alphabet/hiragana/audio/me.mp3','/alphabet/hiragana/image/me.gif'),(35,1,'も','mo','/alphabet/hiragana/audio/mo.mp3','/alphabet/hiragana/image/mo.gif'),(36,1,'や','ya','/alphabet/hiragana/audio/ya.mp3','/alphabet/hiragana/image/ya.gif'),(37,1,'','','',''),(38,1,'ゆ','yu','/alphabet/hiragana/audio/yu.mp3','/alphabet/hiragana/image/yu.gif'),(39,1,'','','',''),(40,1,'よ','yo','/alphabet/hiragana/audio/yo.mp3','/alphabet/hiragana/image/yo.gif'),(41,1,'ら','ra','/alphabet/hiragana/audio/ra.mp3','/alphabet/hiragana/image/ra.gif'),(42,1,'り','ri','/alphabet/hiragana/audio/ri.mp3','/alphabet/hiragana/image/ri.gif'),(43,1,'る','ru','/alphabet/hiragana/audio/ru.mp3','/alphabet/hiragana/image/ru.gif'),(44,1,'れ','re','/alphabet/hiragana/audio/re.mp3','/alphabet/hiragana/image/re.gif'),(45,1,'ろ','ro','/alphabet/hiragana/audio/ro.mp3','/alphabet/hiragana/image/ro.gif'),(46,1,'わ','wa','/alphabet/hiragana/audio/wa.mp3','/alphabet/hiragana/image/wa.gif'),(47,1,'','','',''),(48,1,'を','wo','/alphabet/hiragana/audio/wo.mp3','/alphabet/hiragana/image/wo.gif'),(49,1,'','','',''),(50,1,'ん','n','/alphabet/hiragana/audio/n.mp3','/alphabet/hiragana/image/n.gif'),(51,2,'ア','a','/alphabet/katakana/audio/a.mp3','/alphabet/katakana/image/a.gif'),(52,2,'イ','i','/alphabet/katakana/audio/i.mp3','/alphabet/katakana/image/i.gif'),(53,2,'ウ','u','/alphabet/katakana/audio/u.mp3','/alphabet/katakana/image/u.gif'),(54,2,'エ','e','/alphabet/katakana/audio/e.mp3','/alphabet/katakana/image/e.gif'),(55,2,'オ','o','/alphabet/katakana/audio/o.mp3','/alphabet/katakana/image/o.gif'),(56,2,'カ','ka','/alphabet/katakana/audio/ka.mp3','/alphabet/katakana/image/ka.gif'),(57,2,'キ','ki','/alphabet/katakana/audio/ki.mp3','/alphabet/katakana/image/ki.gif'),(58,2,'ク','ku','/alphabet/katakana/audio/ku.mp3','/alphabet/katakana/image/ku.gif'),(59,2,'ケ','ke','/alphabet/katakana/audio/ke.mp3','/alphabet/katakana/image/ke.gif'),(60,2,'コ','ko','/alphabet/katakana/audio/ko.mp3','/alphabet/katakana/image/ko.gif'),(61,2,'サ','sa','/alphabet/katakana/audio/sa.mp3','/alphabet/katakana/image/sa.gif'),(62,2,'シ','shi','/alphabet/katakana/audio/shi.mp3','/alphabet/katakana/image/shi.gif'),(63,2,'ス','su','/alphabet/katakana/audio/su.mp3','/alphabet/katakana/image/su.gif'),(64,2,'セ','se','/alphabet/katakana/audio/se.mp3','/alphabet/katakana/image/se.gif'),(65,2,'ソ','so','/alphabet/katakana/audio/so.mp3','/alphabet/katakana/image/so.gif'),(66,2,'タ','ta','/alphabet/katakana/audio/ta.mp3','/alphabet/katakana/image/ta.gif'),(67,2,'チ','chi','/alphabet/katakana/audio/chi.mp3','/alphabet/katakana/image/chi.gif'),(68,2,'ツ','tsu','/alphabet/katakana/audio/tsu.mp3','/alphabet/katakana/image/tsu.gif'),(69,2,'テ','te','/alphabet/katakana/audio/te.mp3','/alphabet/katakana/image/te.gif'),(70,2,'ト','to','/alphabet/katakana/audio/to.mp3','/alphabet/katakana/image/to.gif'),(71,2,'ナ','na','/alphabet/katakana/audio/na.mp3','/alphabet/katakana/image/na.gif'),(72,2,'ニ','ni','/alphabet/katakana/audio/ni.mp3','/alphabet/katakana/image/ni.gif'),(73,2,'ヌ','nu','/alphabet/katakana/audio/nu.mp3','/alphabet/katakana/image/nu.gif'),(74,2,'ネ','ne','/alphabet/katakana/audio/ne.mp3','/alphabet/katakana/image/ne.gif'),(75,2,'ノ','no','/alphabet/katakana/audio/no.mp3','/alphabet/katakana/image/no.gif'),(76,2,'ハ','ha','/alphabet/katakana/audio/ha.mp3','/alphabet/katakana/image/ha.gif'),(77,2,'ヒ','hi','/alphabet/katakana/audio/hi.mp3','/alphabet/katakana/image/hi.gif'),(78,2,'フ','fu','/alphabet/katakana/audio/fu.mp3','/alphabet/katakana/image/fu.gif'),(79,2,'ヘ','he','/alphabet/katakana/audio/he.mp3','/alphabet/katakana/image/he.gif'),(80,2,'ホ','ho','/alphabet/katakana/audio/ho.mp3','/alphabet/katakana/image/ho.gif'),(81,2,'マ','ma','/alphabet/katakana/audio/ma.mp3','/alphabet/katakana/image/ma.gif'),(82,2,'ミ','mi','/alphabet/katakana/audio/mi.mp3','/alphabet/katakana/image/mi.gif'),(83,2,'ム','mu','/alphabet/katakana/audio/mu.mp3','/alphabet/katakana/image/mu.gif'),(84,2,'メ','me','/alphabet/katakana/audio/me.mp3','/alphabet/katakana/image/me.gif'),(85,2,'モ','mo','/alphabet/katakana/audio/mo.mp3','/alphabet/katakana/image/mo.gif'),(86,2,'ヤ','ya','/alphabet/katakana/audio/ya.mp3','/alphabet/katakana/image/ya.gif'),(87,2,'　','','',''),(88,2,'ユ','yu','/alphabet/katakana/audio/yu.mp3','/alphabet/katakana/image/yu.gif'),(89,2,'　','','',''),(90,2,'ヨ','yo','/alphabet/katakana/audio/yo.mp3','/alphabet/katakana/image/yo.gif'),(91,2,'ラ','ra','/alphabet/katakana/audio/ra.mp3','/alphabet/katakana/image/ra.gif'),(92,2,'リ','ri','/alphabet/katakana/audio/ri.mp3','/alphabet/katakana/image/ri.gif'),(93,2,'ル','ru','/alphabet/katakana/audio/ru.mp3','/alphabet/katakana/image/ru.gif'),(94,2,'レ','re','/alphabet/katakana/audio/re.mp3','/alphabet/katakana/image/re.gif'),(95,2,'ロ','ro','/alphabet/katakana/audio/ro.mp3','/alphabet/katakana/image/ro.gif'),(96,2,'ワ','wa','/alphabet/katakana/audio/wa.mp3','/alphabet/katakana/image/wa.gif'),(97,2,'　','','',''),(98,2,'ヲ','wo','/alphabet/katakana/audio/wo.mp3','/alphabet/katakana/image/wo.gif'),(99,2,'　','','',''),(100,2,'ン','n','/alphabet/katakana/audio/n.mp3','/alphabet/katakana/image/n.gif'),(101,3,'が','ga','/alphabet/dakutenhira/audio/ga.mp3','/alphabet/dakutenhira/image/ga.svg'),(102,3,'ぎ','gi','/alphabet/dakutenhira/audio/gi.mp3','/alphabet/dakutenhira/image/gi.svg'),(103,3,'ぐ','gu','/alphabet/dakutenhira/audio/gu.mp3','/alphabet/dakutenhira/image/gu.svg'),(104,3,'げ','ge','/alphabet/dakutenhira/audio/ge.mp3','/alphabet/dakutenhira/image/ge.svg'),(105,3,'ご','go','/alphabet/dakutenhira/audio/go.mp3','/alphabet/dakutenhira/image/go.svg'),(106,3,'ざ','za','/alphabet/dakutenhira/audio/za.mp3','/alphabet/dakutenhira/image/za.svg'),(107,3,'じ','ji','/alphabet/dakutenhira/audio/ji.mp3','/alphabet/dakutenhira/image/ji.svg'),(108,3,'ず','zu','/alphabet/dakutenhira/audio/zu.mp3','/alphabet/dakutenhira/image/zu.svg'),(109,3,'ぜ','ze','/alphabet/dakutenhira/audio/ze.mp3','/alphabet/dakutenhira/image/ze.svg'),(110,3,'ぞ','zo','/alphabet/dakutenhira/audio/zo.mp3','/alphabet/dakutenhira/image/zo.svg'),(111,3,'だ','da','/alphabet/dakutenhira/audio/da.mp3','/alphabet/dakutenhira/image/da.svg'),(112,3,'ぢ','ji','/alphabet/dakutenhira/audio/di.mp3','/alphabet/dakutenhira/image/di.svg'),(113,3,'づ','zu','/alphabet/dakutenhira/audio/du.mp3','/alphabet/dakutenhira/image/du.svg'),(114,3,'で','de','/alphabet/dakutenhira/audio/de.mp3','/alphabet/dakutenhira/image/de.svg'),(115,3,'ど','do','/alphabet/dakutenhira/audio/do.mp3','/alphabet/dakutenhira/image/do.svg'),(116,3,'ば','ba','/alphabet/dakutenhira/audio/ba.mp3','/alphabet/dakutenhira/image/ba.svg'),(117,3,'び','bi','/alphabet/dakutenhira/audio/bi.mp3','/alphabet/dakutenhira/image/bi.svg'),(118,3,'ぶ','bu','/alphabet/dakutenhira/audio/bu.mp3','/alphabet/dakutenhira/image/bu.svg'),(119,3,'べ','be','/alphabet/dakutenhira/audio/be.mp3','/alphabet/dakutenhira/image/be.svg'),(120,3,'ぼ','bo','/alphabet/dakutenhira/audio/bo.mp3','/alphabet/dakutenhira/image/bo.svg'),(121,3,'ぱ','pa','/alphabet/dakutenhira/audio/pa.mp3','/alphabet/dakutenhira/image/pa.svg'),(122,3,'ぴ','pi','/alphabet/dakutenhira/audio/pi.mp3','/alphabet/dakutenhira/image/pi.svg'),(123,3,'ぷ','pu','/alphabet/dakutenhira/audio/pu.mp3','/alphabet/dakutenhira/image/pu.svg'),(124,3,'ぺ','pe','/alphabet/dakutenhira/audio/pe.mp3','/alphabet/dakutenhira/image/pe.svg'),(125,3,'ぽ','po','/alphabet/dakutenhira/audio/po.mp3','/alphabet/dakutenhira/image/po.svg'),(126,4,'ガ','ga','/alphabet/dakutenkata/audio/ga.mp3','/alphabet/dakutenkata/image/ga.svg'),(127,4,'ギ','gi','/alphabet/dakutenkata/audio/gi.mp3','/alphabet/dakutenkata/image/gi.svg'),(128,4,'グ','gu','/alphabet/dakutenkata/audio/gu.mp3','/alphabet/dakutenkata/image/gu.svg'),(129,4,'ゲ','ge','/alphabet/dakutenkata/audio/ge.mp3','/alphabet/dakutenkata/image/ge.svg'),(130,4,'ゴ','go','/alphabet/dakutenkata/audio/go.mp3','/alphabet/dakutenkata/image/go.svg'),(131,4,'ザ','za','/alphabet/dakutenkata/audio/za.mp3','/alphabet/dakutenkata/image/za.svg'),(132,4,'ジ','ji','/alphabet/dakutenkata/audio/ji.mp3','/alphabet/dakutenkata/image/ji.svg'),(133,4,'ズ','zu','/alphabet/dakutenkata/audio/zu.mp3','/alphabet/dakutenkata/image/zu.svg'),(134,4,'ゼ','ze','/alphabet/dakutenkata/audio/ze.mp3','/alphabet/dakutenkata/image/ze.svg'),(135,4,'ゾ','zo','/alphabet/dakutenkata/audio/zo.mp3','/alphabet/dakutenkata/image/zo.svg'),(136,4,'ダ','da','/alphabet/dakutenkata/audio/da.mp3','/alphabet/dakutenkata/image/da.svg'),(137,4,'ヂ','ji','/alphabet/dakutenkata/audio/di.mp3','/alphabet/dakutenkata/image/di.svg'),(138,4,'ヅ','zu','/alphabet/dakutenkata/audio/du.mp3','/alphabet/dakutenkata/image/du.svg'),(139,4,'デ','de','/alphabet/dakutenkata/audio/de.mp3','/alphabet/dakutenkata/image/de.svg'),(140,4,'ド','do','/alphabet/dakutenkata/audio/do.mp3','/alphabet/dakutenkata/image/do.svg'),(141,4,'バ','ba','/alphabet/dakutenkata/audio/ba.mp3','/alphabet/dakutenkata/image/ba.svg'),(142,4,'ビ','bi','/alphabet/dakutenkata/audio/bi.mp3','/alphabet/dakutenkata/image/bi.svg'),(143,4,'ブ','bu','/alphabet/dakutenkata/audio/bu.mp3','/alphabet/dakutenkata/image/bu.svg'),(144,4,'ベ','be','/alphabet/dakutenkata/audio/be.mp3','/alphabet/dakutenkata/image/be.svg'),(145,4,'ボ','bo','/alphabet/dakutenkata/audio/bo.mp3','/alphabet/dakutenkata/image/bo.svg'),(146,4,'パ','pa','/alphabet/dakutenkata/audio/pa.mp3','/alphabet/dakutenkata/image/pa.svg'),(147,4,'ピ','pi','/alphabet/dakutenkata/audio/pi.mp3','/alphabet/dakutenkata/image/pi.svg'),(148,4,'プ','pu','/alphabet/dakutenkata/audio/pu.mp3','/alphabet/dakutenkata/image/pu.svg'),(149,4,'ペ','pe','/alphabet/dakutenkata/audio/pe.mp3','/alphabet/dakutenkata/image/pe.svg'),(150,4,'ポ','po','/alphabet/dakutenkata/audio/po.mp3','/alphabet/dakutenkata/image/po.svg'),(151,5,'きゃ','kya','/alphabet/yoonhira/audio/kya.mp3','/alphabet/yoonhira/image/kya.gif'),(152,5,'きゅ','kyu','/alphabet/yoonhira/audio/kyu.mp3','/alphabet/yoonhira/image/kyu.gif'),(153,5,'きょ','kyo','/alphabet/yoonhira/audio/kyo.mp3','/alphabet/yoonhira/image/kyo.gif'),(154,5,'しゃ','sha','/alphabet/yoonhira/audio/sha.mp3','/alphabet/yoonhira/image/sha.gif'),(155,5,'しゅ','shu','/alphabet/yoonhira/audio/shu.mp3','/alphabet/yoonhira/image/shu.gif'),(156,5,'しょ','sho','/alphabet/yoonhira/audio/sho.mp3','/alphabet/yoonhira/image/sho.gif'),(157,5,'ちゃ','cha','/alphabet/yoonhira/audio/cha.mp3','/alphabet/yoonhira/image/cha.gif'),(158,5,'ちゅ','chu','/alphabet/yoonhira/audio/chu.mp3','/alphabet/yoonhira/image/chu.gif'),(159,5,'ちょ','cho','/alphabet/yoonhira/audio/cho.mp3','/alphabet/yoonhira/image/cho.gif'),(160,5,'にゃ','nya','/alphabet/yoonhira/audio/nya.mp3','/alphabet/yoonhira/image/nya.gif'),(161,5,'にゅ','nyu','/alphabet/yoonhira/audio/nyu.mp3','/alphabet/yoonhira/image/nyu.gif'),(162,5,'にょ','nyo','/alphabet/yoonhira/audio/nyo.mp3','/alphabet/yoonhira/image/nyo.gif'),(163,5,'ひゃ','hya','/alphabet/yoonhira/audio/hya.mp3','/alphabet/yoonhira/image/hya.gif'),(164,5,'ひゅ','hyu','/alphabet/yoonhira/audio/hyu.mp3','/alphabet/yoonhira/image/hyu.gif'),(165,5,'ひょ','hyo','/alphabet/yoonhira/audio/hyo.mp3','/alphabet/yoonhira/image/hyo.gif'),(166,5,'みゃ','mya','/alphabet/yoonhira/audio/mya.mp3','/alphabet/yoonhira/image/mya.gif'),(167,5,'みゅ','myu','/alphabet/yoonhira/audio/myu.mp3','/alphabet/yoonhira/image/myu.gif'),(168,5,'みょ','myo','/alphabet/yoonhira/audio/myo.mp3','/alphabet/yoonhira/image/myo.gif'),(169,5,'りゃ','rya','/alphabet/yoonhira/audio/rya.mp3','/alphabet/yoonhira/image/rya.gif'),(170,5,'りゅ','ryu','/alphabet/yoonhira/audio/ryu.mp3','/alphabet/yoonhira/image/ryu.gif'),(171,5,'りょ','ryo','/alphabet/yoonhira/audio/ryo.mp3','/alphabet/yoonhira/image/ryo.gif'),(172,5,'ぎゃ','gya','/alphabet/yoonhira/audio/gya.mp3','/alphabet/yoonhira/image/gya.gif'),(173,5,'ぎゅ','gyu','/alphabet/yoonhira/audio/gyu.mp3','/alphabet/yoonhira/image/gyu.gif'),(174,5,'ぎょ','gyo','/alphabet/yoonhira/audio/gyo.mp3','/alphabet/yoonhira/image/gyo.gif'),(175,5,'じゃ','ja','/alphabet/yoonhira/audio/ja.mp3','/alphabet/yoonhira/image/ja.gif'),(176,5,'じゅ','ju','/alphabet/yoonhira/audio/ju.mp3','/alphabet/yoonhira/image/ju.gif'),(177,5,'じょ','jo','/alphabet/yoonhira/audio/jo.mp3','/alphabet/yoonhira/image/jo.gif'),(178,5,'びゃ','bya','/alphabet/yoonhira/audio/bya.mp3','/alphabet/yoonhira/image/bya.gif'),(179,5,'びゅ','byu','/alphabet/yoonhira/audio/byu.mp3','/alphabet/yoonhira/image/byu.gif'),(180,5,'びょ','byo','/alphabet/yoonhira/audio/byo.mp3','/alphabet/yoonhira/image/byo.gif'),(181,5,'ぴゃ','pya','/alphabet/yoonhira/audio/pya.mp3','/alphabet/yoonhira/image/pya.gif'),(182,5,'ぴゅ','pyu','/alphabet/yoonhira/audio/pyu.mp3','/alphabet/yoonhira/image/pyu.gif'),(183,5,'ぴょ','pyo','/alphabet/yoonhira/audio/pyo.mp3','/alphabet/yoonhira/image/pyo.gif'),(184,6,'キャ','kya','/alphabet/yoonkata/audio/kya.mp3','/alphabet/yoonkata/image/kya.gif'),(185,6,'キュ','kyu','/alphabet/yoonkata/audio/kyu.mp3','/alphabet/yoonkata/image/kyu.gif'),(186,6,'キョ','kyo','/alphabet/yoonkata/audio/kyo.mp3','/alphabet/yoonkata/image/kyo.gif'),(187,6,'シャ','sha','/alphabet/yoonkata/audio/sha.mp3','/alphabet/yoonkata/image/sha.gif'),(188,6,'シュ','shu','/alphabet/yoonkata/audio/shu.mp3','/alphabet/yoonkata/image/shu.gif'),(189,6,'ショ','sho','/alphabet/yoonkata/audio/sho.mp3','/alphabet/yoonkata/image/sho.gif'),(190,6,'チャ','cha','/alphabet/yoonkata/audio/cha.mp3','/alphabet/yoonkata/image/cha.gif'),(191,6,'チュ','chu','/alphabet/yoonkata/audio/chu.mp3','/alphabet/yoonkata/image/chu.gif'),(192,6,'チョ','cho','/alphabet/yoonkata/audio/cho.mp3','/alphabet/yoonkata/image/cho.gif'),(193,6,'ニャ','nya','/alphabet/yoonkata/audio/nya.mp3','/alphabet/yoonkata/image/nya.gif'),(194,6,'ニュ','nyu','/alphabet/yoonkata/audio/nyu.mp3','/alphabet/yoonkata/image/nyu.gif'),(195,6,'ニョ','nyo','/alphabet/yoonkata/audio/nyo.mp3','/alphabet/yoonkata/image/nyo.gif'),(196,6,'ヒャ','hya','/alphabet/yoonkata/audio/hya.mp3','/alphabet/yoonkata/image/hya.gif'),(197,6,'ヒュ','hyu','/alphabet/yoonkata/audio/hyu.mp3','/alphabet/yoonkata/image/hyu.gif'),(198,6,'ヒョ','hyo','/alphabet/yoonkata/audio/hyo.mp3','/alphabet/yoonkata/image/hyo.gif'),(199,6,'ミャ','mya','/alphabet/yoonkata/audio/mya.mp3','/alphabet/yoonkata/image/mya.gif'),(200,6,'ミュ','myu','/alphabet/yoonkata/audio/myu.mp3','/alphabet/yoonkata/image/myu.gif'),(201,6,'ミョ','myo','/alphabet/yoonkata/audio/myo.mp3','/alphabet/yoonkata/image/myo.gif'),(202,6,'リャ','rya','/alphabet/yoonkata/audio/rya.mp3','/alphabet/yoonkata/image/rya.gif'),(203,6,'リュ','ryu','/alphabet/yoonkata/audio/ryu.mp3','/alphabet/yoonkata/image/ryu.gif'),(204,6,'リョ','ryo','/alphabet/yoonkata/audio/ryo.mp3','/alphabet/yoonkata/image/ryo.gif'),(205,6,'ギャ','gya','/alphabet/yoonkata/audio/gya.mp3','/alphabet/yoonkata/image/gya.gif'),(206,6,'ギュ','gyu','/alphabet/yoonkata/audio/gyu.mp3','/alphabet/yoonkata/image/gyu.gif'),(207,6,'ギョ','gyo','/alphabet/yoonkata/audio/gyo.mp3','/alphabet/yoonkata/image/gyo.gif'),(208,6,'ジャ','ja','/alphabet/yoonkata/audio/ja.mp3','/alphabet/yoonkata/image/ja.gif'),(209,6,'ジュ','ju','/alphabet/yoonkata/audio/ju.mp3','/alphabet/yoonkata/image/ju.gif'),(210,6,'ジョ','jo','/alphabet/yoonkata/audio/jo.mp3','/alphabet/yoonkata/image/jo.gif'),(211,6,'ビャ','bya','/alphabet/yoonkata/audio/bya.mp3','/alphabet/yoonkata/image/bya.gif'),(212,6,'ビュ','byu','/alphabet/yoonkata/audio/byu.mp3','/alphabet/yoonkata/image/byu.gif'),(213,6,'ビョ','byo','/alphabet/yoonkata/audio/byo.mp3','/alphabet/yoonkata/image/byo.gif'),(214,6,'ピャ','pya','/alphabet/yoonkata/audio/pya.mp3','/alphabet/yoonkata/image/pya.gif'),(215,6,'ピュ','pyu','/alphabet/yoonkata/audio/pyu.mp3','/alphabet/yoonkata/image/pyu.gif'),(216,6,'ピョ','pyo','/alphabet/yoonkata/audio/pyo.mp3','/alphabet/yoonkata/image/pyo.gif'),(217,7,'ゼロ','0','/alphabet/number/audio/0.mp3',NULL),(218,7,'いち','1','/alphabet/number/audio/1.mp3',NULL),(219,7,'に','2','/alphabet/number/audio/2.mp3',''),(220,7,'さん','3','/alphabet/number/audio/3.mp3',''),(221,7,'よん','4','/alphabet/number/audio/4.mp3',''),(222,7,'ご','5','/alphabet/number/audio/5.mp3',''),(223,7,'ろく','6','/alphabet/number/audio/6.mp3',''),(224,7,'しち','7','/alphabet/number/audio/7.mp3',''),(225,7,'はち','8','/alphabet/number/audio/8.mp3',''),(226,7,'きゅう','9','/alphabet/number/audio/9.mp3',''),(227,7,'じゅう','10','/alphabet/number/audio/10.mp3',''),(228,7,'じゅうご','15','/alphabet/number/audio/15.mp3',''),(229,7,'にじゅう','20','/alphabet/number/audio/20.mp3',''),(230,7,'さんじゅう','30','/alphabet/number/audio/30.mp3',''),(231,7,'よんじゅう','40','/alphabet/number/audio/40.mp3',''),(232,7,'ごじゅう','50','/alphabet/number/audio/50.mp3',''),(233,7,'ろくじゅう','60','/alphabet/number/audio/60.mp3',''),(234,7,'ななじゅう','70','/alphabet/number/audio/70.mp3',''),(235,7,'はちじゅう','80','/alphabet/number/audio/80.mp3',''),(236,7,'きゅうじゅう','90','/alphabet/number/audio/90.mp3',''),(237,7,'ひゃく','100','/alphabet/number/audio/100.mp3',''),(238,7,'にひゃく','200','/alphabet/number/audio/200.mp3',''),(239,7,'さんびゃく','300','/alphabet/number/audio/300.mp3',''),(240,7,'よんひゃく','400','/alphabet/number/audio/400.mp3',''),(241,7,'ごひゃく','500','/alphabet/number/audio/500.mp3',''),(242,7,'ろっぴゃく','600','/alphabet/number/audio/600.mp3',''),(243,7,'ななひゃく','700','/alphabet/number/audio/700.mp3',''),(244,7,'はっぴゃく','800','/alphabet/number/audio/800.mp3',''),(245,7,'きゅうひゃく','900','/alphabet/number/audio/900.mp3',''),(246,7,'せん','1000','/alphabet/number/audio/1000.mp3',''),(247,7,'にせん','2000','/alphabet/number/audio/2000.mp3',''),(248,7,'さんぜん','3000','/alphabet/number/audio/3000.mp3',''),(249,7,'よんせん','4000','/alphabet/number/audio/4000.mp3',''),(250,7,'ごせん','5000','/alphabet/number/audio/5000.mp3',''),(251,7,'ろくせん','6000','/alphabet/number/audio/6000.mp3',''),(252,7,'ななせん','7000','/alphabet/number/audio/7000.mp3',''),(253,7,'はっせん','8000','/alphabet/number/audio/8000.mp3',''),(254,7,'きゅうせん','9000','/alphabet/number/audio/9000.mp3',''),(255,7,'いちまん','10000','/alphabet/number/audio/10000.mp3',''),(256,7,'にまん','20000','/alphabet/number/audio/20000.mp3',''),(257,7,'さんまん','30000','/alphabet/number/audio/30000.mp3',''),(258,7,'ごまん','50000','/alphabet/number/audio/50000.mp3',''),(259,7,'ろくまん','60000','/alphabet/number/audio/60000.mp3',''),(260,7,'はちまん','80000','/alphabet/number/audio/80000.mp3',''),(261,7,'きゅうまん','90000','/alphabet/number/audio/90000.mp3','');
/*!40000 ALTER TABLE `alphabet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alphabettype`
--

DROP TABLE IF EXISTS `alphabettype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alphabettype` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alphabettype`
--

LOCK TABLES `alphabettype` WRITE;
/*!40000 ALTER TABLE `alphabettype` DISABLE KEYS */;
INSERT INTO `alphabettype` VALUES (1,'hiragana_alphabet'),(2,'katakana_alphabet'),(3,'hiragana_dakuten'),(4,'katakana_dakuten'),(5,'hiragana_yoon'),(6,'katakana_yoon'),(7,'number');
/*!40000 ALTER TABLE `alphabettype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `course_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `course_level` text,
  `course_skill` text,
  `course_status_id` int DEFAULT NULL,
  `course_image` text,
  `week` int DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `course_status_id` (`course_status_id`),
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`course_status_id`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'Tiếng Nhật cơ bản 1','Khóa học dành cho người mới bắt đầu, tập trung vào việc phát triển các kỹ năng tiếng Nhật. Với phương pháp tiếp cận thực tế, giúp người học dễ dàng áp dụng ngôn ngữ vào cuộc sống hàng ngày và các tình huống giao tiếp thực tế.',NULL,NULL,2,'http://localhost:5000/uploads/Screenshot 2024-07-04 183357-1720597145626.png',5),(2,'Tiếng Nhật trung cấp 1','Khóa học dành cho người học trung cấp, tập trung vào việc phát triển các kỹ năng tiếng Nhật. Với phương pháp tiếp cận thực tế, giúp người học dễ dàng áp dụng ngôn ngữ vào cuộc sống hàng ngày và các tình huống giao tiếp thực tế.',NULL,NULL,2,'http://localhost:5000/uploads/dekiru-nihongo-so-trung-cap-5q-resize-1720704618625.jpg',6),(4,'1323','444',NULL,NULL,3,', http://localhost:5000/uploads/438173070_777075011236802_6840252571953289906_n-1719666821733-1719667241771.jpg, http://localhost:5000/uploads/440939000_777072197903750_6756265267936747519_n-1719672034241.jpg',4),(5,'12323','312213312',NULL,NULL,3,'http://localhost:5000/uploads/438081579_777075177903452_1244932991696882456_n-1719672061651-1720156601353.jpg',3),(6,'12','12',NULL,NULL,3,'',5),(7,'Course 3','Course 3 description ',NULL,NULL,1,'http://localhost:5000/uploads/Screenshot 2024-07-05 102453-1720702175715.png',3);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `day`
--

DROP TABLE IF EXISTS `day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `day` (
  `day_id` int NOT NULL AUTO_INCREMENT,
  `day_name` varchar(255) NOT NULL,
  `week_id` int DEFAULT NULL,
  `day_status_id` int DEFAULT NULL,
  `repeat_lesson` text,
  PRIMARY KEY (`day_id`),
  KEY `week_id` (`week_id`),
  KEY `day_status_id` (`day_status_id`),
  CONSTRAINT `day_ibfk_1` FOREIGN KEY (`week_id`) REFERENCES `week` (`week_id`),
  CONSTRAINT `day_ibfk_2` FOREIGN KEY (`day_status_id`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `day`
--

LOCK TABLES `day` WRITE;
/*!40000 ALTER TABLE `day` DISABLE KEYS */;
INSERT INTO `day` VALUES (1,'Ngày 1 ',1,2,'null'),(2,'Ngày 2',1,2,'null'),(3,'Ngày 3',1,2,'null'),(4,'Ngày 4',1,2,'null'),(5,'Ngày 5',1,2,'null'),(6,'Ngày 6',1,2,'null'),(7,'123132',4,1,NULL),(8,'62746',4,3,NULL),(9,'1',8,1,NULL),(10,'This is test',11,1,'null'),(11,'This is test2',11,1,'[\"Week 1 - Day 1\"]'),(12,'test week 2 -day 2',12,3,'[\"Week 1 - Day 1\",\"Week 1 - Day 2\"]'),(13,'Ngay 1 Tuan 2',3,1,'[]'),(14,'Ngay ２ Tuan 2',3,3,'[\"Week 1 - Day 2\"]'),(15,'Ngay 2 tuan 2',3,3,'[\"Week 1 - Day 2\"]'),(16,'Ngay 3 tuan 2',3,3,'[]'),(17,'Ngay 2 tuan 2',3,1,'[\"Week 1 - Day 2\"]');
/*!40000 ALTER TABLE `day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enroll`
--

DROP TABLE IF EXISTS `enroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enroll` (
  `enroll_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `course_id` int NOT NULL,
  `enrolled_date` datetime DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  PRIMARY KEY (`enroll_id`),
  KEY `account_id` (`account_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `enroll_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`),
  CONSTRAINT `enroll_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enroll`
--

LOCK TABLES `enroll` WRITE;
/*!40000 ALTER TABLE `enroll` DISABLE KEYS */;
/*!40000 ALTER TABLE `enroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grammar`
--

DROP TABLE IF EXISTS `grammar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grammar` (
  `grammar_id` int NOT NULL AUTO_INCREMENT,
  `day_id` int NOT NULL,
  `grammar_name` varchar(255) NOT NULL,
  `grammar_structure` varchar(255) NOT NULL,
  `grammar_description` varchar(255) DEFAULT NULL,
  `grammar_image` text,
  `grammar_status_id` int NOT NULL,
  PRIMARY KEY (`grammar_id`),
  KEY `grammar_status_id` (`grammar_status_id`),
  KEY `day_id` (`day_id`),
  CONSTRAINT `grammar_ibfk_1` FOREIGN KEY (`day_id`) REFERENCES `day` (`day_id`),
  CONSTRAINT `grammar_ibfk_2` FOREIGN KEY (`grammar_status_id`) REFERENCES `status` (`status_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grammar`
--

LOCK TABLES `grammar` WRITE;
/*!40000 ALTER TABLE `grammar` DISABLE KEYS */;
INSERT INTO `grammar` VALUES (1,1,'私の名前・国・仕事','私は（名前）です','Giới thiệu về tên','',1),(2,1,'私の名前・国・仕事','（国）人です','Giới thiệu quốc tịch','',1);
/*!40000 ALTER TABLE `grammar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grammarexample`
--

DROP TABLE IF EXISTS `grammarexample`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grammarexample` (
  `grammar_example_id` int NOT NULL AUTO_INCREMENT,
  `grammar_id` int NOT NULL,
  `grammar_example` varchar(255) NOT NULL,
  `grammar_example_meaning` varchar(255) NOT NULL,
  `grammar_example_status_id` int NOT NULL,
  PRIMARY KEY (`grammar_example_id`),
  KEY `grammar_id` (`grammar_id`),
  KEY `grammar_example_status_id` (`grammar_example_status_id`),
  CONSTRAINT `grammarexample_ibfk_1` FOREIGN KEY (`grammar_id`) REFERENCES `grammar` (`grammar_id`),
  CONSTRAINT `grammarexample_ibfk_2` FOREIGN KEY (`grammar_example_status_id`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1060 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grammarexample`
--

LOCK TABLES `grammarexample` WRITE;
/*!40000 ALTER TABLE `grammarexample` DISABLE KEYS */;
INSERT INTO `grammarexample` VALUES (1,1,'私はハイです。','Tôi là Hải.',2),(2,2,'ドイツじんです。','Tôi là người Đức.',2);
/*!40000 ALTER TABLE `grammarexample` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kanji`
--

DROP TABLE IF EXISTS `kanji`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kanji` (
  `kanji_id` int NOT NULL AUTO_INCREMENT,
  `day_id` int NOT NULL,
  `kanji_name` varchar(255) NOT NULL,
  `cv_spelling` varchar(255) NOT NULL,
  `kanji_kunyomi` varchar(255) DEFAULT NULL,
  `kanji_onyomi` varchar(255) DEFAULT NULL,
  `kanji_image` text,
  `kanji_status_id` int NOT NULL,
  PRIMARY KEY (`kanji_id`),
  KEY `kanji_status_id` (`kanji_status_id`),
  KEY `day_id` (`day_id`),
  CONSTRAINT `kanji_ibfk_1` FOREIGN KEY (`day_id`) REFERENCES `day` (`day_id`),
  CONSTRAINT `kanji_ibfk_2` FOREIGN KEY (`kanji_status_id`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kanji`
--

LOCK TABLES `kanji` WRITE;
/*!40000 ALTER TABLE `kanji` DISABLE KEYS */;
INSERT INTO `kanji` VALUES (1,4,'私','Tư','わたし','し','',1),(2,4,'人','Nhân','ひと','じん／にん','',1),(4,8,'213213','123312','123321','123132','http://localhost:5000/uploads/440935418_777072171237086_8369776791388599191_n-1719648991595-1719652536455-1719657666594.jpg, http://localhost:5000/uploads/440935418_777072171237086_8369776791388599191_n-1719648991595-1719652536455-1719657666594-1719658597259.jpg',3),(5,8,'213213','123312','123321','123132','http://localhost:5000/uploads/440935418_777072171237086_8369776791388599191_n-1719648991595-1719652536455-1719657666594.jpg, http://localhost:5000/uploads/440935418_777072171237086_8369776791388599191_n-1719648991595-1719652536455-1719657666594-1719658597259.jpg',3),(6,8,'213213','123312','123321','123132','http://localhost:5000/uploads/440935418_777072171237086_8369776791388599191_n-1719648991595-1719652536455-1719657666594.jpg, http://localhost:5000/uploads/440935418_777072171237086_8369776791388599191_n-1719648991595-1719652536455-1719657666594-1719658597259.jpg',3),(7,9,'This is test ','123','123','123','http://localhost:5000/uploads/440939000_777072197903750_6756265267936747519_n-1719672034241-1720156621674.jpg',1),(8,13,'kn1','12','12','12','',1);
/*!40000 ALTER TABLE `kanji` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kanjiword`
--

DROP TABLE IF EXISTS `kanjiword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kanjiword` (
  `kanji_word_id` int NOT NULL AUTO_INCREMENT,
  `kanji_id` int NOT NULL,
  `kanji_word` varchar(255) NOT NULL,
  `hiragana_character` varchar(255) NOT NULL,
  `kanji_word_meaning` varchar(255) NOT NULL,
  `kanji_word_status_id` int NOT NULL,
  PRIMARY KEY (`kanji_word_id`),
  KEY `kanji_id` (`kanji_id`),
  CONSTRAINT `kanjiword_ibfk_1` FOREIGN KEY (`kanji_id`) REFERENCES `kanji` (`kanji_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kanjiword`
--

LOCK TABLES `kanjiword` WRITE;
/*!40000 ALTER TABLE `kanjiword` DISABLE KEYS */;
INSERT INTO `kanjiword` VALUES (1,1,'私','わたし','tôi',1),(2,1,'私たち','わたしたち','chúng tôi',1),(3,2,'ベトナム人','ベトナムじん','người Việt Nam',1),(4,2,'三人','さんにん','3 người',1);
/*!40000 ALTER TABLE `kanjiword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson`
--

DROP TABLE IF EXISTS `lesson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson` (
  `lesson_id` int NOT NULL AUTO_INCREMENT,
  `day_id` int NOT NULL,
  `lesson_description` varchar(255) NOT NULL,
  `lesson_type_id` int NOT NULL,
  `lesson_status_id` int NOT NULL,
  PRIMARY KEY (`lesson_id`),
  KEY `day_id` (`day_id`),
  KEY `lesson_type_id` (`lesson_type_id`),
  KEY `lesson_status_id` (`lesson_status_id`),
  CONSTRAINT `lesson_ibfk_1` FOREIGN KEY (`day_id`) REFERENCES `day` (`day_id`),
  CONSTRAINT `lesson_ibfk_2` FOREIGN KEY (`lesson_type_id`) REFERENCES `quiztype` (`quiz_type_id`),
  CONSTRAINT `lesson_ibfk_3` FOREIGN KEY (`lesson_status_id`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson`
--

LOCK TABLES `lesson` WRITE;
/*!40000 ALTER TABLE `lesson` DISABLE KEYS */;
/*!40000 ALTER TABLE `lesson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `option`
--

DROP TABLE IF EXISTS `option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option` (
  `option_id` int NOT NULL AUTO_INCREMENT,
  `option_content` varchar(255) NOT NULL,
  `question_id` int NOT NULL,
  `option_status_id` int NOT NULL,
  PRIMARY KEY (`option_id`),
  KEY `question_id` (`question_id`),
  KEY `option_status_id` (`option_status_id`),
  CONSTRAINT `option_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `option_ibfk_2` FOREIGN KEY (`option_status_id`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option`
--

LOCK TABLES `option` WRITE;
/*!40000 ALTER TABLE `option` DISABLE KEYS */;
/*!40000 ALTER TABLE `option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp`
--

DROP TABLE IF EXISTS `otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp` (
  `otp_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `otp_code` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `expires_at` datetime NOT NULL,
  PRIMARY KEY (`otp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp`
--

LOCK TABLES `otp` WRITE;
/*!40000 ALTER TABLE `otp` DISABLE KEYS */;
INSERT INTO `otp` VALUES (1,'huyydoooo@gmail.com','TcKowk','2024-07-16 23:22:26','2024-07-16 23:23:26'),(4,'testotp@gmail.com','Ep6S8C','2024-07-17 14:27:02','2024-07-17 14:28:02'),(5,'minhtn1234@gmail.com','YTVSci','2024-07-17 22:08:56','2024-07-17 22:09:56');
/*!40000 ALTER TABLE `otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `quiz_id` int NOT NULL,
  `question_content` varchar(255) NOT NULL,
  `question_answer` varchar(255) NOT NULL,
  `question_type_id` int NOT NULL,
  `question_status_id` int NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `question_type_id` (`question_type_id`),
  KEY `quiz_id` (`quiz_id`),
  KEY `question_status_id` (`question_status_id`),
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`quiz_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `question_ibfk_2` FOREIGN KEY (`question_type_id`) REFERENCES `questiontype` (`question_type_id`),
  CONSTRAINT `question_ibfk_3` FOREIGN KEY (`question_status_id`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,1,'QC1','QA1',1,2),(2,2,'QC2','QA2',2,2),(3,2,'QC3','QA3',2,2);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questiontype`
--

DROP TABLE IF EXISTS `questiontype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questiontype` (
  `question_type_id` int NOT NULL AUTO_INCREMENT,
  `question_type_name` varchar(255) DEFAULT NULL,
  `question_type_status_id` int NOT NULL,
  PRIMARY KEY (`question_type_id`),
  KEY `question_type_status_id` (`question_type_status_id`),
  CONSTRAINT `question_type_ibfk_1` FOREIGN KEY (`question_type_status_id`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questiontype`
--

LOCK TABLES `questiontype` WRITE;
/*!40000 ALTER TABLE `questiontype` DISABLE KEYS */;
INSERT INTO `questiontype` VALUES (1,'Multiple choice',2),(2,'test update 1',3);
/*!40000 ALTER TABLE `questiontype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `quiz_id` int NOT NULL AUTO_INCREMENT,
  `week_id` int NOT NULL,
  `quiz_name` varchar(255) NOT NULL,
  `quiz_type_id` int NOT NULL,
  `quiz_status_id` int NOT NULL,
  `point` int NOT NULL,
  PRIMARY KEY (`quiz_id`),
  KEY `week_id` (`week_id`),
  KEY `quiz_type_id` (`quiz_type_id`),
  KEY `quiz_status_id` (`quiz_status_id`),
  CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`week_id`) REFERENCES `week` (`week_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `quiz_ibfk_2` FOREIGN KEY (`quiz_type_id`) REFERENCES `quiztype` (`quiz_type_id`),
  CONSTRAINT `quiz_ibfk_3` FOREIGN KEY (`quiz_status_id`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (1,1,'QN1 test update ',1,3,10),(2,2,'QN2',2,2,20),(5,2,'test create quiz',2,3,100),(6,2,'test create quiz lan 2',2,3,100);
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiztype`
--

DROP TABLE IF EXISTS `quiztype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiztype` (
  `quiz_type_id` int NOT NULL AUTO_INCREMENT,
  `quiz_type_name` varchar(255) DEFAULT NULL,
  `quiz_type_status_id` int NOT NULL,
  PRIMARY KEY (`quiz_type_id`),
  KEY `quiz_type_status_id` (`quiz_type_status_id`),
  CONSTRAINT `quiz_type_ibfk_1` FOREIGN KEY (`quiz_type_status_id`) REFERENCES `status` (`status_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiztype`
--

LOCK TABLES `quiztype` WRITE;
/*!40000 ALTER TABLE `quiztype` DISABLE KEYS */;
INSERT INTO `quiztype` VALUES (1,'Vocab',2),(2,'Kanji',2),(3,'Grammar',2),(5,'test create',3);
/*!40000 ALTER TABLE `quiztype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'Content manager'),(3,'Content creator'),(4,'User');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20240419163550-create-roles.js'),('20240529144037-create-status.js'),('20240530082643-create-alphabet-types.js'),('20240530141446-create-account.js'),('20240601022943-create-alphabet.js'),('20240601154845-create-course.js'),('20240601194222-create-quiztype.js'),('20240601200515-create-questiontype.js'),('20240602053128-create-day.js'),('20240602053128-create-week.js'),('20240602054823-create-vocabulary.js'),('20240602055254-create-grammar.js'),('20240602055613-create-grammar-example.js'),('20240602061032-create-kanji.js'),('20240602061038-create-kanji-word.js'),('20240602061049-create-quiz.js'),('20240602061053-create-question.js'),('20240602061100-create-option.js'),('20240602065613-create-account-quiz.js'),('20240610144745-create-video.js'),('20240716092444-create-otp-table.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizeseeder`
--

DROP TABLE IF EXISTS `sequelizeseeder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizeseeder` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizeseeder`
--

LOCK TABLES `sequelizeseeder` WRITE;
/*!40000 ALTER TABLE `sequelizeseeder` DISABLE KEYS */;
INSERT INTO `sequelizeseeder` VALUES ('20240504155846-role.js'),('20240529144427-status.js'),('20240530083947-alphabet_types.js'),('20240601134756-alphabet.js'),('20240601192503-course.js'),('20240601195231-quiz_type.js'),('20240601200853-question_type.js');
/*!40000 ALTER TABLE `sequelizeseeder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `status_id` int NOT NULL AUTO_INCREMENT,
  `status_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'pending'),(2,'active'),(3,'deactive'),(4,'done'),(5,'undone');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `video_id` int NOT NULL AUTO_INCREMENT,
  `video_name` varchar(255) NOT NULL,
  `video_link` text,
  `video_status_id` int NOT NULL,
  `day_id` int DEFAULT NULL,
  PRIMARY KEY (`video_id`),
  KEY `video_status_id` (`video_status_id`),
  KEY `video_ibfk_1` (`day_id`),
  CONSTRAINT `video_ibfk_1` FOREIGN KEY (`day_id`) REFERENCES `day` (`day_id`),
  CONSTRAINT `video_ibfk_2` FOREIGN KEY (`video_status_id`) REFERENCES `status` (`status_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES (1,'Test video','http://localhost:5000/uploads/file_example_MP4_480_1_5MG-1720175010714.mp4',1,9);
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videooption`
--

DROP TABLE IF EXISTS `videooption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videooption` (
  `option_id` int NOT NULL AUTO_INCREMENT,
  `video_question_id` int NOT NULL,
  `option_content` varchar(255) NOT NULL,
  `video_option_status_id` int NOT NULL,
  PRIMARY KEY (`option_id`),
  KEY `video_question_id` (`video_question_id`),
  KEY `video_option_status_id` (`video_option_status_id`),
  CONSTRAINT `video_option_ibfk_1` FOREIGN KEY (`video_question_id`) REFERENCES `videoquestion` (`video_question_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `video_option_ibfk_2` FOREIGN KEY (`video_option_status_id`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videooption`
--

LOCK TABLES `videooption` WRITE;
/*!40000 ALTER TABLE `videooption` DISABLE KEYS */;
INSERT INTO `videooption` VALUES (1,1,'A. 1',1),(2,1,'C. 3',1),(3,1,'B. 2',1),(4,1,'D. 4',1),(5,2,'C. 3',1),(6,2,'D. 4',1),(7,2,'A. 1',1),(8,2,'B. 2',1);
/*!40000 ALTER TABLE `videooption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videoquestion`
--

DROP TABLE IF EXISTS `videoquestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videoquestion` (
  `video_question_id` int NOT NULL AUTO_INCREMENT,
  `video_id` int NOT NULL,
  `question_content` varchar(255) NOT NULL,
  `question_answer` varchar(255) NOT NULL,
  `video_question_status_id` int NOT NULL,
  PRIMARY KEY (`video_question_id`),
  KEY `video_id` (`video_id`),
  KEY `video_question_status_id` (`video_question_status_id`),
  CONSTRAINT `video_question_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`),
  CONSTRAINT `video_question_ibfk_2` FOREIGN KEY (`video_question_status_id`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videoquestion`
--

LOCK TABLES `videoquestion` WRITE;
/*!40000 ALTER TABLE `videoquestion` DISABLE KEYS */;
INSERT INTO `videoquestion` VALUES (1,1,'This is new Questton1 ','A',1),(2,1,'This is new Questton 2','B',1);
/*!40000 ALTER TABLE `videoquestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vocabulary`
--

DROP TABLE IF EXISTS `vocabulary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vocabulary` (
  `vocab_id` int NOT NULL AUTO_INCREMENT,
  `day_id` int NOT NULL,
  `vocab_name` varchar(255) NOT NULL,
  `vocab_kanji` varchar(255) DEFAULT NULL,
  `vocab_meaning` varchar(255) NOT NULL,
  `vocab_example` varchar(255) DEFAULT NULL,
  `vocab_image` text,
  `vocab_status_id` int NOT NULL,
  `vocab_audio` text,
  `vocab_example_meaning` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`vocab_id`),
  KEY `vocab_status_id` (`vocab_status_id`),
  KEY `day_id` (`day_id`),
  CONSTRAINT `vocabulary_ibfk_1` FOREIGN KEY (`day_id`) REFERENCES `day` (`day_id`),
  CONSTRAINT `vocabulary_ibfk_2` FOREIGN KEY (`vocab_status_id`) REFERENCES `status` (`status_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vocabulary`
--

LOCK TABLES `vocabulary` WRITE;
/*!40000 ALTER TABLE `vocabulary` DISABLE KEYS */;
INSERT INTO `vocabulary` VALUES (1,1,'わたし','私','Tôi','私はベトナム人です。','',1,'','Tôi là người Việt Nam.'),(2,1,'（お）なまえ','（お）名前','Tên (bạn)','お名前は何ですか？\n','',1,'','Tên bạn là gì?'),(3,1,'（お）くに','（お）国','Đất nước (bạn)','おくにはどちらですか？','',1,'','Bạn đến từ nước nào?'),(4,1,'にほん','日本','Nhật Bản','にほんはうつくしいくにです。','',1,'','Nhật Bản là một đất nước đẹp.'),(5,1,'かんこく','韓国','Hàn Quốc','かんこくがすきです。','',1,'','Tôi thích Hàn Quốc.'),(6,1,'ちゅうごく','中国','Trung Quốc','ちゅうごくは大きいくにです。','',1,'','Trung Quốc là một quốc gia lớn.'),(7,1,'アメリカ','','Mỹ','アメリカにいきたいです。','',1,'','Tôi muốn đến Mỹ.'),(8,1,'イタリア','','Ý','イタリアのピザがすきです。','',1,'','Tôi thích pizza của Ý.'),(9,1,'オーストラリア ','','Úc','オーストラリアのどうぶつはおもしろいです。','',1,'','Động vật ở Úc rất thú vị.'),(10,1,'ロシア','','Nga','ロシアのふゆはさむいです。','',1,'','Mùa đông ở Nga rất lạnh.'),(11,1,'タイ','','Thái Lan','タイりょうりがおいしいです。','',1,'','Ẩm thực Thái Lan rất ngon.'),(12,2,'こうこう','高校','Trường trung học phổ thông (cấp 3)','わたしのいもうとは こうこう に かよっています。',' ',1,'','Em gái của tôi đang học trung học phổ thông.'),(13,2,'だいがく','大学','Trường đại học','わたしは とうきょうだいがく の がくせい です。',' ',1,' ','Tôi là sinh viên của trường Đại học Tokyo.'),(14,2,'にほんごがっこう','日本語学校','Trường tiếng Nhật','かれは にほんごがっこう で にほんご を べんきょう しています。',' ',1,'','Anh ấy đang học tiếng Nhật tại trường tiếng Nhật.'),(15,2,'（お）しごと','(お）仕事','Công việc (của bạn)','かれの しごと は とても いそがしい です。',' ',1,'','Công việc của anh ấy rất bận rộn.'),(16,2,'がくせい','学生','Học sinh','わたしは がくせい です。',' ',1,'','Tôi là học sinh.'),(17,2,'せんせい','先生','Thầy/Cô giáo','たなかせんせい は わたしたち の すうがく の せんせい です。',' ',1,'','Thầy Tanaka là giáo viên dạy toán của chúng tôi.'),(18,2,'きょうし','教師','Giáo viên','かのじょ は けいけん ほうふ な きょうし です。',' ',1,'','Cô ấy là một giáo viên có nhiều kinh nghiệm.'),(19,2,'かいしゃいん','会社員','Nhân viên văn phòng','あに は かいしゃいん です。',' ',1,'','Anh trai tôi là nhân viên văn phòng.'),(20,2,'しゃいん','社員','Nhân viên (của công ty nào đó)','かれ は この かいしゃ の しゃいん です。',' ',1,'','Anh ấy là nhân viên của công ty này.'),(21,3,'～さん',' ','Anh/Chị/Ông/Bà/Bạn','たなかさん は どこ です か？','',1,'','Anh Tanaka ở đâu vậy?'),(22,3,'～じん','～人','Người (nước nào)','かのじょ は にほんじん です','',1,'','Cô ấy là người Nhật Bản.'),(23,3,'～ご','～語','Tiếng (nước nào)','あなた は えいご を はなせ ます か？','',1,'','Bạn có thể nói tiếng Anh không?'),(24,3,'どちら',' ','Ở đâu / Phía nào','トイレ は どちら です か？','',1,'','Nhà vệ sinh ở đâu vậy?'),(25,3,'はじめまして',' ','Xin chào (lần đầu gặp mặt)','はじめまして、たなか です。','',1,'','Đất nước của bạn là nước nào?'),(26,3,'（どうぞ）よろしくお願',' ','Rất mong nhận được sự giúp đỡ của bạn','はじめまして、たなか です。どうぞ よろしく おねがい します。','',1,'','Xin chào, tôi là Tanaka.'),(27,3,'こちらこそ',' ','Tôi cũng vậy!','どうぞ よろしく おねがい します。 B: こちらこそ。','',1,'','Xin chào, tôi là Tanaka. Rất mong nhận được sự giúp đỡ của bạn.'),(28,3,'あのう',' ','Anh / chị ơi…','あのう、ちょっと たずねます が。','',1,'',''),(29,3,'すみません',' ','Xin lỗi… cho tôi hỏi…','すみません、いま なんじ です か？','',1,'','Anh/chị ơi, cho tôi hỏi một chút.'),(30,3,'そうですか','','Thế à!','A: きのう は ゆき が ふり ました。 B: そうですか。','',1,'','Xin lỗi, bây giờ là mấy giờ?');
/*!40000 ALTER TABLE `vocabulary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `week`
--

DROP TABLE IF EXISTS `week`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `week` (
  `week_id` int NOT NULL AUTO_INCREMENT,
  `week_name` varchar(255) DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `week_status_id` int DEFAULT NULL,
  `week_topic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`week_id`),
  KEY `course_id` (`course_id`),
  KEY `week_status_id` (`week_status_id`),
  CONSTRAINT `week_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  CONSTRAINT `week_ibfk_2` FOREIGN KEY (`week_status_id`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `week`
--

LOCK TABLES `week` WRITE;
/*!40000 ALTER TABLE `week` DISABLE KEYS */;
INSERT INTO `week` VALUES (1,'Week 1',1,1,'初めて'),(2,'Tuần 2',1,3,'初めて'),(3,'Week 2',1,1,'初めて'),(4,'Week 1',4,1,'Title For Week 1'),(5,'Week 2',4,1,'Title For Week 2'),(6,'Week 3',4,1,'Title For Week 3'),(7,'Week 4',4,1,'Title For Week 4'),(8,'Week 1',5,1,'Title For Week 1'),(9,'Week 2',5,1,'Title For Week 2'),(10,'Week 3',5,1,'Title For Week 3'),(11,'Week 1',6,1,'Title For Week 1'),(12,'Week 2',6,1,'Title For Week 2'),(13,'Week 1',7,1,'Title For Week 1'),(14,'Week 3',7,1,'Title For Week 3'),(15,'Week 2',7,1,'Title For Week 2');
/*!40000 ALTER TABLE `week` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'swp_fpt'
--

--
-- Dumping routines for database 'swp_fpt'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-19  0:26:40
