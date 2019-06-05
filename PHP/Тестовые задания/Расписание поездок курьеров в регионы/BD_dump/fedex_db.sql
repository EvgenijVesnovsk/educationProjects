-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 22 2019 г., 22:07
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
-- База данных: `fedex_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `courier_tbl`
--

CREATE TABLE `courier_tbl` (
  `id` int(11) NOT NULL,
  `surname` varchar(64) NOT NULL,
  `first_name` varchar(64) NOT NULL,
  `second_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `courier_tbl`
--

INSERT INTO `courier_tbl` (`id`, `surname`, `first_name`, `second_name`) VALUES
(1, 'Весновский', 'Евгений', 'Евгеньевич'),
(2, 'Весновская', 'Анна', 'Николаевна'),
(3, 'Саенкова', 'Мария', 'Андреевна'),
(4, 'Рощин', 'Евгений', 'Николаевич'),
(5, 'Дворкин', 'Михаил', 'Викторович'),
(6, 'Катунин', 'Сергей', 'Игорьевич'),
(7, 'Игнатенко', 'Виталий', 'Валерьевич'),
(8, 'Весновская', 'Елена', 'Викторовна'),
(9, 'Весновский', 'Евгений', 'Юрьевич'),
(10, 'Весновский', 'Юрий', 'Евгеньевич');

-- --------------------------------------------------------

--
-- Структура таблицы `regions_tbl`
--

CREATE TABLE `regions_tbl` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `count_days` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `regions_tbl`
--

INSERT INTO `regions_tbl` (`id`, `name`, `count_days`) VALUES
(1, 'Санкт-Петербург', 1),
(2, 'Уфа', 3),
(3, 'Нижний Новгород', 3),
(4, 'Владимир', 2),
(5, 'Кострома', 4),
(6, 'Екатеринбург', 5),
(7, 'Ковров', 7),
(8, 'Воронеж', 4),
(9, 'Самара', 2),
(10, 'Астрахань', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `trips_tbl`
--

CREATE TABLE `trips_tbl` (
  `id` int(11) NOT NULL,
  `courier_id` int(11) NOT NULL,
  `region_id` int(11) NOT NULL,
  `departure_date` date NOT NULL,
  `arrival_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `trips_tbl`
--

INSERT INTO `trips_tbl` (`id`, `courier_id`, `region_id`, `departure_date`, `arrival_date`) VALUES
(1, 1, 1, '2019-05-20', '2019-05-21'),
(2, 2, 1, '2019-05-22', '2019-05-23'),
(3, 4, 2, '2019-05-26', '2019-05-29'),
(6, 1, 9, '2019-05-30', '2019-06-01');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `courier_tbl`
--
ALTER TABLE `courier_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `regions_tbl`
--
ALTER TABLE `regions_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `trips_tbl`
--
ALTER TABLE `trips_tbl`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `courier_tbl`
--
ALTER TABLE `courier_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `regions_tbl`
--
ALTER TABLE `regions_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `trips_tbl`
--
ALTER TABLE `trips_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
