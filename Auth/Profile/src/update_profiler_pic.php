<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit;
}
// Get and decode the JSON data
$json = file_get_contents('php://input');
$data = json_decode($json, true);
if (!isset($data['profilePic'])) {
    echo json_encode(['success' => false, 'message' => 'No profile picture specified']);
    exit;
}
// Database connection
$servername = "localhost";
$username = "superuser";
$password_db = "superuser";
$dbname = "WinShare";
$conn = new mysqli($servername, $username, $password_db, $dbname);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}
// Update the profile picture
$sql = "UPDATE users SET profilePic = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $data['profilePic'], $_SESSION['user_id']);
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update profile picture']);
}
$stmt->close();
$conn->close();
?>