<?php
if(!$_POST['request'] || $_POST['request'] != 1) die(header('HTTP/1.0 403 Forbidden'));
define('_VEXEC',1);

header('Content-Type: application/json');
include "config.php";

if( isset($_POST['user_id']) && isset($_POST['date'])){
    $user_id = (int) $_POST['user_id'];
    $date = strip_tags( trim( $_POST['date'] ) );

    if( isset($_POST['worktime']) ){
        $worktime = (float) $_POST['worktime'];
    }

    $date = $mysqli->real_escape_string($date);

    $sql = sprintf("SELECT * FROM `work` WHERE user_id='%s' AND date='%s-01' LIMIT 1;",$user_id,$date);

    /* Select queries return a resultset */
    $result = $mysqli->query($sql);

    $response = mysqli_fetch_assoc($result);
    
}else{
    $response = [];
    $msg = 'Bitte alle Felder ausfüllen';
    $msg_type = 'error';
}

echo json_encode($response);
exit;