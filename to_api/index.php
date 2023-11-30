<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = $_POST['login'];
    $password = $_POST['password'];
    
    $api_url = "http://localhost/api/get_user/$login/$password";
    $api = file_get_contents($api_url);
    $response = json_decode($api);

    if (isset($response->id)) {
        echo 'ID: ' . $response->id;
    } else {
        echo 'не удалась';
    }
}
?>
