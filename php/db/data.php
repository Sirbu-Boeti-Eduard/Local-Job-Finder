<?php

include("db/rb-mysql.php");
include("db/config.php");

R::setup("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASS);

if(isset($_GET['job'])){
    $getRequest = $_GET['job'];

    if($getRequest == ""){
        $data = R::findAll('job');
    }
    else{
        $data = R::find('job', ' LOWER(jobName) = ?', [ $getRequest ]);
    }

    $search = json_encode($data);

    header('Content-Type: application/json');
    echo $search;
}
else if(isset($_GET['search'])){
    $getRequest = $_GET['search'];

    if($getRequest == ""){
        $data = R::getAll('SELECT DISTINCT jobName from job');
    }
    else{
        $data = R::getAll('SELECT DISTINCT jobName FROM job WHERE LOWER(jobName) LIKE ?', ['%' . $getRequest . '%']);
    }

    $search = $search = array_map(function($data) {
        return $data['jobName'];
    }, $data);
    $search = json_encode($search);

    header('Content-Type: application/json');
    echo $search;
}

?>
