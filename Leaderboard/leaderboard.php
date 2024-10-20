<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>LeaderBoard</title>
        <link rel="stylesheet" href="../assets/MainPage.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <link rel="stylesheet" href="./src/leaderboard.css">
        <link rel="stylesheet" href="../assets/navbar.css">
        <script src="../assets/MainPage.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        <script src="./src/leaderboard.js" defer></script>

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
            <div id="RightColumn"></div>
        </div>

    </body>
</html>