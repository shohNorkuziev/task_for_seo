<?php
$path = $_SERVER['REQUEST_URI'];
$command = explode("/", $path)[2];
echo $command;
match ($command) {
    'add_user' => addUser() ,
    'get_user' =>getUser() ,
    'delete_user' =>deleteUser() ,
    'update_user' =>updateUser()
};

function addUser()
{
    $name = $_REQUEST['nameToApi'];
    $login = $_REQUEST['loginToApi'];
    $password = $_REQUEST['passwordToApi'];
    $db = new PDO("mysql:host=localhost;dbname=user;port=3307", 'root', 'root');
    $result = $db->query("insert into users (name,login,password) values('$name', '$login', '$password')");
    echo json_encode(["status"=>"add user!!!"]);
}

function getUser()
{
    $title = $_REQUEST["title"];
    $type = $_REQUEST["type"];
    $price = $_REQUEST["price"];
    $db = new PDO("mysql:host=localhost;dbname=toapi;port=3307", 'root', 'root');
    $result = $db->query("select * from users");
    var_dump($result);
    echo json_encode(["status"=>"get user!!!"]);
};

function deleteUser()
{
    $title = $_REQUEST["title"];
    $type = $_REQUEST["type"];
    $price = $_REQUEST["price"];
    $db = new PDO("mysql:host=localhost;dbname=toapi;port=3307", 'root', 'root');
    $result = $db->query("insert into purchases (title, type, price) values('$title', '$type', '$price')");
    echo json_encode(["status"=>"delete user!!!"]);
};

function updateUser()
{
    $title = $_REQUEST["title"];
    $type = $_REQUEST["type"];
    $price = $_REQUEST["price"];
    $db = new PDO("mysql:host=localhost;dbname=toapi;port=3307", 'root', 'root');
    $result = $db->query("insert into purchases (title, type, price) values('$title', '$type', '$price')");
    echo json_encode(["status"=>"update user!!!"]);
};