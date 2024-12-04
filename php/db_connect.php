<?php
// Prevent any output before intended
error_reporting(0);
ini_set('display_errors', 0);

// Database configuration
$servername = "localhost";
$username = "superuser";
$password_db = "superuser";
$dbname = "WinShare";

try {
    $conn = new mysqli($servername, $username, $password_db, $dbname);

    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Set charset to handle special characters properly
    $conn->set_charset("utf8mb4");

} catch (Exception $e) {
    // Return error as JSON
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage()
    ));
    exit();
}

// Function to safely close connection
function closeConnection($conn) {
    if (isset($conn)) {
        $conn->close();
    }
}
?>