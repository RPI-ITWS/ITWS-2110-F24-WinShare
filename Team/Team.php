<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Page</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="../assets/navbar.css">
    <link rel="stylesheet" href="../assets/miniLeaderboard.css">
    <link rel="stylesheet" href="./Team.css">
    <script src="./scripts/Team.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</head>
<body>
    <?php include "../php/header.php" ?>
    <header class="header">
        <img id="logoPath" alt="Team Logo" class="logo">
        <div class="team-info">
            <h1 id="team-name">Wolves Esports WOL</h1>
            <p>
                <a href="#" id="alias"></a> |
                <a href="#" id="Owner"></a> |
                <a href="#" id="GM"></a>
            </p>
            <p id="market">China</p>
        </div>
    </header>

    <nav class="nav-tabs">
        <a href="#">Overview</a>
    </nav>

    <main class="content">
        <section class="upcoming-matches">
            <h2>Upcoming Matches</h2>
            <div class="match">
                <span>WALL-E Cup</span>
                <img src="../assets/Photos/teamLogo/lakers.png" alt="Wolves">
                <span>vs</span>
                <img src="../assets/Photos/teamLogo/hornets.png" alt="Nova">
                <span>3h 14m</span>
            </div>
            <div class="match">
                <span>FGC 24</span>
                <img src="../assets/Photos/teamLogo/lakers.png" alt="Wolves">
                <span>vs</span>
                <img src="../assets/Photos/teamLogo/magic.png" alt="Titan">
                <span>5d 2h</span>
            </div>
        </section>

        <section class="recent-results">
            <h2>Recent Results</h2>
            <div class="result">
                <span>WALL-E Cup</span>
                <img src="../assets/Photos/teamLogo/lakers.png" alt="Wolves">
                <span>2 : 1</span>
                <img src="../assets/Photos/teamLogo/clippers.png" alt="All Gamers">
            </div>
        </section>

        <section class="current-coaches">
            <h2>Current Coaches</h2>
        </section>

        <section class="current-roster">
            <h2>Current Roster</h2>
        </section>
    </main>
</body>
</html>