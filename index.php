<?php
session_start();
include 'php/config.php';
// Fetch NBA articles
$apiHost = 'nba-latest-news.p.rapidapi.com';
$apiKey = '049f002b9cmsh19ee321223a76dfp1a96e8jsn2efebdd5f8cf';
$articles = [];

try {
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://$apiHost/articles",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            "x-rapidapi-host: $apiHost",
            "x-rapidapi-key: $apiKey"
        ],
    ]);
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {
        throw new Exception("cURL Error: $err");
    }

    $articles = json_decode($response, true);
} catch (Exception $e) {
    error_log($e->getMessage());
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
    <script type="module" src="./assets/MainPage.js" defer></script>
    <script type="module" src="./assets/miniLeaderboard.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</head>

<body>

    <?php include 'php/header.php'; ?>


    <?php if (isset($_SESSION['user_id'])): ?>
        <div class="alert alert-success" role="alert">
            Welcome, <?= $_SESSION['username']; ?>!
        </div>
    <?php endif; ?>

    <div id="Page">
        <div id="LeftColumn">
            <h3><a href="./Leaderboard/leaderboard.php">Top Players Leaderboard</a></h3>
            <table id="miniLeaderboard">
                <tbody>
                </tbody>
            </table>
            <div class="image-container-left">
                <img src="./assets/Photos/Harden.png" alt="Basketball Image Harden" class="background-image-left">
        </div>
    </div> 
        <div id="MiddleColumn">
            <h3>NBA Matches - <?php echo date('F j, Y'); ?></h3>
            <div id="Upcoming_Matches">
                <h4>Upcoming/In Progress Matches</h4>
            </div>
            <div class="divider">Played Games</div>
            <div id="Recent_Results">
                <h4>Recent Results</h4>
            </div>
        </div>

        <div id="RightColumn">
    <h3>Latest News Articles</h3>
    <?php if (!empty($articles)) : ?>
        <ul id="newsList">
            <?php foreach (array_slice($articles, 0, 3) as $article) : ?>
                <li>
                    <a href="<?= htmlspecialchars($article['url']) ?>" target="_blank">
                        <?= htmlspecialchars($article['title']) ?>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else : ?>
        <p>No articles available at the moment.</p>
    <?php endif; ?>
    <div class="image-container">
        <img src="./assets/Photos/MainPageBron.png" alt="Basketball Image" class="background-image">
    </div>
</div>

</body>
</html>


    <script>
        function navigateToTeamPage(teamName, teamId) {
            window.location.href = `Team/Team.php?teamName=${teamName}&id=${teamId}`;
        }
    </script>
</body>
</html>
