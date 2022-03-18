<?php
defined('_VEXEC') or die(header('HTTP/1.0 403 Forbidden'));

$host = "localhost:3306"; /* Host name (MariaDB) */
$user = "workfield_USERNAME"; /* User */
$password = "workfield_SECUREPASSWORD"; /* Password */
$dbname = "workfield_"; /* Database name */

/*
$con = mysqli_connect($host, $user, $password,$dbname);
// Check connection
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}*/

/* You should enable error reporting for mysqli before attempting to make a connection */
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$mysqli = new mysqli($host, $user, $password, $dbname);

/* Set the desired charset after establishing a connection */
$mysqli->set_charset('utf8mb4');

//printf("Success... %s\n", $mysqli->host_info);