<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>LeaderBoard</title>
        <link rel="stylesheet" href="../assets/MainPage.css">
        <link rel="stylesheet" href="./src/leaderboard.css">
        <script src="../assets/MainPage.js" defer></script>
        <script src="./src/leaderboard.js" defer></script>
        <?php include "../php/include_header.php"?>
    </head>
    <body>
        
        <?php include '../php/header.php'; ?>

        <div id="Page" class="sticky-top">
            <div id="LeftCol"></div>
            <div id="MiddleCol" class ="flex-column flex-md-row align-items-center pt-3 pb-3">
                <h1 id="leaderBoardTitle">Leaderboard</h1>
                <div id="sortButtons" class="mb-3">
                    <button id="sortByScore" class="btn btn-primary active">Sort by Score</button>
                    <button id="sortByWinRate" class="btn btn-primary">Sort by Win Rate</button>
                </div>
                <table id="leaderboardTable">
                    <thead>
                    <tr>
                        <th id="rankings">Rank</th>
                        <th id="player">Player</th>
                        <th id="score">Score</th>
                        <th>Win Rate</th>
                    </tr>
                    </thead>
                    <tbody>
                    <!-- Leaderboard entries will be inserted here dynamically -->
                    </tbody>
                </table>
            </div>
            <div id="RightCol"></div>
        </div>

    </body>
</html>