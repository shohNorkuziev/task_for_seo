<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$api_url = "http://localhost/new_site/get_user/";
$users = file_get_contents($api_url);

if ($users === false) {
    echo "Ошибка при выполнении запроса к API: " . error_get_last()['message'];
} else {
    // Обработка успешного ответа
    echo $users;
}
