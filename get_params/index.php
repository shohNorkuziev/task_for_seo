<?php
$dsn = "mysql:host=localhost;port=3307;dbname=fetch";
$username = "root";
$password = "root";

try {
    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $currentQuestion = isset($_GET['question']) ? intval($_GET['question']) : 1;

    $questions = getRandomQuestions($conn, 5);

    if (isset($questions[$currentQuestion - 1])) {
        $question = $questions[$currentQuestion - 1];
        $answers = getRandomAnswers($conn, $question['id']);
        displayQuestion($question, $answers, $currentQuestion);
    } else {
        echo "<h2>Результаты теста</h2>";
        echo "<p>Правильных ответов: " . calculateScore() . "</p>";
    }

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
} finally {
    $conn = null;
}

function getRandomQuestions($conn, $numQuestions) {
    $questions = array();
    $sql = "SELECT * FROM questions ORDER BY RAND() LIMIT $numQuestions";
    $stmt = $conn->query($sql);

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $questions[] = $row;
    }

    return $questions;
}

function getRandomAnswers($conn, $questionId) {
    $answers = array();
    $sql = "SELECT * FROM answers WHERE question_id = $questionId ORDER BY RAND()";
    $stmt = $conn->query($sql);
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $answers[] = $row;
    }

    return $answers;
}

function displayQuestion($question, $answers, $currentQuestion) {
    echo "<h2>Вопрос $currentQuestion</h2>";
    echo "<h3>{$question['question_text']}</h3>";
    echo "<form action='process_question.php' method='get'>";
    echo "<input type='hidden' name='question' value='$currentQuestion'>";
    
    foreach ($answers as $answer) {
        echo "<label><input type='radio' name='user_answer' value='{$answer['is_correct']}'>{$answer['answer_text']}</label>";
    }

    echo "<input type='submit' value='Ответить'>";
    echo "</form>";
}

function calculateScore() {
    $score = 0;
    for ($i = 1; $i <= 5; $i++) {
        $userAnswer = isset($_GET["question$i"]) ? $_GET["question$i"] : null;
        if ($userAnswer !== null) {
            $score += ($userAnswer == 1) ? 1 : 0;
        }
    }
    return $score;
}
?>