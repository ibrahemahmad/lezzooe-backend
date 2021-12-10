-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2021 at 08:04 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lezzoostore`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `Id` int(11) NOT NULL,
  `Name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `ImageUrl` varchar(4000) COLLATE utf8_unicode_ci NOT NULL,
  `storeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`Id`, `Name`, `ImageUrl`, `storeId`) VALUES
(3, 'Man', 'non', 50),
(4, 'Women', 'http://localhost:3300/images/file-1639066960436.webp', 51),
(5, 'Shose', 'http://localhost:3300/images/file-1639067057075.webp', 51),
(6, 'high-hell', 'http://localhost:3300/images/file-1639067211067.webp', 51),
(7, 'sport-shoe', 'http://localhost:3300/images/file-1639067302886.webp', 51),
(8, 'sneakers', 'http://localhost:3300/images/file-1639067352135.webp', 51),
(10, 'dasda', 'http://localhost:3300/images/file-1639067397265.webp', 50),
(11, 'test', 'http://localhost:3300/images/file-1639067495529.webp', 51),
(12, 'Food', 'http://localhost:3300/images/file-1639073227824.webp', 50);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `Id` int(11) NOT NULL,
  `Name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `ImageUrl` varchar(4000) COLLATE utf8_unicode_ci NOT NULL,
  `Price` decimal(18,2) NOT NULL,
  `Description` varchar(10000) COLLATE utf8_unicode_ci NOT NULL,
  `CategoryId` int(11) NOT NULL,
  `StoreId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Id`, `Name`, `ImageUrl`, `Price`, `Description`, `CategoryId`, `StoreId`) VALUES
(8, 'First item', 'http://localhost:3300/images/file-1639079019506.webp', '10.10', 'nothing to say', 12, 50),
(9, 'sneakers', 'http://localhost:3300/images/file-1639080201218.webp', '200.00', 'sneakers .... des', 8, 51),
(10, 'sport shooued', 'http://localhost:3300/images/file-1639080292565.webp', '400.00', 'shoes', 5, 51),
(11, 'jackets', 'http://localhost:3300/images/file-1639080411517.webp', '10.00', 'jackets des', 4, 51),
(12, 'test 2 item', 'http://localhost:3300/images/file-1639080446641.webp', '100.00', 'mnbhhj', 10, 50),
(13, 'test 3 item', 'http://localhost:3300/images/file-1639080482475.webp', '3.40', 'qweq', 8, 51);

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `Id` int(11) NOT NULL,
  `Name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `Owner` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `OwnerPhone` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `LogoUrl` varchar(4000) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`Id`, `Name`, `Owner`, `OwnerPhone`, `address`, `LogoUrl`) VALUES
(50, 'lezzoo', 'lazo', '01234567', 'erbil,40m', 'http://localhost:3300/images/file-1639064043289.webp'),
(51, 'nike', 'nikely', '123456', 'london', 'http://localhost:3300/images/file-1639064562478.webp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD KEY `FK_Category_Store` (`storeId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Name` (`Name`,`CategoryId`) USING BTREE,
  ADD KEY `FK_Product_Category` (`CategoryId`),
  ADD KEY `FK_Product_Store` (`StoreId`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `FK_Category_Store` FOREIGN KEY (`storeId`) REFERENCES `store` (`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_Product_Category` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`Id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_Product_Store` FOREIGN KEY (`StoreId`) REFERENCES `store` (`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
