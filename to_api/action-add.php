<?php
$title = $_REQUEST['titleInput'];
$price = $_REQUEST['titleInput'];
$type = $_REQUEST['titleInput'];

$url = "http://localhost/api/add_purchase";
$data = [
    'title' => $title,
    'price' => $price,
    'type' => $type
];
$options = [
    'http' => [
        'method' => 'POST',
        'content' => http_build_query($data),
    ],
];
echo $title;
