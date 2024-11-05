<?php
error_reporting(E_ALL); // Temporarily enable error reporting for debugging
ini_set('display_errors', 1);

$servername = "localhost";
$username = "superuser";
$password_db = "superuser";
$dbname = "WinShare";

// Get user ID from URL parameter
$userId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($userId === 0) {
    $userId = 5; // Default user ID
}

$conn = new mysqli($servername, $username, $password_db, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to get user profile data
$sql = "SELECT 
    users.id,
    users.username as player,
    users.profilePic,
    users.points,
    users.RoundsCorrect,
    users.RoundsWrong,
    users.email
FROM users 
WHERE users.id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$userData = $result->fetch_assoc();

if (!$userData) {
    die("User not found"); // For debugging, change to proper 404 later
}

// Calculate win rate only if there are rounds played
$totalRounds = $userData['RoundsCorrect'] + $userData['RoundsWrong'];
if ($totalRounds > 0) {
    $winRate = ($userData['RoundsCorrect'] / $totalRounds) * 100;
    $userData['winRate'] = round($winRate, 2);
} else {
    $userData['winRate'] = 0;
}

$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($userData['player']); ?>'s Profile - WinShare</title>
    <link rel="stylesheet" href="./src/profile.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="../../assets/navbar.css">
</head>
<body>

<?php include '../../php/header.php'; ?>

<div class="container">
    <div class="profile-header">
        <div class="profile-banner">
            <img src="../<?php echo htmlspecialchars($userData['profilePic']); ?>"
                 alt="<?php echo htmlspecialchars($userData['player']); ?>'s profile"
                 class="profile-pic">
            <h1><?php echo htmlspecialchars($userData['player']); ?></h1>
            <div class="profile-stats">
                <div class="stat">
                    <span class="stat-value"><?php echo number_format($userData['points']); ?></span>
                    <span class="stat-label">Score</span>
                </div>
                <div class="stat">
                    <span class="stat-value"><?php echo $userData['winRate']; ?>%</span>
                    <span class="stat-label">Win Rate</span>
                </div>
                <div class="stat">
                    <span class="stat-value"><?php echo number_format($userData['RoundsCorrect']); ?></span>
                    <span class="stat-label">Correct Rounds</span>
                </div>
            </div>
        </div>
    </div>

    <div class="profile-content">
        <div class="profile-section">
            <h2>About</h2>
            <div class="profile-details">
                <p><strong>Email:</strong> <?php echo htmlspecialchars($userData['email']); ?></p>
                <p><strong>Total Rounds:</strong> <?php echo number_format($userData['RoundsCorrect'] + $userData['RoundsWrong']); ?></p>
                <p><strong>Correct Rounds:</strong> <?php echo number_format($userData['RoundsCorrect']); ?></p>
                <p><strong>Wrong Rounds:</strong> <?php echo number_format($userData['RoundsWrong']); ?></p>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const stats = document.querySelectorAll('.stat-value');
        stats.forEach(stat => {
            const value = parseFloat(stat.textContent.replace(/,/g, ''));
            let startValue = 0;
            const duration = 1000;
            const start = performance.now();

            function updateValue(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                const currentValue = progress * value;
                stat.textContent = stat.textContent.includes('%')
                    ? currentValue.toFixed(1) + '%'
                    : Math.floor(currentValue).toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateValue);
                }
            }

            requestAnimationFrame(updateValue);
        });
    });
</script>
</body>
</html>