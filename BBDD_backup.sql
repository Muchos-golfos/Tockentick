-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: tokentick
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `ticket_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_internal` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_comments_ticket` (`ticket_id`),
  KEY `fk_comments_user` (`user_id`),
  CONSTRAINT `fk_comments_ticket` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,6,'kmadasml dklasmd kp maskpd ',0,'2026-05-18 16:31:38'),(2,1,6,'que pasa loco',0,'2026-05-18 16:32:13'),(3,1,9,'dsolmladmòa m',0,'2026-05-18 16:33:06'),(4,3,9,'buenas necesito ayuda \n',0,'2026-05-18 16:37:21'),(5,3,6,'buenas que necesita\n',0,'2026-05-18 16:38:25'),(6,5,9,'buenas',0,'2026-05-18 17:00:12'),(7,5,9,'pero podeis hacer algo de una vez',0,'2026-05-18 17:05:32'),(8,5,8,'que ocurre\n',0,'2026-05-18 17:06:03'),(9,5,9,'la profe que no ayuda',0,'2026-05-18 17:06:16'),(10,5,8,'esta loco no pasa nada',0,'2026-05-18 17:06:30'),(11,5,8,'perdon te escalo',0,'2026-05-18 17:06:53'),(12,6,9,'hola',0,'2026-05-19 16:13:20'),(13,8,9,'mppldplsa',0,'2026-05-19 16:47:23'),(14,7,7,'buenas tardes\n',0,'2026-05-19 16:51:15'),(15,6,7,'buenas\n',0,'2026-05-19 16:51:32'),(16,4,7,'buenas ya esta solucionado correctamente un placer',0,'2026-05-19 16:51:52'),(17,12,7,'jnjon',0,'2026-05-19 17:41:39'),(18,13,6,'buenas',0,'2026-05-19 17:51:27'),(19,14,6,'la tomo yo\n',0,'2026-05-19 18:07:59'),(20,10,6,'buenas',0,'2026-05-19 18:12:31'),(21,15,12,'buenas cuanto podran tardar en venir',0,'2026-05-21 14:06:48'),(22,17,13,'CABRÓN',0,'2026-05-21 15:10:17'),(23,18,14,'bueno pues eso',0,'2026-05-22 09:21:30'),(24,19,7,'buenas mandaremos un tecnico lo mas pronto posible',0,'2026-05-22 09:44:35'),(25,19,7,'se sabe algo',0,'2026-05-22 09:45:18'),(26,19,9,'buenas aun no llego el tecnico pero estaremos atentos\n',0,'2026-05-22 09:45:39'),(27,19,9,'dsads',0,'2026-05-22 10:29:19'),(28,23,9,'buenas',0,'2026-05-22 10:45:02'),(29,23,7,'que sucede cuentenos mas a fondo',0,'2026-05-22 10:46:02'),(30,23,8,'SISTEMA: El técnico undefined ha reclamado esta incidencia al responder en el chat.',0,'2026-05-22 10:52:15'),(31,23,8,'buenas sere yo quien lleve a partir de ahora su incidencia\n',0,'2026-05-22 10:52:16'),(32,23,8,'SISTEMA: Incidencia escalada por undefined desde L2 hacia L3.',0,'2026-05-22 10:53:05'),(33,23,6,'SISTEMA: El técnico undefined ha reclamado esta incidencia al responder en el chat.',0,'2026-05-22 10:54:34'),(34,23,6,'buenas encantado\n',0,'2026-05-22 10:54:34'),(35,24,6,'SISTEMA: El técnico Alvaro Tecnico ha reclamado esta incidencia al responder en el chat.',0,'2026-05-22 11:04:01'),(36,24,6,'buenas caballero',0,'2026-05-22 11:04:01'),(37,24,6,'SISTEMA: Incidencia escalada por undefined desde L1 hacia L2.',0,'2026-05-22 11:04:11'),(38,24,6,'SISTEMA: Incidencia escalada por Alvaro Tecnico desde L2 hacia L3.',0,'2026-05-22 11:07:32'),(39,25,9,'buenas cuando puedan responderme es urgente ',0,'2026-05-22 12:57:05'),(40,27,9,'buenas que tal',0,'2026-05-22 13:47:49'),(41,25,6,'SISTEMA: El técnico Alvaro Tecnico ha reclamado esta incidencia al responder en el chat.',0,'2026-05-22 13:48:15'),(42,25,6,'buenas esta solucionado vuelta a probar',0,'2026-05-22 13:48:15'),(43,27,6,'SISTEMA: El técnico Alvaro Tecnico ha reclamado esta incidencia al responder en el chat.',0,'2026-05-22 13:48:58'),(44,27,6,'buenas que necesita caballero',0,'2026-05-22 13:48:58');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_history`
