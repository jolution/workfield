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

    //user_id = id
    //$sql = sprintf("SELECT username, id as user_id, rights FROM `users` WHERE username='%s' AND pwd='%s' LIMIT 1;",$username,$password);

    //TO_DATE('17/12/2015', 'DD/MM/YYYY')
    // echo cal_days_in_month(CAL_GREGORIAN, 8, 2009);
    $sql = sprintf("REPLACE INTO `work` (`user_id`, `date`, `worktime`) VALUES ('%s', '%s-01', '%s')",$user_id,$date,$worktime);

    /* Select queries return a resultset */
    $result = $mysqli->query($sql);
    //printf("Select returned %d rows.\n", $result->num_rows);
    
    //$userData = mysqli_query($sql);
    /*$response = array();
    
    while($row = mysqli_fetch_assoc($result)){
       $response[] = $row;
    }*/
    
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

/*
$data = json_decode(file_get_contents("php://input"));
$request = $data->request;
if($request == 1){
    $user_id = $data->user_id;
    $date = $data->date;
    $worktime = $data->worktime;

    $query = sprintf("INSERT INTO `work` (`user_id`, `date`, `worktime`) VALUES ('%d', '%s', '%s');",$user_id,$date,$worktime);
    $userData = mysqli_query($con,$query);
    $response = array();
    while($row = mysqli_fetch_assoc($userData)){
        $response[] = $row;
    }

    if (mysql_num_rows($row) > 0 ) {
        $response[] = array('status'=>1);
    }else{    
        $response[] = array('status'=>0);
    }
    echo json_encode($response);
    exit;
}*/