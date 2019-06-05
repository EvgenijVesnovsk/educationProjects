-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 22 2019 г., 22:06
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
-- База данных: `magazines_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `authors_tbl`
--

CREATE TABLE `authors_tbl` (
  `id` int(11) NOT NULL,
  `first_name` varchar(64) NOT NULL,
  `second_name` varchar(64) DEFAULT NULL,
  `surname` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `authors_tbl`
--

INSERT INTO `authors_tbl` (`id`, `first_name`, `second_name`, `surname`) VALUES
(2, 'Александр', NULL, 'Милошенко'),
(3, 'Александр', NULL, 'Пушкарь'),
(5, 'Анна', 'Николаевна', 'Весновская'),
(6, 'Мария', 'Андреевна', 'Саенкова'),
(14, 'Евгений', 'Евгеньевич', 'Весновский'),
(15, 'Михаил', NULL, 'Дворкин'),
(16, 'Владимир', 'Николаевич', 'Ашикьян'),
(17, 'Сергей', NULL, 'Катунин'),
(18, 'Людмила', NULL, 'Катунина'),
(19, 'Евгений', NULL, 'Рощин'),
(20, 'Елена', NULL, 'Ашикьян');

-- --------------------------------------------------------

--
-- Структура таблицы `magazines_tbl`
--

CREATE TABLE `magazines_tbl` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `img` varchar(128) DEFAULT NULL,
  `authors` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `magazines_tbl`
--

INSERT INTO `magazines_tbl` (`id`, `name`, `description`, `img`, `authors`, `create_at`) VALUES
(26, 'Лиза', 'О женском', '/template/images/magazines/1558176257.jpeg', '1,5,4,10,2,11,3,6', '2019-05-18'),
(27, 'Men\'s health', 'Мужское здоровье', '/template/images/magazines/1558176284.png', '2,3', '2019-05-18'),
(28, 'National geographic', 'Путешествия', '/template/images/magazines/1558176304.jpeg', '5,4', '2019-05-18'),
(29, 'OOPS', 'Мода', '/template/images/magazines/1558176327.jpeg', '5,2,6', '2019-05-18'),
(44, 'Cosmopolitan', 'Женский журнал', '/template/images/magazines/1558266040.jpeg', '2,11', '2019-05-19'),
(45, 'Домашний очаг', 'Домоводство', '/template/images/magazines/1558266075.jpeg', '10,11', '2019-05-19'),
(46, 'Esquire', 'Звезды', '/template/images/magazines/1558266099.jpeg', '5,11', '2019-05-19'),
(47, 'Forbes', 'Бизнес', '/template/images/magazines/1558266121.jpeg', '4,11,3', '2019-05-19'),
(48, 'GQ', 'Мужской журнал', '/template/images/magazines/1558266143.jpeg', '4,10,2,11', '2019-05-19'),
(49, 'Хлеб и соль', 'Кулинария', '/template/images/magazines/1558266172.jpeg', '4,6', '2019-05-19'),
(50, 'Игромания', 'Компьютерные игры', '/template/images/magazines/1558266198.jpeg', '5,11,6', '2019-05-19');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `authors_tbl`
--
ALTER TABLE `authors_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `magazines_tbl`
--
ALTER TABLE `magazines_tbl`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `authors_tbl`
--
ALTER TABLE `authors_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT для таблицы `magazines_tbl`
--
ALTER TABLE `magazines_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
