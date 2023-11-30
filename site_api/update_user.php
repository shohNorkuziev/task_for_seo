<?php
$api_url = "http://localhost/new_site/update_user/";

$user_id = 3;
$new_name = "Bvh";
$new_login = "Новый логин";
$new_password = "Новый пароль";

$data = array(
    'user_id' => $user_id,
    'new_name' => $new_name,
    'new_login' => $new_login,
    'new_password' => $new_password
);

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
