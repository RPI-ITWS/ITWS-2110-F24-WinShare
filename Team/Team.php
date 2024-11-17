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
            <div id="upcoming-matches-container">
            </div>
        </section>

        <section class="recent-results">
            <h2>Past Results</h2>
            <div class="results-container">
            </div>
            <button id="toggleResults" class="toggle-results-btn">View More</button>
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