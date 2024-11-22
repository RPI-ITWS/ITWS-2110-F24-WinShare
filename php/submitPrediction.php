<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
    if (!$user_id) {
        echo json_encode(['error' => 'User not logged in']);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['error' => 'Invalid JSON data']);
        exit;
    }

    $game_id = $data['game_id'] ?? '';
    $winner_id = $data['winner_id'] ?? '';
    $winner_name = $data['winner_name'] ?? '';

    if (empty($game_id) || empty($winner_id) || empty($winner_name)) {
        echo json_encode(['error' => 'Invalid prediction data']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO game_predictions (user_id, game_id, winner_id, winner_name) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isss", $user_id, $game_id, $winner_id, $winner_name);
    $stmt->execute();
    
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['error' => 'Server error', 'message' => $e->getMessage()]);
}
?>
