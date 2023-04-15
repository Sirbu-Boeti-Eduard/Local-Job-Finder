<?php

include("./db/rb-mysql.php");
include("./db/config.php");

R::setup("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASS);

$locations = R::findAll('job');

//JSON export

$data = R::findAll('job');

$json = json_encode($data);
file_put_contents("db/all.json", $json);
?>
