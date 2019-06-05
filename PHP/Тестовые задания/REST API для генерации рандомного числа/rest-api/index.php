<?php
define('ROOT', dirname(__FILE__));

require_once 'components/Db.php';
require_once 'components/Api.php';

try {
    $api = new Api();
    echo $api->run();
} catch (Exception $e) {
    echo json_encode(Array('error' => $e->getMessage()));
}