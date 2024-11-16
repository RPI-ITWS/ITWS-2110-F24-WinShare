<?php
$servername = "localhost";
$username = "superuser";
$password_db = "superuser";
$dbname = "WinShare";

$conn = new mysqli($servername, $username, $password_db, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['teamId'])) {
    $teamId = $_GET['teamId'];
    
    $query = "SELECT 
        pg.*,
        ht.name as home_team_name,
        at.name as away_team_name
    FROM previous_games pg
    JOIN teams ht ON pg.home_team_id = ht.id
    JOIN teams at ON pg.away_team_id = at.id
    WHERE pg.home_team_id = ? OR pg.away_team_id = ?
    ORDER BY pg.game_date DESC";
    
    try {
        $stmt = $conn->prepare($query);
        $stmt->bind_param('ss', $teamId, $teamId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $games = [];
        while ($row = $result->fetch_assoc()) {
            $games[] = $row;
        }
        
        echo json_encode(['success' => true, 'games' => $games]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'No team ID provided']);
}
?>
