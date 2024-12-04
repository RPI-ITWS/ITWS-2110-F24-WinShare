<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(array(
        'success' => false,
        'error' => 'not_logged_in',
        'message' => 'Please log in to view friends and predictions'
    ));
    exit;
}

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

    $sql = "SELECT 
        u.id,
        u.username as player,
        u.profilePic as profilePic,
        gp.home_team,
        gp.away_team,
        gp.winner_name as prediction,
        gp.points_earned as points,
        gp.points_wagered,
        gp.prediction_time
    FROM users u
    INNER JOIN friendships f ON (f.friend_id = u.id OR f.user_id = u.id)
    LEFT JOIN game_predictions gp ON u.id = gp.user_id
    WHERE (f.user_id = ? OR f.friend_id = ?)
    AND f.status = 'accepted'
    AND u.id != ?
    AND (gp.prediction_time >= NOW() - INTERVAL 2 DAY OR gp.prediction_time IS NULL)
    ORDER BY u.username, gp.prediction_time DESC";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $userId, $userId, $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $friends = array();
    $currentFriend = null;

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            if ($currentFriend === null || $currentFriend['id'] !== $row['id']) {
                if ($currentFriend !== null) {
                    $friends[] = $currentFriend;
                }
                $currentFriend = [
                    'id' => $row['id'],
                    'player' => htmlspecialchars($row['player']),
                    'profilePic' => htmlspecialchars($row['profilePic']),
                    'total_points' => 0,
                    'predictions' => []
                ];
            }

            if ($row['prediction'] !== null) {
                $currentFriend['predictions'][] = [
                    'home_team' => htmlspecialchars($row['home_team']),
                    'away_team' => htmlspecialchars($row['away_team']),
                    'prediction' => htmlspecialchars($row['prediction']),
                    'points_wagered' => (int)$row['points_wagered'],
                    'points' => (int)$row['points'],
                    'prediction_date' => $row['prediction_time']
                ];
                $currentFriend['total_points'] += (int)$row['points'];
            }
        }

        if ($currentFriend !== null) {
            $friends[] = $currentFriend;
        }
    }

    $response = array(
        'success' => true,
        'friends' => $friends
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
?>