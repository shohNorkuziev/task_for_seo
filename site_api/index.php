<?php
$api_path = 'http://localhost/new%20site/add_user';
$paramsToApi = [
'nameToApi'=>'hr',
'loginToApi'=>'user2',
'passwordToApi'=>'123',
];
$options = [
    'http' => [
        'method' => 'POST',
        'content' => http_build_query($paramsToApi),
        ]
    ];
$request = stream_context_create($options);
$jsonFromAPI = file_get_contents($api_path, false, $request);


// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $login = $_POST['login'];
//     $password = $_POST['password'];
    
//     $api_url = "http://localhost/new%20site/add_user";
//     $api = file_get_contents($api_url);
//     $response = json_decode($api);

//     if (isset($response->id)) {
//         echo 'ID: ' . $response->id;
//     } else {
//         echo 'не удалась';
//     }
// }