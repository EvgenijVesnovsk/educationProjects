-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 25 2019 г., 12:01
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
-- База данных: `shorturl_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `url_tbl`
--

CREATE TABLE `url_tbl` (
  `id` int(11) NOT NULL,
  `link` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `short_url` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `url_tbl`
--

INSERT INTO `url_tbl` (`id`, `link`, `short_url`) VALUES
(188, 'http://xn--80aabeomchs4bt.xn--p1ai', 'a'),
(189, 'https://yandex.ru', 'A'),
(198, 'https://medichi-novoros.ru/', 'b');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `url_tbl`
--
ALTER TABLE `url_tbl`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `url_tbl`
--
ALTER TABLE `url_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=199;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
