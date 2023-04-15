<?php

include("db/rb-mysql.php");
include("db/config.php");

R::setup("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASS);

$data = R::findAll('job');

$all = json_encode($data);
file_put_contents("db/all.json", $all);

$jobNames = R::getAll('SELECT DISTINCT jobName from job');

$jobList = array_map(function($jobNames) {
    return $jobNames['jobName'];
}, $jobNames);

$jobList = json_encode($jobList);
file_put_contents('db/jobList.json', $jobList);
?>
