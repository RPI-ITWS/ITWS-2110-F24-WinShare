<?php
error_reporting(0);
ini_set('display_errors', 0);

$servername = "localhost";
$username = "superuser";
$password_db = "superuser";
$dbname = "WinShare";

// Get user ID from URL parameter
$userId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($userId === 0) {
    header("Location: /404.php"); // Redirect to 404 page if no ID provided
    exit();
}

$conn = new mysqli($servername, $username, $password_db, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to get user profile data
$sql = "SELECT 
    users.id,
    users.username as player,
    users.profilePic,
    users.score,
    users.RoundsCorrect,
    users.RoundsWrong,
    users.email
FROM users 
WHERE users.id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    header("Location: /404.php"); // Redirect to 404 if user not found
    exit();
}

$userData = $result->fetch_assoc();
$winRate = ($userData['RoundsCorrect'] / ($userData['RoundsCorrect'] + $userData['RoundsWrong'])) * 100;
$userData['winRate'] = round($winRate, 2);

// Get user's recent matches


$stmt->close();
$conn->close();
?>