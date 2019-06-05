-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 04 2019 г., 18:01
-- Версия сервера: 8.0.12
-- Версия PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `rest-api_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `randnumber_tbl`
--

CREATE TABLE `randnumber_tbl` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `randnumber_tbl`
--

INSERT INTO `randnumber_tbl` (`id`, `number`) VALUES
(1, 843043109),
(2, 1352330123),
(3, 1234490874),
(4, 1201266013),
(5, 166780416),
(6, 1612130199),
(7, 165626988),
(8, 1958261794),
(9, 597489006),
(10, 436275396),
(11, 524893346),
(12, 1372590945),
(13, 671868039),
(14, 747028079),
(15, 581681970),
(16, 1435438919),
(17, 225729613),
(18, 165219842),
(19, 790639036),
(20, 279559841),
(21, 840854187),
(22, 1489138423),
(23, 1654954124),
(24, 302735948),
(25, 1299808563),
(26, 1436120481),
(27, 417042188),
(28, 803710319),
(29, 633301206),
(30, 51252751),
(31, 1445329595),
(32, 1656994933),
(33, 1533362855),
(34, 776615364);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `randnumber_tbl`
--
ALTER TABLE `randnumber_tbl`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
