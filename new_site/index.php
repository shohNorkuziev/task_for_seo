<?php
$path = $_SERVER['REQUEST_URI'];
$command = explode("/", $path)[2];
match ($command) {
    'add_user' => addUser() ,
    'get_user' =>getUser() ,
    'delete_user' =>deleteUser() ,
    'update_user' =>updateUser(),
    default => 'hi'
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
    header("Content-type: application/json; charset=utf-8");
    header('Access-Control-Allow-Origin: *');
    $db = new PDO("mysql:host=localhost;dbname=user;port=3307", 'root', 'root');
    $result = $db->query("select * from users")->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    
    //  foreach($result as $user){
    //   echo  'name: '. $user['name'] . '<br/>'.
    //     'login: '. $user['login'] . '<br/>'.
    //     'password: '. $user['password'] . '<br/>';
    // }
};

function deleteUser()
{
    $user_id = isset($_POST['user_id']) ? $_POST['user_id'] : null;

    if (!$user_id) {
        echo json_encode(["status" => "Missing user_id parameter"]);
    } else {
        $db = new PDO("mysql:host=localhost;dbname=user;port=3307", 'root', 'root');
        $sql = "DELETE FROM users WHERE id = :user_id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(["status" => "User deleted successfully"]);
        } else {
            echo json_encode(["status" => "Failed to delete user"]);
        }
    }
};


function updateUser()
{
    $user_id = isset($_POST['user_id']) ? $_POST['user_id'] : null;
    $new_name = isset($_POST['new_name']) ? $_POST['new_name'] : null;
    $new_login = isset($_POST['new_login']) ? $_POST['new_login'] : null;
    $new_password = isset($_POST['new_password']) ? $_POST['new_password'] : null;

    if (!$user_id || !$new_name || !$new_login || !$new_password) {
        echo json_encode(["status" => "Missing parameters"]);
    } else {
        $db = new PDO("mysql:host=localhost;dbname=user;port=3307", 'root', 'root');
        $sql = "UPDATE users SET name = :new_name, login = :new_login, password = :new_password WHERE id = :user_id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':new_name', $new_name, PDO::PARAM_STR);
        $stmt->bindParam(':new_login', $new_login, PDO::PARAM_STR);
        $stmt->bindParam(':new_password', $new_password, PDO::PARAM_STR);
        if ($stmt->execute()) {
            echo json_encode(["status" => "User updated successfully"]);
        } else {
            echo json_encode(["status" => "Failed to update user"]);
        }
    }
}
