<?php
header('Content-Type: application/json');
include "../php/config.php";

$apiKey = SPORTS_RADAR_API_KEY;
$gameId = $_GET['game_id'] ?? '';

if (empty($gameId)) {
    echo json_encode(['error' => 'Game ID is required']);
    exit;
}

function fetchGameSummary($gameId, $apiKey) {
    $url = "https://api.sportradar.com/nba/trial/v8/en/games/$gameId/summary.json?api_key=$apiKey";

    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            "accept: application/json"
        ],
    ]);

    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);

    $data = json_decode($response, true);

    return $data;
}

$gameSummary = fetchGameSummary($gameId, $apiKey);
echo json_encode($gameSummary);
?>
