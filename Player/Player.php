<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Player Profile</title>
    <?php include "../php/include_header.php"; ?>
    <link rel="stylesheet" href="./Player.css">
    <script src="./scripts/Player.js" defer></script>
    <script src="./scripts/PlayerStats.js" defer></script>
</head>
<body>
    <?php include "../php/header.php" ?>
    
    <header class="player-header">
        <img id="playerImage" src="../assets/Photos/default.png" alt="Player Photo" class="player-photo">
        <div class="player-info">
            <h1 id="player-name">Loading...</h1>
            <p id="player-details"></p>
        </div>
    </header>

    <main class="content">
        <section class="player-stats">
            <h2>Player Statistics</h2>
            <div id="season-stats"></div>
        </section>

        <section class="player-details">
            <h2>Player Details</h2>
            <div id="player-bio"></div>
        </section>

        <section class="draft-info">
            <h2>Draft Information</h2>
            <div id="draft-details"></div>
        </section>
    </main>
</body>
</html>
