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

}else{
    $response = [];
    //$msg = 'Keine Benutzerangaben gefunden';
    //$msg_type = 'error';
}

echo json_encode($response);
exit;