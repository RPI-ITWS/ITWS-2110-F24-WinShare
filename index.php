<?php
$servername = "localhost";
$username = "superuser";
$password = "superuser"; 
$dbname = "WinShare";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WinShare</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="./assets/MainPage.css">
    <link rel="stylesheet" href="./assets/navbar.css">
    <link rel="stylesheet" href="./assets/miniLeaderboard.css">
    <script src="./assets/MainPage.js" defer></script>
    <script src="./assets/miniLeaderboard.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</head>

<body>

    <?php include 'php/header.php'; ?>

    <div id="Page">
        <div id="LeftColumn">
            <h3><a href="./Leaderboard/leaderboard.php">Top Players Leaderboard</a></h3>
            <table id="miniLeaderboard">
                <tbody>
                </tbody>
            </table>
        </div>
        
        <div id="MiddleColumn">
            <h3>Upcoming Events</h3>
            <ul>
                <li>Event 1: Lorem ipsum dolor sit amet.</li>
                <li>Event 2: Nullam scelerisque leo nec urna fermentum.</li>
                <li>Event 3: Integer nec odio nec nulla cursus tincidunt.</li>
            </ul>
            <div id="Thumbnails">
                <div class="thumbnail">
                    <img src="assets/Photos/images.jfif" alt="Thumbnail 1">
                    <p>Game 1</p>
                </div>
                <div class="thumbnail">
                    <img src="assets/Photos/images.jfif" alt="Thumbnail 2">
                    <p>Game 2</p>
                </div>
                <div class="thumbnail">
                    <img src="assets/Photos/images.jfif" alt="Thumbnail 3">
                    <p>Game 3</p>
                </div>
                <div class="thumbnail">
                    <img src="assets/Photos/images.jfif" alt="Thumbnail 4">
                    <p>Game 4</p>
                </div>
            </div>
        </div>

        <div id="RightColumn">
            <h3>Recommended Articles</h3>
            <ul>
                <li><a href="#">Article 1</a></li>
                <li><a href="#">Article 2</a></li>
                <li><a href="#">Article 3</a></li>
            </ul>
        </div>
    </div>
</body>
</html>
