<?php
   
    $pdo = new PDO('mysql:host=localhost;dbname=fedex_db','root','');
    $pdo->exec("set names utf8");