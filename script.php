<?php

session_start();
$start = microtime(true);
date_default_timezone_set("Europe/Moscow");
$currentTime = date('m/d/Y h:i:s a', time());

function validateX($x) {
    return isset($x) && is_numeric($x) && $x >= -2 && $x <= 2;
}

function validateY($y) {
    return isset($y) && is_numeric($y) && $y >= -5 && $y <= 5;
}

function validateR($r) {
    return isset($r) && is_numeric($r) && $r >= 1 && $r <= 4;
}

function validateForm($x, $y, $r) {
    return validateR($r) && validateX($x) && validateY($y);
}

function triangle($x, $y, $r){
    return $x >= 0 && $y >= 0 && $y + 2*$x <= $r;
}

function circle($x, $y, $r){
    return $x <= 0 && $y >=0 && $x*$x + $y*$y <= $r*$r/4;
}

function rectangle($x, $y, $r){
    return $x <= 0 && $y <= 0 && $x >= -$r && $y >= -$r;
}

$x = floatval(htmlspecialchars($_GET["x"]));
$y = floatval(htmlspecialchars($_GET["y"]));
$r = floatval(htmlspecialchars($_GET["r"]));
$answer = 'No';

$validation = validateForm($x, $y, $r) ? "Yes" : "No";
if (triangle($x, $y, $r) || circle($x, $y, $r) || rectangle($x, $y, $r)){
    $answer = 'Yes';
}

$executionTime = number_format(microtime(true) - $start, 8, '.', '') . ' ms';

$result = array($x, $y, $r, $answer, $executionTime, $currentTime, $validation);

if (!isset($_SESSION['results'])) {
    $_SESSION['results'] = array();
}
array_push($_SESSION['results'], $result);

print_r('<tr><td>'.$x.'</td><td>'.$y.'</td><td>'.$r.'</td><td>'.$answer.'</td><td>'.$executionTime.'</td><td>'.$currentTime.'</td><td>'.$validation.'</td></tr>');

?>