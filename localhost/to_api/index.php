<?php
$api = file_get_contents("http://localhost/api/get_user/");
$text = json_decode($api);
if($_POST['login'] === $text->user_login || $_POST['password'] === $text->user_pasword){
echo 'id: '. $text->id;
}

