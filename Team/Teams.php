<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="../assets/navbar.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="./scripts/Team.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

    <title>NBA Teams</title>
</head>
<body>
<?php include "../php/header.php" ?>

    <h1>NBA Teams</h1>

    <div class="division-container">
        <!-- Atlantic Division -->
        <div class="division" id="atlantic">
            <h2>Atlantic</h2>
            <ul>
                <li><a href="Team.php?teamName=Boston%20Celtics&id=583eccfa-fb46-11e1-82cb-f4ce4684ea4c">Boston Celtics</a></li>
                <li><a href="Team.php?teamName=Brooklyn%20Nets&id=583ec9d6-fb46-11e1-82cb-f4ce4684ea4c">Brooklyn Nets</a></li>
                <li><a href="Team.php?teamName=New%20York%20Knicks&id=583ec70e-fb46-11e1-82cb-f4ce4684ea4c">New York Knicks</a></li>
                <li><a href="Team.php?teamName=Philadelphia%2076ers&id=583ec87d-fb46-11e1-82cb-f4ce4684ea4c">Philadelphia 76ers</a></li>
                <li><a href="Team.php?teamName=Toronto%20Raptors&id=583ecda6-fb46-11e1-82cb-f4ce4684ea4c">Toronto Raptors</a></li>
            </ul>
        </div>

        <!-- Central Division -->
        <div class="division" id="central">
            <h2>Central</h2>
            <ul>
                <li><a href="Team.php?teamName=Chicago%20Bulls&id=583ec5fd-fb46-11e1-82cb-f4ce4684ea4c">Chicago Bulls</a></li>
                <li><a href="Team.php?teamName=Cleveland%20Cavaliers&id=583ec773-fb46-11e1-82cb-f4ce4684ea4c">Cleveland Cavaliers</a></li>
                <li><a href="Team.php?teamName=Detroit%20Pistons&id=583ec928-fb46-11e1-82cb-f4ce4684ea4c">Detroit Pistons</a></li>
                <li><a href="Team.php?teamName=Indiana%20Pacers&id=583ec7cd-fb46-11e1-82cb-f4ce4684ea4c">Indiana Pacers</a></li>
                <li><a href="Team.php?teamName=Milwaukee%20Bucks&id=583ecefd-fb46-11e1-82cb-f4ce4684ea4c">Milwaukee Bucks</a></li>
            </ul>
        </div>
    </div>

    <div class="division-container">
        <!-- Southeast Division -->
        <div class="division" id="southeast">
            <h2>Southeast</h2>
            <ul>
                <li><a href="Team.php?teamName=Atlanta%20Hawks&id=583ecb8f-fb46-11e1-82cb-f4ce4684ea4c">Atlanta Hawks</a></li>
                <li><a href="Team.php?teamName=Charlotte%20Hornets&id=583ec97e-fb46-11e1-82cb-f4ce4684ea4c">Charlotte Hornets</a></li>
                <li><a href="Team.php?teamName=Miami%20Heat&id=583ecea6-fb46-11e1-82cb-f4ce4684ea4c">Miami Heat</a></li>
                <li><a href="Team.php?teamName=Orlando%20Magic&id=583ed157-fb46-11e1-82cb-f4ce4684ea4c">Orlando Magic</a></li>
                <li><a href="Team.php?teamName=Washington%20Wizards&id=583ec8d4-fb46-11e1-82cb-f4ce4684ea4c">Washington Wizards</a></li>
            </ul>
        </div>

        <!-- Northwest Division -->
        <div class="division" id="northwest">
            <h2>Northwest</h2>
            <ul>
                <li><a href="Team.php?teamName=Denver%20Nuggets&id=583ed102-fb46-11e1-82cb-f4ce4684ea4c">Denver Nuggets</a></li>
                <li><a href="Team.php?teamName=Minnesota%20Timberwolves&id=583eca2f-fb46-11e1-82cb-f4ce4684ea4c">Minnesota Timberwolves</a></li>
                <li><a href="Team.php?teamName=Oklahoma%20City%20Thunder&id=583ecfff-fb46-11e1-82cb-f4ce4684ea4c">Oklahoma City Thunder</a></li>
                <li><a href="Team.php?teamName=Portland%20Trail%20Blazers&id=583ed056-fb46-11e1-82cb-f4ce4684ea4c">Portland Trail Blazers</a></li>
                <li><a href="Team.php?teamName=Utah%20Jazz&id=583ece50-fb46-11e1-82cb-f4ce4684ea4c">Utah Jazz</a></li>
            </ul>
        </div>
    </div>

    <div class="division-container">
        <!-- Pacific Division -->
        <div class="division" id="pacific">
            <h2>Pacific</h2>
            <ul>
                <li><a href="Team.php?teamName=Golden%20State%20Warriors&id=583ec825-fb46-11e1-82cb-f4ce4684ea4c">Golden State Warriors</a></li>
                <li><a href="Team.php?teamName=LA%20Clippers&id=583ecdfb-fb46-11e1-82cb-f4ce4684ea4c">LA Clippers</a></li>
                <li><a href="Team.php?teamName=Los%20Angeles%20Lakers&id=583ecae2-fb46-11e1-82cb-f4ce4684ea4c">Los Angeles Lakers</a></li>
                <li><a href="Team.php?teamName=Phoenix%20Suns&id=583ecfa8-fb46-11e1-82cb-f4ce4684ea4c">Phoenix Suns</a></li>
                <li><a href="Team.php?teamName=Sacramento%20Kings&id=583ed0ac-fb46-11e1-82cb-f4ce4684ea4c">Sacramento Kings</a></li>
            </ul>
        </div>

        <!-- Southwest Division -->
        <div class="division" id="southwest">
            <h2>Southwest</h2>
            <ul>
                <li><a href="Team.php?teamName=Dallas%20Mavericks&id=583ecf50-fb46-11e1-82cb-f4ce4684ea4c">Dallas Mavericks</a></li>
                <li><a href="Team.php?teamName=Houston%20Rockets&id=583ecb3a-fb46-11e1-82cb-f4ce4684ea4c">Houston Rockets</a></li>
                <li><a href="Team.php?teamName=Memphis%20Grizzlies&id=583eca88-fb46-11e1-82cb-f4ce4684ea4c">Memphis Grizzlies</a></li>
                <li><a href="Team.php?teamName=New%20Orleans%20Pelicans&id=583ecc9a-fb46-11e1-82cb-f4ce4684ea4c">New Orleans Pelicans</a></li>
                <li><a href="Team.php?teamName=San%20Antonio%20Spurs&id=583ecd4f-fb46-11e1-82cb-f4ce4684ea4c">San Antonio Spurs</a></li>
            </ul>
        </div>
    </div>
</body>
</html>
