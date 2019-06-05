<?php
require_once("Db.php");

if (!empty($_POST)) {
    
    $error = "";
    //валидация        
    if(!empty($_POST['departure_date'])) {
        $departure_date = strip_tags($_POST['departure_date']);
    }
        
    if(!empty($_POST['arrival_date'])) {
        $arrival_date = strip_tags($_POST['arrival_date']);
    }
    
    if ($departure_date && $arrival_date) {
    //если нет ошибок
        
        $query = "SELECT c.`id`, c.`surname`, c.`first_name`, c.`second_name` FROM courier_tbl AS c WHERE c.`id` NOT IN (SELECT t.`courier_id` FROM `trips_tbl` AS t WHERE (t.`departure_date` BETWEEN :departure_date AND :arrival_date) OR (t.`arrival_date` BETWEEN :departure_date AND :arrival_date))";
        
        $result = $pdo->prepare($query);
        $result->execute([
            'departure_date' => $departure_date,
            'arrival_date' => $arrival_date
        ]);
        $result = $result->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        
    } else {
        echo $error;
    }
    
} else echo "Произошла ошибка на сервере";