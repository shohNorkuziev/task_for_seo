<?php
$link = $_SERVER['REQUEST_URI'];
$command = explode("/", $link)[2];

$pages = [
    '' => 'pages/main.html',
    'about' => 'pages/about.php',
    'story' => 'pages/story.php',
];

if (array_key_exists($command, $pages)) {
    include $pages[$command];
} else {
    include 'pages/error404.php'; 
}
?>