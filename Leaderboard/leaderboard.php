<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Leaderboard</title>
    <link rel="stylesheet" href="../assets/MainPage.css">
    <link rel="stylesheet" href="./src/leaderboard.css">
    <script src="../assets/MainPage.js" defer></script>
    <script src="./src/leaderboard.js" defer></script>
    <?php include "../php/include_header.php"; ?>
</head>
<body>
    
<?php include '../php/header.php'; ?>

<div id="leaderBoardHeader">Leaderboard</div> <!-- Leaderboard Header -->

<div id="leaderboardContainer">
    <div id="sortButtons">
            <button id="sortByScore" class="btn active">Sort by Score</button>
            <button id="sortByWinRate" class="btn">Sort by Win Rate</button>
        </div>
        <table id="leaderboardTable">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Score</th>
                    <th>Win Rate</th>
                </tr>
            </thead>
            <tbody>
                <!-- Leaderboard entries will be inserted here dynamically -->
            </tbody>
        </table>
    </div>

</body>
</html>
