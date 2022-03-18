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


/*
header('Access-Control-Allow-Origin: *');

include "config.php";
$id = '';
$con = mysqli_connect($host, $user, $password, $dbname);

//$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
//$input = json_decode(file_get_contents('php://input'),true);


if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

$userid = $_GET['userid'];

$sql = sprintf("DELETE FROM `users` WHERE id = '%s';",$userid);

// run SQL statement
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}
/*
if ($method == 'GET') {
    if (!$id) echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
  } elseif ($method == 'POST') {
    echo json_encode($result);
  } else {
    echo mysqli_affected_rows($con);
  } * /
echo json_encode($result);
$con->close();*/