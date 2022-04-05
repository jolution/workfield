<?php
if(!$_POST['request'] || $_POST['request'] != 1) die(header('HTTP/1.0 403 Forbidden'));
define('_VEXEC',1);

header('Content-Type: application/json');
include "config.php";

if( isset($_POST['user_id']) && isset($_POST['date']) && isset($_POST['worktime']) ){
    $user_id = (int) $_POST['user_id'];
    $date = strip_tags( trim( $_POST['date'] ) );
    $worktime = (float) $_POST['worktime'];

    $date = $mysqli->real_escape_string($date);

    $sql = sprintf("REPLACE INTO `work` (`user_id`, `date`, `worktime`) VALUES ('%s', '%s-01', '%s')",$user_id,$date,$worktime);

    /* Select queries return a result set */
    $result = $mysqli->query($sql);

    $response = mysqli_fetch_assoc($result);

    //if ($result->num_rows === 0){
        $msg = sprintf('%s Stunden wurden für Monat %s gespeichert',$worktime,$date);
        $msg_type = 'info';
    //}
    
}else{
    $response = [];
    $msg = 'Bitte alle Felder ausfüllen';
    $msg_type = 'error';
}

$response[] = array(
    'status'=> $response !== null ? 1:0,
    'status_text' => $response,
    'msg' => $msg,
    'msg_type' => $msg_type,
);

echo json_encode($response);
exit;