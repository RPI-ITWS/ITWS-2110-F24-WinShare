<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "superuser";
$password_db = "superuser";
$dbname = "WinShare";

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

// Get the search query
$query = isset($_GET['query']) ? $_GET['query'] : '';

if (strlen($query) < 2) {
    echo json_encode([]);
    exit;
}

$conn = new mysqli($servername, $username, $password_db, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Search for users
$sql = "SELECT id, username, profilePic FROM users 
        WHERE username LIKE ? 
        AND id != ? 
        AND id NOT IN (
            SELECT IF(user_id = ?, friend_id, user_id)
            FROM friendships
            WHERE (user_id = ? OR friend_id = ?)
            AND status IN ('accepted', 'pending')
        )
        LIMIT 5";

$searchQuery = "%$query%";
$currentUserId = $_SESSION['user_id'];

$stmt = $conn->prepare($sql);
$stmt->bind_param("siiii", $searchQuery, $currentUserId, $currentUserId, $currentUserId, $currentUserId);
$stmt->execute();
$result = $stmt->get_result();

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

$stmt->close();
$conn->close();

header('Content-Type: application/json');
echo json_encode($users);
?>