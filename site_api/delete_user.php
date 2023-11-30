<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$api_url = "http://localhost/new_site/delete_user/";

$user_id = 2;

$data = array('user_id' => $user_id);

$options = array(
    'http' => array(
        'method' => 'POST',
        'header' => 'Content-type: application/x-www-form-urlencoded',
        'content' => http_build_query($data)
    )
);

$context = stream_context_create($options);
$users = file_get_contents($api_url, false, $context);

if ($users === false) {
    echo "Ошибка при выполнении запроса к API: " . error_get_last()['message'];
} else {
    // Обработка успешного ответа
    echo $users;
}
