<?php
if(!$_POST['request'] || $_POST['request'] != 1) die(header('HTTP/1.0 403 Forbidden'));
define('_VEXEC',1);

header('Content-Type: application/json');
include "config.php";

if( isset($_POST['username']) && isset($_POST['password']) && isset($_POST['rights']) ){
    $username = strip_tags( trim( $_POST['username'] ) );
    $password = strip_tags( trim( $_POST['password'] ) );
    $rights = (int) $_POST['rights']; // || '0';

    $username = $mysqli->real_escape_string($username);
    $password = $mysqli->real_escape_string($password);
    
    // Securing password using password_hash
    //$secure_pass = password_hash($password, PASSWORD_BCRYPT);
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // pwd = password
    $sql = sprintf("REPLACE INTO `users` (`username`, `pwd`, `rights`) VALUES ('%s', '%s', '%s');",$username,$hashed_password,$rights);

    /* Select queries return a resultset */
    $result = $mysqli->query($sql);

    $response = mysqli_fetch_assoc($result);

    //if ($result->num_rows === 0){
        $msg = sprintf('%s wurde angelegt',$username);
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