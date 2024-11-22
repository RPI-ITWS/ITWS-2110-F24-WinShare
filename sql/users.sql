-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 22, 2024 at 05:34 AM
-- Server version: 10.11.8-MariaDB-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `WinShare`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `points` int(11) DEFAULT 0,
  `role` enum('user','admin') DEFAULT 'user',
  `email` varchar(255) NOT NULL,
  `RoundsCorrect` int(11) NOT NULL DEFAULT 0,
  `RoundsWrong` int(11) NOT NULL DEFAULT 0,
  `profilePic` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '../assets/Photos/pfp1.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `points`, `role`, `email`, `RoundsCorrect`, `RoundsWrong`, `profilePic`) VALUES
(3, 'Shimu', '$2y$10$YoQjDrGq51pMP9Luct2hfO3kYzYIJc/I0p1FEbB2TFnCJb/H5fRuq', 50, 'user', 'shimupan@gmail.com', 10, 5, '../assets/Photos/pfp1.png'),
(4, 'Test', '$2y$10$8fCjO3UBv5m1G.D4kPfwKe0GXxYCjnDQSqwIEDbEqOczN50oEHagS', 0, 'user', 'test@gmail.com', 0, 0, '../assets/Photos/pfp1.png'),
(5, 'Louis', '$2y$10$PwnRjk.sR/dXCfdqZpYmPubqFeDTfyUixkUAT9SMXA1ybYLEjlFBu', 1000, 'user', 'louishung0319@hotmail.com', 5, 10, '../assets/Photos/pfp1.png'),
(6, 'WinShare', '$2y$10$k7HPmPHKss9EJYiQ0zZXAuVWL4xb.n94O0DNuSBtpaRQiDAyg.XZO', 0, 'user', 'winshare@hotmail.com', 0, 0, '../assets/Photos/pfp1.png'),
(7, 'Test2', '$2y$10$5.oOj62YaDShiSBP68SKqe6A9cdlgnf4pzaJdGxOeP/oHTaDOzjXi', 0, 'user', 'test2@hotmail.com', 0, 0, '../assets/Photos/pfp1.png'),
(8, 'Josh ', '$2y$10$6bLczE0.3HZafjzpqFH5RO1F/RLZpykDPR.LxsfcyZ0r4XL4Z/HuO', 0, 'user', 'collij13@rpi.edu', 0, 0, '../assets/Photos/pfp1.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

-- Add new column for system probabilities in game_predictions table
ALTER TABLE game_predictions ADD COLUMN system_probabilities JSON DEFAULT NULL;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
