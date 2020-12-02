-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.5.5-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for mokkivaraus
CREATE DATABASE IF NOT EXISTS `mokkivaraus` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mokkivaraus`;

-- Dumping structure for table mokkivaraus.asiakas
CREATE TABLE IF NOT EXISTS `asiakas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ETUNIMI` varchar(40) NOT NULL DEFAULT '0',
  `SUKUNIMI` varchar(40) NOT NULL DEFAULT '0',
  `KATUOSOITE` varchar(40) NOT NULL DEFAULT '0',
  `POSTINRO` int(11) NOT NULL DEFAULT 0,
  `KAUPUNKI` varchar(40) NOT NULL DEFAULT '0',
  `EMAIL` varchar(40) NOT NULL DEFAULT '0',
  `PUHNRO` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table mokkivaraus.asiakas: ~0 rows (approximately)
/*!40000 ALTER TABLE `asiakas` DISABLE KEYS */;
/*!40000 ALTER TABLE `asiakas` ENABLE KEYS */;

-- Dumping structure for table mokkivaraus.mokki
CREATE TABLE IF NOT EXISTS `mokki` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NIMI` varchar(40) NOT NULL DEFAULT '0',
  `OSOITE` varchar(40) NOT NULL DEFAULT '0',
  `HINTA` double NOT NULL DEFAULT 0,
  `HLOMAARA` int(11) NOT NULL DEFAULT 0,
  `KUVAUS` varchar(500) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table mokkivaraus.mokki: ~5 rows (approximately)
/*!40000 ALTER TABLE `mokki` DISABLE KEYS */;
INSERT INTO `mokki` (`ID`, `NIMI`, `OSOITE`, `HINTA`, `HLOMAARA`, `KUVAUS`) VALUES
	(1, 'Merituuli', 'Vimparaitti 57, 49400, Hamina', 150, 6, 'Upea mökki rauhallisella merenrantasijainnilla'),
	(2, 'Kuningas', 'Taidemaalarinkatu 5, 00430, Helsinki', 90, 4, 'Urbaanimpaa mökkeilyä kasvualueen kupeessa'),
	(3, 'Kalastaja', 'Koviannokantie 144, 09220, Lohja', 75, 2, 'Kalastajan unelmakohde, järvelle matkaa 5m!'),
	(4, 'Rauhala', 'Suurniityntie 290, 05720, Hyvinkää', 60, 2, 'Rauhan tyyssija aarniometsän keskellä'),
	(6, 'Huvilius', 'Hakoisten kartano, 14240, Janakkala', 350, 15, 'Suuri huvila järven rannalla isoihin tapahtumiin');
/*!40000 ALTER TABLE `mokki` ENABLE KEYS */;

-- Dumping structure for table mokkivaraus.varaus
CREATE TABLE IF NOT EXISTS `varaus` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MOKKIID` int(11) NOT NULL DEFAULT 0,
  `ASIAKASID` int(11) NOT NULL DEFAULT 0,
  `VARAUSPVM` datetime NOT NULL DEFAULT '2020-01-01 00:00:00',
  `ALKUPVM` date NOT NULL DEFAULT '2020-01-01',
  `LOPPUPVM` date NOT NULL DEFAULT '2020-01-01',
  `KOKHINTA` double NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`),
  KEY `MOKKIIDKEY` (`MOKKIID`),
  KEY `ASIAKASIDKEY` (`ASIAKASID`),
  CONSTRAINT `ASIAKASIDKEY` FOREIGN KEY (`ASIAKASID`) REFERENCES `asiakas` (`ID`),
  CONSTRAINT `MOKKIIDKEY` FOREIGN KEY (`MOKKIID`) REFERENCES `mokki` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=latin1;

-- Dumping data for table mokkivaraus.varaus: ~0 rows (approximately)
/*!40000 ALTER TABLE `varaus` DISABLE KEYS */;
/*!40000 ALTER TABLE `varaus` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
