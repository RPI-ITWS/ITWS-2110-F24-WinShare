<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WinShare</title>
    <link rel="stylesheet" href="./assets/stats.css?v=1.0">
    <script src="./assets/stats.js" defer></script>
    <?php include "../php/include_header.php"?>

</head>
<body>

<?php include '../php/header.php'; ?>

<div id = "body">
<h1 id="SeasonStatsTitle">Statistics</h1> 
        <div id = "content">
            <div id = "tabs">
                <button id="StatButton">Search For Statistic</button>
                <button id="PlayerButton">Search For Player</button>
            </div>
            <div id="PlayerContent">
                <div id="search">
                    <label for="stat" id="statlabel">Search Season-wide Statistics:</label>
                    <select id="stat" for="stat">
                        <option value="default">Select an option</option>
                        <option value="statP0">Point Rankings</option>                
                        <option value="statP1">Mins Played</option>
                        <option value="statP2">Field Goals Made</option>
                        <option value="statP3">Field Goal Percentage</option>
                        <option value="statP4">3-Pointers Made</option>
                        <option value="statP5">3-Pointers Percentage</option>
                        <option value="statP6">Free Throws Made</option>
                        <option value="statP7">Free Throw Percentage</option>
                        <option value="statP8">Offensive Rebounds</option>
                        <option value="statP9">Defenseive Rebounds</option>
                        <option value="statP10">Steals</option>
                        <option value="statP11">Blocks</option>
                        <option value="statP12">Fouls</option>
                    </select>
                </div>
                <p id="data1"></p>
            </div>
            <div id = "StatContent">
                <div id = "top">
                    <input type="text" id="PlayerSearch" placeholder="Search Players">
                    <button id = "FindPlayer" onclick = "FindPlayerStats(document.getElementById('PlayerSearch').value)">Search</button>
                </div>
                <div id="center">
                    <div id="PlayerOptions"></div>
                    <div id = "null"></div>
                </div>
                <div id = "data2">
                    <div class="photo-container">
                        <img src="./assets/Photos/default.png" alt="Profile" class="profile-photo">
                    </div>
                    <div class="player-container">
                        <h2 id="name">...</h2>
                        <p id="position">...</p>
                    </div>
                    <div class="stats-grid">
                        <div class="stat-box" id="stat-box-1">
                            <p class="stat-value" id="value-1"></p>
                        </div>
                        <div class="stat-box" id="stat-box-2">
                            <p class="stat-label" id="label-2"></p>
                        </div>
                        <div class="stat-box" id="stat-box-3">
                            <p class="stat-value" id="value-3"></p>
                        </div>
                        <div class="stat-box" id="stat-box-4">
                            <p class="stat-label" id="label-4"></p>
                        </div>
                        <div class="stat-box" id="stat-box-5">
                            <p class="stat-value" id="value-5"></p>
                        </div>
                        <div class="stat-box" id="stat-box-6">
                            <p class="stat-label" id="label-6"></p>
                        </div>
                        <div class="stat-box" id="stat-box-7">
                            <p class="stat-value" id="value-7"></p>
                        </div>
                        <div class="stat-box" id="stat-box-8">
                            <p class="stat-label" id="label-8"></p>
                        </div>
                        <div class="stat-box" id="stat-box-9">
                            <p class="stat-value" id="value-9"></p>
                        </div>
                        <div class="stat-box" id="stat-box-10">
                            <p class="stat-label" id="label-10"></p>
                        </div>
                        <div class="stat-box" id="stat-box-11">
                            <p class="stat-value" id="value-11"></p>
                        </div>
                        <div class="stat-box" id="stat-box-12">
                            <p class="stat-label" id="label-12"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</body>
</html>
