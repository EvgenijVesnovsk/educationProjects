<?php
define('SITE_ROOT', "../");
define('WWW_ROOT', SITE_ROOT . 'public/');
define('DATA_DIR', SITE_ROOT . 'data/');
define('TPL_DIR', SITE_ROOT . 'templates/');
define('ENG_DIR', SITE_ROOT . 'engine/');
define('IMG_DIR', 'img/'); //папка с картинками

/* DB config */
define('HOST', 'phplesson');
define('USER', 'root');
define('PASS', '');
define('DB', 'gallery');

require_once(ENG_DIR . 'functions.php');
require_once(ENG_DIR . 'db.php');
?>
