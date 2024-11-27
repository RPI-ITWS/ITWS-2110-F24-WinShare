<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
header('Content-Type: application/json');

try {
    if (!isset($_SESSION['user_id'])) {
        throw new Exception("User not logged in");
    }

    $servername = "localhost";
    $username = "superuser";
    $password_db = "superuser";
    $dbname = "WinShare";

    $conn = new mysqli($servername, $username, $password_db, $dbname);

    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    $userId = $_SESSION['user_id'];

    // Query to get friends' data including the current user
    $sql = "SELECT 
        u.id,
        u.username as player,
        u.profilePic as profilePic,
        u.points as score,
        u.RoundsCorrect as RoundsCorrect,
        u.RoundsWrong as RoundsWrong
    FROM users u
    WHERE u.id = ?
    UNION
    SELECT 
        u.id,
        u.username as player,
        u.profilePic as profilePic,
        u.points as score,
        u.RoundsCorrect as RoundsCorrect,
        u.RoundsWrong as RoundsWrong
    FROM users u
    INNER JOIN friendships f ON (f.friend_id = u.id OR f.user_id = u.id)
    WHERE (f.user_id = ? OR f.friend_id = ?)
    AND f.status = 'accepted'
    AND u.id != ?
    ORDER BY score DESC";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiii", $userId, $userId, $userId, $userId);
    $stmt->execute();
    $result = $stmt->get_result();

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