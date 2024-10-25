<?php
header('Content-Type: application/json');
include "../php/config.php";

$apiKey = SPORTS_RADAR_API_KEY;

// Function to fetch schedule for a given date
function fetchSchedule($date, $apiKey) {
    $url = "https://api.sportradar.com/nba/trial/v8/en/games/$date/schedule.json?api_key=$apiKey";

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

    if ($httpCode !== 200) {
        return [
            'error' => 'Failed to fetch schedule',
            'http_code' => $httpCode,
            'response' => $response
        ];
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return [
            'error' => 'Invalid JSON response',
            'response' => $response
        ];
    }

    return $data;
}

// Get dates for yesterday, today, and tomorrow
$yesterday = date('Y/m/d', strtotime('-1 day'));
sleep(1);
$today = date('Y/m/d');
sleep(1);
$tomorrow = date('Y/m/d', strtotime('+1 day'));

$scheduleYesterday = fetchSchedule($yesterday, $apiKey);
$scheduleToday = fetchSchedule($today, $apiKey);
$scheduleTomorrow = fetchSchedule($tomorrow, $apiKey);

$combinedSchedule = [
    'yesterday' => $scheduleYesterday,
    'today' => $scheduleToday,
    'tomorrow' => $scheduleTomorrow
];

echo json_encode($combinedSchedule);
?>