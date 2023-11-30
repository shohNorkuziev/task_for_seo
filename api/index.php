<?php
$path = $_SERVER['REQUEST_URI'];
$command = explode("/", $path)[2];
match ($command) {
    'add_last_user' =>addLastUser(),
    'add_last_comment' =>addLastComment(),
    'get_players' =>addSumNum(),
    'get_students' =>addStudents(),
    'get_products' =>getProducts(),
    'get_test' =>getTest(),
    default=>'error 404'
};
function addSumNum()
{
    header("Content-type: application/json; charset=utf-8");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);
    $sortFirst = $input['sortFirst'];
    $sortSecond = $input['sortSecond'];

    $db = new PDO("mysql:host=localhost;dbname=fetch;port=3307", 'root', 'root');
    $result = $db->query("SELECT * FROM `hockey` ORDER BY ".$sortFirst .' '.$sortSecond)->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}

function addStudents()
{
    header("Content-type: application/json; charset=utf-8");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');

    $db = new PDO("mysql:host=localhost;dbname=fetch;port=3307", 'root', 'root');
    $result = $db->query("SELECT * FROM `students`")->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}
function getProducts()
{
    header("Content-type: application/json; charset=utf-8");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');

    $db = new PDO("mysql:host=localhost;dbname=fetch;port=3307", 'root', 'root');
    $result = $db->query("SELECT * FROM `products`")->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}

function getTest()
{
    header("Content-type: application/json; charset=utf-8");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');

    $db = new PDO("mysql:host=localhost;dbname=fetch;port=3307", 'root', 'root');
    $result = $db->query("SELECT * FROM `answers`")->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}
// function addLastUser()
// {
//     header("Content-type: application/json; charset=utf-8");
//     header('Access-Control-Allow-Origin: *');
//     $db = new PDO("mysql:host=localhost;dbname=fetch;port=3307", 'root', 'root');
//     $result = $db->query("SELECT * FROM users ORDER BY id DESC LIMIT 1")->fetchAll(PDO::FETCH_ASSOC);
//     echo json_encode($result);
// }
// function addLastComment()
// {
//     header("Content-type: application/json; charset=utf-8");
//     header('Access-Control-Allow-Origin: *');
//     $db = new PDO("mysql:host=localhost;dbname=fetch;port=3307", 'root', 'root');
//     $result = $db->query("SELECT * FROM comments ORDER BY date DESC LIMIT 1")->fetchAll(PDO::FETCH_ASSOC);
//     echo json_encode($result);
// }

// $link = $_SERVER['REQUEST_URI'];
// $command = explode("/", $link)[2];

// if ($command === 'get_user') {
//     header("Content-Type: application/json; charset=UTF-8");
//     http_response_code(200);
//     $login = urldecode(explode("/", $link)[3]);
//     $password = urldecode(explode("/", $link)[4]);

//     $pdo = new PDO("mysql:host=localhost;dbname=toapi;port=3307", 'root', 'root');
//     $stmt = $pdo->prepare("SELECT id, login, password FROM users WHERE login = :login AND password = :password");
//     $stmt->bindParam(':login', $login);
//     $stmt->bindParam(':password', $password);
//     $stmt->execute();
//     $user = $stmt->fetch(PDO::FETCH_ASSOC);

//     if ($user) {
//         echo json_encode(['id' => $user['id']]);
//     } else {
//         http_response_code(401);
//         echo json_encode(["message" => "не удалась"]);
//     }
// } else {
//     http_response_code(404);
//     echo json_encode(["message" => "WRONG API"]);
// }
// function addMoney()
// {
//     $money = explode("/",$_SERVER['REQUEST_URI'])[3];
//     $db = new PDO("mysql:host=localhost;dbname=toapi;port=3307", 'root', 'root');
//     $result = $db->query("insert into bank_acc (money) values('$money')");
//     echo json_encode(["status"=>"add money!!!"]);
// };
// function addPurchase()
// {
//     $title = $_REQUEST["title"];
//     $type = $_REQUEST["type"];
//     $price = $_REQUEST["price"];
//     $db = new PDO("mysql:host=localhost;dbname=toapi;port=3307", 'root', 'root');
//     $result = $db->query("insert into purchases (title, type, price) values('$title', '$type', '$price')");
//     echo json_encode(["status"=>"Purchase added!!!"]);
// };
?>
