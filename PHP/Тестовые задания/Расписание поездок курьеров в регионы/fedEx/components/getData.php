<?php
require_once("Db.php");

$query = "SELECT * FROM `regions_tbl` ORDER BY `name`";

$regions = $pdo->query($query);
$regions = $regions->fetchAll(PDO::FETCH_ASSOC);