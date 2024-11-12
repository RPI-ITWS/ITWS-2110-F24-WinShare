<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WinShare</title>
    <link rel="stylesheet" href="./assets/stats.css">
    <link rel="stylesheet" href="../assets/navbar.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="./assets/stats.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

</head>
<body>

<?php include '../php/header.php'; ?>

<div id = "body">
        <div id = "content">
            <div id = "tabs">
                <button id="StatButton">Search For Statistic</button>
                <button id="PlayerButton">Search For Player</button>
            </div>
            <div id="PlayerContent">
                <div id="search">
                    <label for="stat" id="statlabel">Season-wide Statistics:</label>
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
                <div id="data1"></div>
            </div>
            <div id = "StatContent">
                <div id = "top">
                    <input type="text" id="PlayerSearch" placeholder="Search Players">
                    <button id = "FindPlayer" onclick = "FindPlayerStats()">Search</button>
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
                        <h2 class="name">...</h2>
                        <p class="position">...</p>
                    </div>
                    <div class="stats-grid">
                        <div class="stat-box" id="stat-box-1">
                            <p class="stat-label" id="label-1"></p>
                            <p class="stat-value" id="value-1"></p>
                        </div>
                        <div class="stat-box" id="stat-box-2">
                            <p class="stat-label" id="label-2"></p>
                            <p class="stat-value" id="value-2"></p>
                        </div>
                        <div class="stat-box" id="stat-box-3">
                            <p class="stat-label" id="label-3"></p>
                            <p class="stat-value" id="value-3"></p>
                        </div>
                        <div class="stat-box" id="stat-box-4">
                            <p class="stat-label" id="label-4"></p>
                            <p class="stat-value" id="value-4"></p>
                        </div>
                        <div class="stat-box" id="stat-box-5">
                            <p class="stat-label" id="label-5"></p>
                            <p class="stat-value" id="value-5"></p>
                        </div>
                        <div class="stat-box" id="stat-box-6">
                            <p class="stat-label" id="label-6"></p>
                            <p class="stat-value" id="value-6"></p>
                        </div>
                        <div class="stat-box" id="stat-box-7">
                            <p class="stat-label" id="label-7"></p>
                            <p class="stat-value" id="value-7"></p>
                        </div>
                        <div class="stat-box" id="stat-box-8">
                            <p class="stat-label" id="label-8"></p>
                            <p class="stat-value" id="value-8"></p>
                        </div>
                        <div class="stat-box" id="stat-box-9">
                            <p class="stat-label" id="label-9"></p>
                            <p class="stat-value" id="value-9"></p>
                        </div>
                        <div class="stat-box" id="stat-box-10">
                            <p class="stat-label" id="label-10"></p>
                            <p class="stat-value" id="value-10"></p>
                        </div>
                        <div class="stat-box" id="stat-box-11">
                            <p class="stat-label" id="label-11"></p>
                            <p class="stat-value" id="value-11"></p>
                        </div>
                        <div class="stat-box" id="stat-box-12">
                            <p class="stat-label" id="label-12"></p>
                            <p class="stat-value" id="value-12"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</body>
</html>
