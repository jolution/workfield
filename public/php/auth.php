<?php
if(!$_POST['request'] || $_POST['request'] != 1) die(header('HTTP/1.0 403 Forbidden'));
define('_VEXEC',1);

header('Content-Type: application/json');
include "config.php";
$status = 0;
$status_content = false;

if(isset($_POST['username']) && isset($_POST['password'])){
    $username = strip_tags( trim( $_POST['username'] ) );
    $password = strip_tags( trim( $_POST['password'] ) );

    // Securing password using password_hash
    //$secure_pass = password_hash($password, PASSWORD_BCRYPT);

    $username = $mysqli->real_escape_string($username);
    $password = $mysqli->real_escape_string($password);
    
    //user_id = id
    $sql = sprintf("SELECT username, id as user_id, rights, pwd as hashed_password FROM `users` WHERE username='%s' LIMIT 1;",$username);

    /* Select queries return a resultset */
    $result = $mysqli->query($sql);
    $response = mysqli_fetch_assoc($result);

    if (isset($response['hashed_password'])){
        if(password_verify($password, $response['hashed_password'])) {
            // If the password inputs matched the hashed password in the database
            // Do something, you know... log them in.
            $status = 1;
            $status_content = $response;
        }else {
            $msg = 'Fehlgeschlagen';
            $msg_type = 'error';
        }
    }else{
        $msg = 'Fehlgeschlagen';
        $msg_type = 'error'; 
    }

    if ($result->num_rows === 0){
        $msg = 'Fehlgeschlagen';
        $msg_type = 'error';
    }

    $response[] = array(
        'status'=> $status, // $response !== null ? 1:0
        'status_text' => $status_content,
        'msg' => $msg,
        'msg_type' => $msg_type,
    );

}else{
    //$response = [];
    //$response[] = array('status'=>0, 'msg'=>'');
    $response = [];
    $msg = 'Bitte alle Felder ausfüllen';
    $msg_type = 'error';
}

echo json_encode($response);
exit;