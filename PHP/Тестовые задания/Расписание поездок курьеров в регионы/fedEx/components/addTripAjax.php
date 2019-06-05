<?php
require_once("Db.php");

if (!empty($_POST)) {
    
    $error = "";
    //валидация
    if(!empty($_POST['curier'])) {
        $curier = strip_tags($_POST['curier']);
    } else {
        $error += "Курьер не выбран. ";
    }
    
    if(!empty($_POST['region'])) {
        $region = strip_tags($_POST['region']);
    } else {
        $error += "Регион не выбран. ";
    }
        
    if(!empty($_POST['departure_date'])) {
        $departure_date = strip_tags($_POST['departure_date']);
    } else {
        $error += "Дата отправления не установлена. ";
    }
        
    if(!empty($_POST['arrival_date'])) {
        $arrival_date = strip_tags($_POST['arrival_date']);
    } else {
        $error += "Дата прибытия не установлена.";
    }
    
    if (!$error) {
    //если нет ошибок
        
        $query = "INSERT INTO `trips_tbl` (`courier_id`, `region_id`, `departure_date`, `arrival_date`) VALUES (:curier, :region, :departure_date, :arrival_date)";
        
        $result = $pdo->prepare($query);
        echo $result->execute([
            'curier' => $curier,
            'region' => $region,
            'departure_date' => $departure_date,
            'arrival_date' => $arrival_date
        ]);
        
    } else {
        echo $error;
    }
    
} else echo "Произошла ошибка на сервере";