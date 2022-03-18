<?php
if(!$_POST['request'] || $_POST['request'] != 1) die(header('HTTP/1.0 403 Forbidden'));
define('_VEXEC',1); // vue exec -> access to config.php file

header('Content-Type: application/json');
include "config.php";

if( isset($_POST['user_id']) && isset($_POST['user_rights'])){
   $user_id = (int) $_POST['user_id'];
   $user_rights = (int) $_POST['user_rights'];

   if ($user_rights == 1){
      $where = "1";
   }else{
      $where = sprintf("work.user_id='%s'",$user_id);
   }

   $sql = "SELECT `id`,`user_id`, (SELECT username FROM users WHERE users.id = work.user_id LIMIT 1) as username, `date`, MONTH(date) as date_month,  TIME_FORMAT(date,'%b') as date_month_name, YEAR(date) as date_year, `worktime` FROM `work` WHERE ".$where." ORDER BY work.date ASC;";

   $result = $mysqli->query($sql);

   $response = array();

   while($row = mysqli_fetch_assoc($result)){
      $response[] = $row;
   }

   //if ($result->num_rows === 0){
      //$msg = sprintf('%s Stunden wurden für Monat %s gespeichert',$worktime,$date);
      //$msg = "Ausgabe ausgeführt";
      //$msg_type = 'info';
   //}

}else{
    $response = [];
    //$msg = 'Keine Benutzerangaben gefunden';
    //$msg_type = 'error';
}

/*$response[] = array(
   'status'=> $response !== null ? 1:0,
   'status_text' => $response,
   'msg' => $msg,
   'msg_type' => $msg_type,
);*/

echo json_encode($response);
exit;

/*
include "config.php";

$condition = "1";
if(isset($_GET['userid'])){
   $condition = " id=".$_GET['userid'];
}
$userData = mysqli_query($con,"SELECT id,username,name,email,rights FROM users WHERE ".$condition); //without pwd

$response = array();

while($row = mysqli_fetch_assoc($userData)){

   $response[] = $row;
}

echo json_encode($response);
exit;*/