<?php
include "config.php";

$servername = "localhost";
$username = "superuser";
$password_db = "superuser";
$dbname = "WinShare";

$conn = new mysqli($servername, $username, $password_db, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function calculatePointsAdjustment($userPrediction, $actualWinner, $systemProbabilities, $pointsWagered) {
    $systemWinnerProb = $systemProbabilities[$actualWinner];
    $systemLoserProb = 100 - $systemWinnerProb;
    
    $isUserCorrect = $userPrediction === $actualWinner;
    $didSystemPredictCorrectly = $systemProbabilities[$actualWinner] > 50;
    
    if ($isUserCorrect) {
        if ($didSystemPredictCorrectly) {
            // System was right, user was right - lower reward
            return round($pointsWagered * (1 + ($systemLoserProb / 100)));
        } else {
            // System was wrong, user was right - higher reward
            return round($pointsWagered * (1 + ($systemWinnerProb / 100)));
        }
    } else {
        if ($didSystemPredictCorrectly) {
            // System was right, user was wrong - higher penalty
            return -round($pointsWagered * (1 + ($systemWinnerProb / 100)));
        } else {
            // System was wrong, user was wrong - lower penalty
            return -round($pointsWagered * (1 + ($systemLoserProb / 100)));
        }
    }
}

try {
    $data = json_decode(file_get_contents('php://input'), true);
    $game_id = $data['game_id'] ?? '';
    $actual_winner = $data['actual_winner'] ?? '';
    $home_team = $data['home_team'] ?? ''; // Add this
    $away_team = $data['away_team'] ?? ''; // Add this

    if (empty($game_id) || empty($actual_winner)) {
        echo json_encode(['error' => 'Missing required data']);
        exit;
    }

    // Begin transaction
    $conn->begin_transaction();

    try {
        // Get all predictions for this game that haven't been processed
        $stmt = $conn->prepare("SELECT * FROM game_predictions WHERE game_id = ? AND points_earned IS NULL");
        $stmt->bind_param("s", $game_id);
        $stmt->execute();
        $predictions = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        foreach ($predictions as $prediction) {
            // Calculate points adjustment
            $systemProbabilities = json_decode($prediction['system_probabilities'], true);
            $pointsAdjustment = calculatePointsAdjustment(
                $prediction['winner_name'],
                $actual_winner,
                $systemProbabilities,
                $prediction['points_wagered']
            );

            // Update prediction record
            $stmt = $conn->prepare("UPDATE game_predictions SET points_earned = ? WHERE id = ?");
            $stmt->bind_param("ii", $pointsAdjustment, $prediction['id']);
            $stmt->execute();

            // Update user points and stats
            $isCorrect = $prediction['winner_name'] === $actual_winner;
            $stmt = $conn->prepare("UPDATE users SET 
                points = points + ?,
                RoundsCorrect = RoundsCorrect + ?,
                RoundsWrong = RoundsWrong + ?
                WHERE id = ?");
            $correct = $isCorrect ? 1 : 0;
            $wrong = $isCorrect ? 0 : 1;
            $stmt->bind_param("iiii", $pointsAdjustment, $correct, $wrong, $prediction['user_id']);
            $stmt->execute();
        }

        $conn->commit();
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        $conn->rollback();
        throw $e;
    }
} catch (Exception $e) {
    echo json_encode(['error' => 'Server error', 'message' => $e->getMessage()]);
}
?>
