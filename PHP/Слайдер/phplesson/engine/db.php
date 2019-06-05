<?php

function getImages() {
	return getAssocResult("SELECT * FROM images");
}

function getAssocResult($sql){
    $db = mysqli_connect(HOST, USER, PASS, DB);
	mysqli_query ($db, "SET CHARACTER SET 'utf8'");
	$result = mysqli_query($db, $sql);
	$array_result = [];
	while($row = mysqli_fetch_assoc($result)){
		$array_result[] = $row;
	}
    mysqli_close($db);
	return $array_result;
}

