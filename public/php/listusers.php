<?php
if(!$_POST['request'] || $_POST['request'] != 1) die(header('HTTP/1.0 403 Forbidden'));
define('_VEXEC',1);

header('Content-Type: application/json');
include "config.php";

$sql = "SELECT id,username,rights FROM users WHERE 1 ORDER BY username ASC";

$result = $mysqli->query($sql);

$response = array();

while($row = mysqli_fetch_assoc($result)){
   $response[] = $row;
}

echo json_encode($response);
exit;