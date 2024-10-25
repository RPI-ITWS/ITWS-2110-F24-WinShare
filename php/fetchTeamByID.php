<?php
include "../php/config.php";
$apiKey = SPORTS_RADAR_API_KEY;

if (isset($_GET['teamId'])) {
    $teamId = $_GET['teamId'];

    $url = "https://api.sportradar.com/nba/trial/v8/en/teams/$teamId/profile.json?api_key=$apiKey";

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
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        echo json_encode(['error' => "cURL Error #: $err"]);
    } else {
        echo $response;
    }
} else {
    echo json_encode(['error' => 'No teamId specified']);
}
?>