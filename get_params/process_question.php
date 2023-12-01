<?php
if ($_SERVER['REQUEST_METHOD'] !== 'GET' || !isset($_GET['user_answer']) || !isset($_GET['question'])) {
    header("Location: index.php");
    exit();
}

$userAnswer = $_GET['user_answer'];
$currentQuestion = $_GET['question'];

header("Location: index.php?question=" . ($currentQuestion + 1) . "&user_answer=$userAnswer");
exit();
?>
