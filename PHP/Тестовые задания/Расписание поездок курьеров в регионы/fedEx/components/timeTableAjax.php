<?php
    require_once("Db.php");

    if (!empty($_POST)) {
        if (!empty($_POST['departure_date'])) $since = $_POST['departure_date'];
        if (!empty($_POST['arrival_date'])) $to = $_POST['arrival_date'];
                
        $query = "SELECT t.`id`, c.`surname`, c.`first_name`, c.`second_name`, r.`name` AS region, t.`departure_date`, t.`arrival_date` FROM `trips_tbl` AS t JOIN (`courier_tbl` AS c, `regions_tbl` AS r) ON (t.`courier_id` = c.`id` AND t.`region_id` = r.`id`) WHERE (t.`departure_date` BETWEEN :since AND :to) OR (t.`arrival_date` BETWEEN :since AND :to)";
        
        $result = $pdo->prepare($query);
        $result->execute(['since' => $since,
                          'to' => $to
                         ]);
        
        $result = $result->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        
    } else {
        echo "Произошла ошибка";
    }
