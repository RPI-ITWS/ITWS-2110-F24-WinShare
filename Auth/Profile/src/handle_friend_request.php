<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not authenticated']);
    exit;
}

$servername = "localhost";
$username = "superuser";
$password_db = "superuser";
$dbname = "WinShare";

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['friend_id']) || !isset($data['action'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit;
}

$conn = new mysqli($servername, $username, $password_db, $dbname);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

$currentUserId = $_SESSION['user_id'];
$friendId = $data['friend_id'];

// Check if request already exists
$checkSql = "SELECT status FROM friendships 
             WHERE (user_id = ? AND friend_id = ?) 
             OR (user_id = ? AND friend_id = ?)";
$stmt = $conn->prepare($checkSql);
$stmt->bind_param("iiii", $currentUserId, $friendId, $friendId, $currentUserId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Friend request already exists']);
    $stmt->close();
    $conn->close();
    exit;
}

// Send friend request
$stmt = $conn->prepare("CALL send_friend_request(?, ?)");
$stmt->bind_param("ii", $currentUserId, $friendId);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Friend request sent successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send friend request']);
}

$stmt->close();
$conn->close();
?>