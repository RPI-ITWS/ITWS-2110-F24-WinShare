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
    $points_wagered = $data['points_wagered'] ?? 0;
    $system_probabilities = $data['system_probabilities'] ?? [];
    $actual_winner = $data['actual_winner'] ?? '';
    $game_status = $data['game_status'] ?? '';

    if (empty($game_id) || empty($winner_id) || empty($winner_name) || empty($actual_winner) || empty($game_status)) {
        echo json_encode(['error' => 'Invalid prediction data']);
        exit;
    }

    if ($points_wagered < 1) {
        echo json_encode(['error' => 'Minimum wager is 1 point']);
        exit;
    }

    if ($game_status !== 'complete' && $game_status !== 'closed') {
        echo json_encode(['error' => 'Predictions only allowed for completed games']);
        exit;
    }

    // Calculate points adjustment
    $points_adjustment = calculatePointsAdjustment(
        $winner_name, 
        $actual_winner,
        $system_probabilities,
        $points_wagered
    );

    $conn->begin_transaction();
    try {
        // Check if user has enough points and get current stats
        $stmt = $conn->prepare("SELECT points, RoundsCorrect, RoundsWrong FROM users WHERE id = ? FOR UPDATE");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if ($user['points'] < $points_wagered) {
            $conn->rollback();
            echo json_encode(['error' => 'Not enough points available']);
            exit;
        }

        // Update user points and stats
        $new_points = $user['points'] + $points_adjustment;
        $rounds_correct = $user['RoundsCorrect'] + ($winner_name === $actual_winner ? 1 : 0);
        $rounds_wrong = $user['RoundsWrong'] + ($winner_name !== $actual_winner ? 1 : 0);

        $stmt = $conn->prepare("UPDATE users SET points = ?, RoundsCorrect = ?, RoundsWrong = ? WHERE id = ?");
        $stmt->bind_param("iiii", $new_points, $rounds_correct, $rounds_wrong, $user_id);
        $stmt->execute();

        // Store the prediction with points earned
        $stmt = $conn->prepare("INSERT INTO game_predictions (user_id, game_id, winner_id, winner_name, points_wagered, points_earned) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("isssis", $user_id, $game_id, $winner_id, $winner_name, $points_wagered, $points_adjustment);
        $stmt->execute();

        $conn->commit();
        echo json_encode([
            'success' => true,
            'points_adjustment' => $points_adjustment,
            'new_total' => $new_points,
            'correct' => ($winner_name === $actual_winner)
        ]);
    } catch (Exception $e) {
        $conn->rollback();
        throw $e;
    }
} catch (Exception $e) {
    echo json_encode(['error' => 'Server error', 'message' => $e->getMessage()]);
}

function calculatePointsAdjustment($userPrediction, $actualWinner, $systemProbabilities, $pointsWagered) {
    $isUserCorrect = $userPrediction === $actualWinner;
    $didSystemPredictCorrectly = $systemProbabilities[$actualWinner] > 50;
    
    if ($isUserCorrect) {
        if ($didSystemPredictCorrectly) {
            // System was right, user was right - lower reward
            return round($pointsWagered * (1 + (100 - $systemProbabilities[$actualWinner]) / 100));
        } else {
            // System was wrong, user was right - higher reward
            return round($pointsWagered * (1 + (100 - $systemProbabilities[$actualWinner]) / 100));
        }
    } else {
        if ($didSystemPredictCorrectly) {
            // System was right, user was wrong - higher penalty
            return -round($pointsWagered * (1 + (100 - $systemProbabilities[$actualWinner]) / 100));
        } else {
            // System was wrong, user was wrong - lower penalty
            return -round($pointsWagered * (1 + (100 - $systemProbabilities[$actualWinner]) / 100));
        }
    }
}
?>