--

DROP TABLE IF EXISTS `ticket_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_history` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `ticket_id` int unsigned NOT NULL,
  `changed_by` int unsigned NOT NULL,
  `old_status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `new_status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `old_support_level` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `new_support_level` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `change_note` text COLLATE utf8mb4_unicode_ci,
  `changed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_history_ticket` (`ticket_id`),
  KEY `fk_history_user` (`changed_by`),
  CONSTRAINT `fk_history_ticket` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_history_user` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_history`
--

LOCK TABLES `ticket_history` WRITE;
/*!40000 ALTER TABLE `ticket_history` DISABLE KEYS */;
INSERT INTO `ticket_history` VALUES (1,1,9,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-04-27 20:29:13'),(2,2,10,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-04-28 15:18:35'),(3,3,9,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-11 16:12:41'),(4,4,11,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-11 16:26:04'),(5,4,11,'open','in_progress','L1','L1','Cambio de estado','2026-05-11 16:28:07'),(6,1,9,'open','in_progress','L1','L1','Cambio de estado','2026-05-18 16:31:38'),(7,1,9,'in_progress','open','L1','L2','Escalado a L2','2026-05-18 16:32:17'),(8,1,9,'open','open','L2','L3','Escalado a L3','2026-05-18 16:32:20'),(9,1,9,'open','resolved','L3','L3','Cambio de estado','2026-05-18 16:32:22'),(10,3,9,'open','in_progress','L1','L1','Cambio de estado','2026-05-18 16:38:25'),(11,3,9,'in_progress','open','L1','L2','Escalado a L2','2026-05-18 16:40:02'),(12,3,9,'open','open','L2','L3','Escalado a L3','2026-05-18 16:40:03'),(13,5,9,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-18 16:59:56'),(14,5,9,'open','open','L1','L2','Escalado a L2','2026-05-18 17:02:43'),(15,5,9,'open','in_progress','L2','L2','Cambio de estado','2026-05-18 17:06:03'),(16,5,9,'in_progress','open','L2','L3','Escalado a L3','2026-05-18 17:06:54'),(17,5,9,'open','resolved','L3','L3','Cambio de estado','2026-05-18 17:07:11'),(18,6,9,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-19 16:12:31'),(19,7,9,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-19 16:24:30'),(20,8,9,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-19 16:47:13'),(21,2,10,'open','resolved','L1','L1','Cambio de estado','2026-05-19 16:50:55'),(22,8,9,'open','resolved','L1','L1','Cambio de estado','2026-05-19 16:51:04'),(23,7,9,'open','in_progress','L1','L1','Cambio de estado','2026-05-19 16:51:15'),(24,7,9,'in_progress','resolved','L1','L1','Cambio de estado','2026-05-19 16:51:23'),(25,6,9,'open','in_progress','L1','L1','Cambio de estado','2026-05-19 16:51:32'),(26,6,9,'in_progress','resolved','L1','L1','Cambio de estado','2026-05-19 16:51:35'),(27,4,11,'in_progress','resolved','L1','L1','Cambio de estado','2026-05-19 16:51:55'),(28,9,7,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-19 17:06:52'),(29,9,7,'open','resolved','L1','L1','Cambio de estado','2026-05-19 17:11:38'),(30,10,7,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-19 17:15:38'),(31,11,7,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-19 17:26:46'),(32,12,7,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-19 17:41:11'),(33,12,7,'open','open','L1','L2','Escalado a L2','2026-05-19 17:41:16'),(34,12,7,'open','open','L2','L3','Escalado a L3','2026-05-19 17:41:23'),(35,12,7,'open','in_progress','L3','L3','Cambio de estado','2026-05-19 17:41:39'),(36,11,7,'open','open','L1','L2','Escalado a L2','2026-05-19 17:42:25'),(37,11,7,'open','open','L2','L3','Escalado a L3','2026-05-19 17:42:29'),(38,10,7,'open','open','L1','L2','Escalado a L2','2026-05-19 17:43:41'),(39,10,7,'open','open','L2','L3','Escalado a L3','2026-05-19 17:44:17'),(40,13,6,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-19 17:47:41'),(41,13,6,'open','open','L1','L2','Escalado a L2','2026-05-19 17:47:45'),(42,13,6,'open','open','L2','L3','Escalado a L3','2026-05-19 17:47:45'),(43,13,6,'open','in_progress','L3','L3','Cambio de estado','2026-05-19 17:51:27'),(44,14,6,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-19 18:07:50'),(45,14,6,'open','in_progress','L1','L1','Cambio de estado','2026-05-19 18:07:59'),(46,14,6,'in_progress','open','L1','L2','Escalado a L2','2026-05-19 18:08:03'),(47,14,6,'open','open','L2','L3','Escalado a L3','2026-05-19 18:08:04'),(48,14,6,'open','resolved','L3','L3','Cambio de estado','2026-05-19 18:08:08'),(49,10,7,'open','in_progress','L3','L3','Cambio de estado','2026-05-19 18:12:31'),(50,15,12,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-21 14:03:46'),(51,16,13,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-21 15:08:17'),(52,17,13,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-21 15:08:50'),(53,17,13,'open','open','L1','L2','Escalado a L2','2026-05-21 15:12:39'),(54,16,13,'open','resolved','L1','L1','Cambio de estado','2026-05-21 15:12:55'),(55,15,12,'open','open','L1','L2','Escalado a L2','2026-05-21 15:13:23'),(56,17,13,'open','resolved','L2','L2','Cambio de estado','2026-05-21 15:14:16'),(57,15,12,'open','resolved','L2','L2','Cambio de estado','2026-05-21 15:15:45'),(58,18,14,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-22 09:21:21'),(59,18,14,'open','open','L1','L2','Escalado a L2','2026-05-22 09:22:46'),(60,19,9,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-22 09:43:57'),(61,19,9,'open','in_progress','L1','L1','Cambio de estado','2026-05-22 09:44:32'),(62,19,9,'in_progress','open','L1','L2','Escalado a L2','2026-05-22 09:46:01'),(63,19,9,'open','open','L2','L3','Escalado a L3','2026-05-22 09:46:04'),(64,11,7,'open','resolved','L3','L3','Cambio de estado','2026-05-22 09:47:04'),(65,3,9,'open','resolved','L3','L3','Cambio de estado','2026-05-22 09:47:18'),(66,19,9,'open','resolved','L3','L3','Cambio de estado','2026-05-22 09:48:56'),(67,18,14,'open','resolved','L2','L2','Cambio de estado','2026-05-22 10:21:20'),(68,13,6,'in_progress','resolved','L3','L3','Cambio de estado','2026-05-22 10:24:57'),(69,20,9,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-22 10:29:44'),(70,20,9,'open','open','L1','L2','Escalado a L2','2026-05-22 10:30:26'),(71,20,9,'open','open','L2','L3','Escalado a L3','2026-05-22 10:30:28'),(72,20,9,'open','resolved','L3','L3','Cambio de estado','2026-05-22 10:30:36'),(73,21,9,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-22 10:31:12'),(74,21,9,'open','open','L1','L2','Escalado a L2','2026-05-22 10:31:24'),(75,21,9,'open','open','L2','L3','Escalado a L3','2026-05-22 10:31:25'),(76,22,7,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-22 10:32:37'),(77,22,7,'open','open','L1','L2','Escalado a L2','2026-05-22 10:32:41'),(78,22,7,'open','resolved','L2','L2','Cambio de estado','2026-05-22 10:34:56'),(79,21,9,'open','resolved','L3','L3','Cambio de estado','2026-05-22 10:35:02'),(80,12,7,'in_progress','resolved','L3','L3','Cambio de estado','2026-05-22 10:35:09'),(81,10,7,'in_progress','resolved','L3','L3','Cambio de estado','2026-05-22 10:35:23'),(82,23,9,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-22 10:44:55'),(83,23,9,'open','in_progress','L1','L1','Cambio de estado','2026-05-22 10:46:02'),(84,23,9,'in_progress','open','L1','L2','Escalado a L2','2026-05-22 10:46:15'),(85,23,9,'open','in_progress','L2','L2','Cambio de estado','2026-05-22 10:52:15'),(86,23,9,'in_progress','open','L2','L3','Escalado a L3','2026-05-22 10:53:05'),(87,23,9,'open','in_progress','L3','L3','Cambio de estado','2026-05-22 10:54:34'),(88,24,9,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-22 11:03:42'),(89,24,9,'open','in_progress','L1','L1','Cambio de estado','2026-05-22 11:04:01'),(90,24,9,'in_progress','open','L1','L2','Escalado a L2','2026-05-22 11:04:12'),(91,24,9,'open','open','L2','L3','Escalado a L3','2026-05-22 11:07:32'),(92,24,9,'open','resolved','L3','L3','Cambio de estado','2026-05-22 11:49:43'),(93,23,9,'in_progress','resolved','L3','L3','Cambio de estado','2026-05-22 11:49:47'),(94,25,9,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-22 12:56:47'),(95,26,9,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-22 13:47:15'),(96,27,9,NULL,'open',NULL,'L1','Ticket creado e iniciado en L1','2026-05-22 13:47:39'),(97,26,9,'open','resolved','L1','L1','Cambio de estado','2026-05-22 13:47:58'),(98,25,9,'open','in_progress','L1','L1','Cambio de estado','2026-05-22 13:48:15'),(99,25,9,'in_progress','resolved','L1','L1','Cambio de estado','2026-05-22 13:48:18'),(100,27,9,'open','in_progress','L1','L1','Cambio de estado','2026-05-22 13:48:58');
/*!40000 ALTER TABLE `ticket_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('open','in_progress','on_hold','resolved','closed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `priority` enum('low','medium','high','critical') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'medium',
  `support_level` enum('L1','L2','L3') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'L1',
  `created_by` int unsigned NOT NULL,
  `assigned_to` int unsigned DEFAULT NULL,
  `attachment_path` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `resolved_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tickets_created_by` (`created_by`),
  KEY `fk_tickets_assigned_to` (`assigned_to`),
  KEY `idx_tickets_status` (`status`),
  KEY `idx_tickets_support_level` (`support_level`),
  KEY `idx_tickets_priority` (`priority`),
  CONSTRAINT `fk_tickets_assigned_to` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_tickets_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (1,'Fallo en el SV','Tener un problema el PC da un error muy raro y necesitamos que alguien lo revise cuanto antes la auditoria es mañana','resolved','high','L3',9,NULL,'src\\uploads\\1777321753320.png','2026-04-27 20:29:13','2026-05-18 16:32:22','2026-05-18 16:32:22'),(2,'software antiguo','en el ies matematico puig adam se utiliza software del cretácico','resolved','high','L1',10,NULL,NULL,'2026-04-28 15:18:35','2026-05-19 16:50:55','2026-05-19 16:50:55'),(3,'ayuda necesito ayuda','pepe me pepe el sv','resolved','low','L3',9,NULL,NULL,'2026-05-11 16:12:41','2026-05-22 09:47:18','2026-05-22 09:47:18'),(4,'pepe me robo los dineros','pinche pepe','resolved','low','L1',11,8,NULL,'2026-05-11 16:26:04','2026-05-19 16:51:55','2026-05-19 16:51:55'),(5,'No se porque mi profe es tonta','ayuda mi profe es tonta','resolved','low','L3',9,NULL,NULL,'2026-05-18 16:59:56','2026-05-18 17:07:11','2026-05-18 17:07:11'),(6,'prueba','prueba','resolved','medium','L1',9,7,'src\\uploads\\1779207151634.png','2026-05-19 16:12:31','2026-05-19 16:51:35','2026-05-19 16:51:35'),(7,'el pc','pc no funciona','resolved','medium','L1',9,7,'src\\uploads\\1779207870054.png','2026-05-19 16:24:30','2026-05-19 16:51:23','2026-05-19 16:51:23'),(8,'kpmkpmp','ñlmplmlm`plm','resolved','low','L1',9,NULL,'src\\uploads\\1779209233080.png','2026-05-19 16:47:13','2026-05-19 16:51:04','2026-05-19 16:51:04'),(9,'kopmpo','knkln ','resolved','medium','L1',7,NULL,'src\\uploads\\1779210412796.png','2026-05-19 17:06:52','2026-05-19 17:11:38','2026-05-19 17:11:38'),(10,'prueba','prueba','resolved','medium','L3',7,6,'src\\uploads\\1779210938452.png','2026-05-19 17:15:38','2026-05-22 10:35:23','2026-05-22 10:35:23'),(11,'pc buenas','pc buenas','resolved','medium','L3',7,NULL,'src\\uploads\\1779211606719.png','2026-05-19 17:26:46','2026-05-22 09:47:09','2026-05-22 09:47:09'),(12,'esto mola','esto mola','resolved','medium','L3',7,7,'C:\\Users\\mucho\\Desktop\\TFG\\Anteproyecto\\uploads\\1779212471384.png','2026-05-19 17:41:11','2026-05-22 10:35:09','2026-05-22 10:35:09'),(13,'el pc no va','no se el porque pero va mal','resolved','high','L3',6,6,NULL,'2026-05-19 17:47:41','2026-05-22 10:29:56','2026-05-22 10:29:56'),(14,'pc no va','no va','resolved','low','L3',6,NULL,NULL,'2026-05-19 18:07:50','2026-05-19 18:08:08','2026-05-19 18:08:08'),(15,'El ordenador me da un error','Buenas necesitamos que el pc funcione por una auditoria que tenemos en 3 dias es urgente y es necesario para realizar ciertas funciones de la empresa','resolved','high','L2',12,NULL,NULL,'2026-05-21 14:03:46','2026-05-21 15:15:45','2026-05-21 15:15:45'),(16,'+++++++++++++++','probando','resolved','low','L1',13,NULL,NULL,'2026-05-21 15:08:17','2026-05-21 15:12:55','2026-05-21 15:12:55'),(17,'\' or 1 = 1;','prueba2','resolved','medium','L2',13,NULL,NULL,'2026-05-21 15:08:50','2026-05-21 15:14:16','2026-05-21 15:14:16'),(18,'pepe no funciona','pepe no funciona\n','resolved','medium','L2',14,NULL,NULL,'2026-05-22 09:21:21','2026-05-22 10:21:24','2026-05-22 10:21:24'),(19,'El ordenador de los pagos no va necesitamos que lo revisen','Pues el otro dia se apago y no ha vuelto a encender la verdad no sabemos el porque es necesitamos ayuda cuanto antes ','resolved','medium','L3',9,NULL,NULL,'2026-05-22 09:43:57','2026-05-22 09:48:56','2026-05-22 09:48:56'),(20,'ayudaaa','pero bueno','resolved','medium','L3',9,NULL,NULL,'2026-05-22 10:29:44','2026-05-22 10:30:36','2026-05-22 10:30:36'),(21,'el pc no funciona','no funciona','resolved','medium','L3',9,NULL,NULL,'2026-05-22 10:31:12','2026-05-22 10:35:02','2026-05-22 10:35:02'),(22,'keadjoq djo','a djoa djon qwkpod','resolved','medium','L2',7,NULL,NULL,'2026-05-22 10:32:37','2026-05-22 10:34:56','2026-05-22 10:34:56'),(23,'buenas no me va el pc','buenas el pc va mal','resolved','medium','L3',9,6,NULL,'2026-05-22 10:44:55','2026-05-22 11:49:47','2026-05-22 11:49:47'),(24,'buenas una cosa que haces por aqui','pues no me va','resolved','medium','L3',9,NULL,NULL,'2026-05-22 11:03:42','2026-05-22 11:49:43','2026-05-22 11:49:43'),(25,'Buenas no me va el pc','El pc va mal y no funciona correctamente','resolved','medium','L1',9,6,NULL,'2026-05-22 12:56:47','2026-05-22 13:48:18','2026-05-22 13:48:18'),(26,'Buenas no me va el pc','Da pantallazo azul cada vez que se enciende y necesito solucionarlo','resolved','medium','L1',9,NULL,NULL,'2026-05-22 13:47:15','2026-05-22 13:47:58','2026-05-22 13:47:58'),(27,'El sv esta caido','esta caido y roto','in_progress','high','L1',9,6,NULL,'2026-05-22 13:47:39','2026-05-22 13:48:58',NULL);
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_tickets_history_on_create` AFTER INSERT ON `tickets` FOR EACH ROW BEGIN
  INSERT INTO ticket_history (ticket_id, changed_by, new_status, new_support_level, change_note)
  VALUES (NEW.id, NEW.created_by, NEW.status, NEW.support_level, 'Ticket creado e iniciado en L1');
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_tickets_history_on_update` AFTER UPDATE ON `tickets` FOR EACH ROW BEGIN
  IF (OLD.status <> NEW.status) OR (OLD.support_level <> NEW.support_level) THEN
    INSERT INTO ticket_history (
      ticket_id, 
      changed_by, 
      old_status, 
      new_status, 
      old_support_level, 
      new_support_level,
      change_note
    )
    VALUES (
      NEW.id, 
      IFNULL(@current_user_id, NEW.created_by), 
      OLD.status, 
      NEW.status, 
      OLD.support_level, 
      NEW.support_level,
      CASE 
        WHEN OLD.support_level <> NEW.support_level THEN CONCAT('Escalado a ', NEW.support_level)
        ELSE 'Cambio de estado'
      END
    );
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('user','helpdesk','tic','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_email` (`email`),
  KEY `idx_users_role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin Sistema','admin@tokentick.local','$2b$12$KIXBcGpMVRBvTmSBX4YhRO3ywOqjdEovTGT7aQJHk0i3c7V3FQXWW','admin',1,'2026-04-23 17:07:56','2026-04-23 17:07:56'),(2,'Técnico Nivel 1','helpdesk@tokentick.local','$2b$12$KIXBcGpMVRBvTmSBX4YhRO3ywOqjdEovTGT7aQJHk0i3c7V3FQXWW','helpdesk',1,'2026-04-23 17:07:56','2026-04-23 17:07:56'),(3,'Especialista TIC','tic@tokentick.local','$2b$12$KIXBcGpMVRBvTmSBX4YhRO3ywOqjdEovTGT7aQJHk0i3c7V3FQXWW','tic',1,'2026-04-23 17:07:56','2026-04-23 17:07:56'),(4,'Usuario Demo','user@tokentick.local','$2b$12$KIXBcGpMVRBvTmSBX4YhRO3ywOqjdEovTGT7aQJHk0i3c7V3FQXWW','user',1,'2026-04-23 17:07:56','2026-04-23 17:07:56'),(5,'User3','User3@tokentick.local','$2b$10$Q2EH6tCFd/yDVnB1/rQnpu2NXXAOdaV4v5HaRJ5.eXblcoYAmAHwu','user',1,'2026-04-27 19:16:59','2026-04-27 19:16:59'),(6,'Alvaro Tecnico','Alvaro@soporte.com','$2b$10$zYoQys3WwM1ZQ2QI3dM5iuOHz7riLu6NqeopVeDAmm.HWzGHvEKJu','admin',1,'2026-04-27 19:45:07','2026-04-27 19:45:07'),(7,'Tecnico1','tecnico1@soporte.com','$2b$10$6ANzFv3/ri6qjvxexWQWx.ybcnNcNmEI5ws4X6OIPwIjjMmpo5nv6','helpdesk',1,'2026-04-27 19:46:39','2026-04-27 19:46:39'),(8,'TecnicoN2','tecnicoN2@soporte.com','$2b$10$k95ZVW17.fCAKN4Tq4T/wuTBWQsKnfhrBOYaMsB8y6uh7SFgRIhPi','tic',1,'2026-04-27 19:47:51','2026-04-27 19:47:51'),(9,'Pepe','Bakery@usuario.com','$2b$10$na8eKRCubbl3zKx.aig1f.Ra5frtSecMrv42waMsce9VhpYlbb9X6','user',1,'2026-04-27 20:14:45','2026-04-27 20:14:45'),(10,'javier','javi@javi.com','$2b$10$xaFt7ZUab9InS9fjG4Z/O.cF9/E/njd0JTiArcJtSNFqZ37.aPsB.','user',1,'2026-04-28 15:17:25','2026-04-28 15:17:25'),(11,'pepito','pepito@usuario.com','$2b$10$qjU06V.g7K0qtP5/W/NXb.XMCTZkdWdFwP.Yh4u7pF9PUlQ7SlYx6','user',1,'2026-05-11 16:14:43','2026-05-11 16:14:43'),(12,'Manolo','Manolo@asesoria.com','$2b$10$aqOch.qtp01o2iNqmELpxuoO/15LQJmAEms/PuHs2CO/jnvCAhS7K','user',1,'2026-05-21 13:55:22','2026-05-21 13:55:22'),(13,'javier','j.avilad@gmail.com','$2b$10$cmVtJDIY7.7/hp6/lQqaSeJqryhpcisqNssdUwcE3IUrRpjAJMrhG','user',1,'2026-05-21 15:07:26','2026-05-21 15:07:26'),(14,'pedro','pedro@usuario.com','$2b$10$q2zton8CtTAoLYPJdDcPguygY5HqQltv/SL4BYnMn2awRTcWp8ogK','user',1,'2026-05-22 09:20:03','2026-05-22 09:20:03');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-24 23:47:53
