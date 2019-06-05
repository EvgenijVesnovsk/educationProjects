<?php
//подключаем конфигурационный файл бд
require_once('../config/config.php');

//проверяем $_POST["content_txt"] на пустое значение
//if(isset($_POST["src"]) && strlen($_POST["src"])>0)
if(isset($_POST["src"]) && $_POST["src"])
{     
	$src = $_POST['src'];
	$db = mysqli_connect(HOST, USER, PASS, DB);
	mysqli_query ($db, "SET CHARACTER SET 'utf8'");
	mysqli_query($db, 'UPDATE images SET views = views + 1 WHERE url = "' . $src . '"');
	$result = mysqli_query($db, 'SELECT id,views FROM images WHERE url = "' . $src . '"');
	$array_result = [];
	while($row = mysqli_fetch_assoc($result)){
		$array_result[] = $row;
	}
    mysqli_close($db);
	echo $array_result[0]['views'];
};

?>
