<?php
include "config.php";

$servername = "localhost";
$username = "superuser";
$password_db = "superuser";
$dbname = "WinShare";

$conn = new mysqli($servername, $username, $password_db, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

try {
    $user_id = (int)$_GET['user_id'] ?? '';
    $game_id = $_GET['game_id'] ?? '';

    if (empty($game_id)) {
        echo json_encode(['error' => 'Game ID required']);
        exit;
    }
    
    if (empty($user_id)) {
        echo json_encode(['error' => 'You need to be logged in']);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM game_predictions WHERE user_id = ? AND game_id = ?");
    $stmt->bind_param("is", $user_id, $game_id);
    $stmt->execute();
    $result = $stmt->get_result();

    echo json_encode([
        'hasPrediction' => $result->num_rows > 0,
        'prediction' => $result->num_rows > 0 ? $result->fetch_assoc() : null
    ]);
} catch (Exception $e) {
    echo json_encode(['error' => 'Server error', 'message' => $e->getMessage()]);
}
?>
