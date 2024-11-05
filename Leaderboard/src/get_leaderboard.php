<?php
// Prevent any output before our JSON
error_reporting(0);
ini_set('display_errors', 0);

// Ensure we're sending JSON header before any output
header('Content-Type: application/json');

try {
    $servername = "localhost";
    $username = "superuser";
    $password_db = "superuser";
    $dbname = "WinShare";

    $conn = new mysqli($servername, $username, $password_db, $dbname);

    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Query to get leaderboard data
    $sql = "SELECT 
        users.id,
        users.username as player,
        users.profilePic as profilePic,
        users.points as score,
        users.RoundsCorrect as RoundsCorrect,
        users.RoundsWrong as RoundsWrong
    FROM users
    ORDER BY score DESC";

    $result = $conn->query($sql);

    if (!$result) {
        throw new Exception("Query failed: " . $conn->error);
    }

    $users = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            // Clean and validate the data
            $row['score'] = (int)$row['score'];
            $row['RoundsCorrect'] = (int)$row['RoundsCorrect'];
            $row['RoundsWrong'] = (int)$row['RoundsWrong'];
            $row['profilePic'] = htmlspecialchars($row['profilePic']);
            $row['player'] = htmlspecialchars($row['player']);

            $users[] = $row;
        }
    }

    $response = array(
        'success' => true,
        'users' => $users
    );

    echo json_encode($response);

} catch (Exception $e) {
    // Return error as JSON
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage()
    ));
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}