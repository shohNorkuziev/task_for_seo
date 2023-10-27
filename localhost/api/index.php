<?php
$link = $_SERVER['REQUEST_URI'];
$command = explode("/", $link)[2];

if($command === 'get_user'){
    header("Content-Type:application/json; charset=UTF-8");
    http_response_code(200);
    $login = explode("/", $link)[3];
    $password = explode("/", $link)[4];
   
    $pdo = new PDO("mysql:host=localhost;dbname=toapi;port=3307", 'root', 'root');
    $result = $pdo->query("SELECT * from users where login='$login' and password='$password'");
    $user = $result->fetchAll(PDO::FETCH_ASSOC)[0];
    echo json_encode(['id'=>$user['id'],
    'user_login'=>$user['login'],
    'user_pasword'=>$user['password']
]); 
}else{
    http_response_code(404);
    echo json_encode(["message"=>"WRONG API"]);
}
?>