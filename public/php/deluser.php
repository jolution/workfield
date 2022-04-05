<?php
if(!$_POST['request'] || $_POST['request'] != 1) die(header('HTTP/1.0 403 Forbidden'));
define('_VEXEC',1);

header('Content-Type: application/json');
include "config.php";

if( isset($_POST['user_id']) ){
    $user_id = (int) $_POST['user_id'];
    $date = strip_tags( trim( $_POST['date'] ) );

    $date = $mysqli->real_escape_string($date);

    $sql = sprintf("DELETE FROM `users` WHERE id = '%s';",$user_id);
    //$sql = sprintf("REPLACE INTO `work` (`user_id`, `date`, `worktime`) VALUES ('%s', '%s-01', '%s')",$user_id,$date,$worktime);

    $result = $mysqli->query($sql);
    $response = mysqli_fetch_assoc($result);
    
}else{
  $response = [];
  $msg = 'Bitte alle Felder ausfüllen';
  $msg_type = 'error';
}

echo json_encode($response);
exit;