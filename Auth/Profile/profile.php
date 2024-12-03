<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

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

// Function to get friendship status
function getFriendshipStatus($conn, $currentUserId, $profileUserId) {
    $sql = "SELECT status, user_id FROM friendships 
            WHERE (user_id = ? AND friend_id = ?) 
            OR (user_id = ? AND friend_id = ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiii", $currentUserId, $profileUserId, $profileUserId, $currentUserId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return [
            'status' => $row['status'],
            'sender_id' => $row['user_id']
        ];
    }
    return null;
}

// Handle friend request actions
// Update this section in your friend request handling
if (isset($_POST['action']) && isset($_SESSION['user_id'])) {
    $currentUserId = $_SESSION['user_id'];
    $friendId = isset($_POST['friend_id']) ? (int)$_POST['friend_id'] : $userId;
    $message = '';

    try {
        switch ($_POST['action']) {
            case 'send_request':
                $stmt = $conn->prepare("CALL send_friend_request(?, ?)");
                $stmt->bind_param("ii", $currentUserId, $friendId);
                if ($stmt->execute()) {
                    $_SESSION['message'] = "Friend request sent successfully!";
                } else {
                    throw new Exception("Failed to send friend request");
                }
                break;

            case 'accept_request':
                // Debug information
                error_log("Accepting friend request - Current User: $currentUserId, Friend: $friendId");

                $stmt = $conn->prepare("UPDATE friendships SET status = 'accepted' WHERE user_id = ? AND friend_id = ? AND status = 'pending'");
                $stmt->bind_param("ii", $friendId, $currentUserId);
                if ($stmt->execute() && $stmt->affected_rows > 0) {
                    $_SESSION['message'] = "Friend request accepted!";
                } else {
                    throw new Exception("Failed to accept friend request");
                }
                break;

            case 'reject_request':
                $stmt = $conn->prepare("DELETE FROM friendships WHERE user_id = ? AND friend_id = ? AND status = 'pending'");
                $stmt->bind_param("ii", $friendId, $currentUserId);
                if ($stmt->execute() && $stmt->affected_rows > 0) {
                    $_SESSION['message'] = "Friend request rejected.";
                } else {
                    throw new Exception("Failed to reject friend request");
                }
                break;

            case 'remove_friend':
                $stmt = $conn->prepare("DELETE FROM friendships WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)");
                $stmt->bind_param("iiii", $currentUserId, $friendId, $friendId, $currentUserId);
                if ($stmt->execute() && $stmt->affected_rows > 0) {
                    $_SESSION['message'] = "Friend removed.";
                } else {
                    throw new Exception("Failed to remove friend");
                }
                break;
        }
    } catch (Exception $e) {
        $_SESSION['message'] = $e->getMessage();
        error_log($e->getMessage());
    }

    if (isset($stmt)) {
        $stmt->close();
    }

    header("Location: profile.php?id=" . $userId);
    exit();
}

// Get user profile data
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
$stmt->close();

if (!$userData) {
    die("User not found");
}

// Calculate win rate
$totalRounds = $userData['RoundsCorrect'] + $userData['RoundsWrong'];
$userData['winRate'] = ($totalRounds > 0) ? round(($userData['RoundsCorrect'] / $totalRounds) * 100, 2) : 0;

// Get current friendship status if user is logged in
$friendshipStatus = null;
$isOwnProfile = false;
if (isset($_SESSION['user_id'])) {
    $currentUserId = $_SESSION['user_id'];
    $isOwnProfile = ($currentUserId == $userId);
    if (!$isOwnProfile) {
        $friendshipStatus = getFriendshipStatus($conn, $currentUserId, $userId);
    }
}

// Get pending friend requests
function getPendingRequests($conn, $userId) {
    $sql = "SELECT u.id, u.username, u.profilePic 
            FROM users u 
            JOIN friendships f ON u.id = f.user_id 
            WHERE f.friend_id = ? AND f.status = 'pending'";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    return $stmt->get_result();
}

// Check if there's a pending request between users
function checkPendingRequest($conn, $userId, $friendId) {
    $sql = "SELECT status, user_id FROM friendships 
            WHERE (user_id = ? AND friend_id = ?) 
            OR (user_id = ? AND friend_id = ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiii", $userId, $friendId, $friendId, $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return ['status' => $row['status'], 'sender_id' => $row['user_id']];
    }
    return null;
}

// Update this section
$friendshipStatus = null;
$requestSentByMe = false;
$isOwnProfile = false;

if (isset($_SESSION['user_id'])) {
    $currentUserId = $_SESSION['user_id'];
    $isOwnProfile = ($currentUserId == $userId);

    if (!$isOwnProfile) {
        $friendshipInfo = getFriendshipStatus($conn, $currentUserId, $userId);
        if ($friendshipInfo) {
            $friendshipStatus = $friendshipInfo['status'];
            $requestSentByMe = ($friendshipInfo['sender_id'] == $currentUserId);
        }
    }
}

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

        <?php if (isset($_SESSION['message'])): ?>
            <div class="alert alert-success" style="grid-column: 1 / -1;">
                <?php
                echo htmlspecialchars($_SESSION['message']);
                unset($_SESSION['message']);
                ?>
            </div>
        <?php endif; ?>

        <div class="profile-section">
            <h2>About</h2>
            <div class="profile-details">
                <p><strong>Email:</strong> <?php echo htmlspecialchars($userData['email']); ?></p>
                <p><strong>Total Rounds:</strong> <?php echo number_format($userData['RoundsCorrect'] + $userData['RoundsWrong']); ?></p>
                <p><strong>Correct Rounds:</strong> <?php echo number_format($userData['RoundsCorrect']); ?></p>
                <p><strong>Wrong Rounds:</strong> <?php echo number_format($userData['RoundsWrong']); ?></p>
            </div>
        </div>

        <div class="profile-section">
            <h2>Friends</h2>


            <?php
            if ($isOwnProfile && isset($_SESSION['user_id'])) {
                echo "<!-- Debug: User is viewing own profile -->\n";
                echo "<!-- Debug: Session user_id: " . $_SESSION['user_id'] . " -->\n";
            }
            ?>

            <?php if ($isOwnProfile && isset($_SESSION['user_id'])): ?>
                <?php
                // Get pending requests
                $pendingRequestsSql = "SELECT u.id, u.username, u.profilePic, f.status 
                          FROM users u 
                          JOIN friendships f ON u.id = f.user_id 
                          WHERE f.friend_id = ? AND f.status = 'pending'";
                $stmt = $conn->prepare($pendingRequestsSql);
                $stmt->bind_param("i", $_SESSION['user_id']);
                $stmt->execute();
                $pendingRequests = $stmt->get_result();
                $hasPendingRequests = $pendingRequests->num_rows > 0;
                ?>

                <div class="pending-requests-section <?php echo $hasPendingRequests ? 'has-requests' : ''; ?>"
                     id="pendingRequestsSection">
                    <h3>Pending Friend Requests</h3>
                    <div class="pending-requests" id="pendingRequestsList">
                        <?php if ($hasPendingRequests): ?>
                            <?php while ($request = $pendingRequests->fetch_assoc()): ?>
                                <div class="request-card" data-request-id="<?php echo $request['id']; ?>">
                                    <div class="user-info">
                                        <img src="../<?php echo htmlspecialchars($request['profilePic']); ?>"
                                             alt="<?php echo htmlspecialchars($request['username']); ?>'s profile"
                                             class="request-pic">
                                        <span class="request-name">
                                <a href="profile.php?id=<?php echo $request['id']; ?>">
                                    <?php echo htmlspecialchars($request['username']); ?>
                                </a>
                            </span>
                                    </div>
                                    <div class="request-actions">
                                        <form method="POST" class="inline-form">
                                            <input type="hidden" name="action" value="accept_request">
                                            <input type="hidden" name="friend_id" value="<?php echo $request['id']; ?>">
                                            <button type="submit" class="btn btn-success btn-sm">Accept</button>
                                        </form>
                                        <form method="POST" class="inline-form">
                                            <input type="hidden" name="action" value="reject_request">
                                            <input type="hidden" name="friend_id" value="<?php echo $request['id']; ?>">
                                            <button type="submit" class="btn btn-danger btn-sm">Reject</button>
                                        </form>
                                    </div>
                                </div>
                            <?php endwhile; ?>
                        <?php else: ?>
                            <p class="no-requests">No pending friend requests</p>
                        <?php endif; ?>
                    </div>
                </div>
                <?php $stmt->close(); ?>
            <?php endif; ?>

            <?php if (isset($_SESSION['user_id'])): ?>
                <div class="friend-search-section">
                    <h3>Find Friends</h3>
                    <div class="search-container">
                        <input type="text" id="friendSearch" class="friend-search-input"
                               placeholder="Search users by username..." autocomplete="off">
                        <div id="searchResults" class="search-results"></div>
                    </div>
                </div>
            <?php endif; ?>

            <?php if (!$isOwnProfile && isset($_SESSION['user_id'])): ?>
                <div class="friendship-actions">
                    <?php if ($friendshipStatus === null): ?>
                        <form method="POST">
                            <input type="hidden" name="action" value="send_request">
                            <button type="submit" class="btn btn-primary">Add Friend</button>
                        </form>
                    <?php elseif ($friendshipStatus === 'pending'): ?>
                        <?php if ($requestSentByMe): ?>
                            <div class="pending-status">Friend Request Sent</div>
                        <?php else: ?>
                            <form method="POST" class="inline-form">
                                <input type="hidden" name="action" value="accept_request">
                                <button type="submit" class="btn btn-success">Accept Request</button>
                            </form>
                            <form method="POST" class="inline-form">
                                <input type="hidden" name="action" value="reject_request">
                                <button type="submit" class="btn btn-danger">Reject Request</button>
                            </form>
                        <?php endif; ?>
                    <?php elseif ($friendshipStatus === 'accepted'): ?>
                        <form method="POST">
                            <input type="hidden" name="action" value="remove_friend">
                            <button type="submit" class="btn btn-danger">Remove Friend</button>
                        </form>
                    <?php endif; ?>
                </div>
            <?php endif; ?>


            <div class="friends-list">
                <?php
                // Replace stored procedure with direct query
                $friendsSql = "SELECT u.id, u.username, u.profilePic, u.points 
                              FROM users u 
                              JOIN friendships f ON (u.id = f.friend_id OR u.id = f.user_id)
                              WHERE (f.user_id = ? OR f.friend_id = ?) 
                              AND f.status = 'accepted'
                              AND u.id != ?";
                $stmt = $conn->prepare($friendsSql);
                $stmt->bind_param("iii", $userId, $userId, $userId);
                $stmt->execute();
                $friends = $stmt->get_result();

                if ($friends->num_rows > 0):
                    while ($friend = $friends->fetch_assoc()):
                        ?>
                        <div class="friend-card">
                            <img src="../<?php echo htmlspecialchars($friend['profilePic']); ?>"
                                 alt="<?php echo htmlspecialchars($friend['username']); ?>'s profile picture"
                                 class="friend-pic">
                            <div class="friend-info">
                                <a href="profile.php?id=<?php echo $friend['id']; ?>"
                                   class="friend-name"><?php echo htmlspecialchars($friend['username']); ?></a>
                                <span class="friend-points">Points: <?php echo number_format($friend['points']); ?></span>
                            </div>
                        </div>
                    <?php
                    endwhile;
                else:
                    ?>
                    <p class="no-friends">No friends yet</p>
                <?php
                endif;
                $stmt->close();
                ?>
            </div>
        </div> <!-- End of friends section -->

        <div class="profile-section">
            <h2>Predictions History</h2>
            <div class="predictions-list">
                <?php
                // Get user predictions
                $predictionsSql = "SELECT * FROM game_predictions WHERE user_id = ? ORDER BY prediction_time DESC";
                $stmt = $conn->prepare($predictionsSql);
                $stmt->bind_param("i", $userId);
                $stmt->execute();
                $predictions = $stmt->get_result();

                if ($predictions->num_rows > 0):
                    ?>
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Team Predicted</th>
                                <th>Points Wagered</th>
                                <th>Points Earned</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php while ($pred = $predictions->fetch_assoc()): ?>
                                <tr class="<?php echo $pred['points_earned'] >= 0 ? 'table-success' : 'table-danger'; ?>">
                                    <td><?php echo date('M j, Y', strtotime($pred['prediction_time'])); ?></td>
                                    <td><?php echo htmlspecialchars($pred['winner_name']); ?></td>
                                    <td><?php echo number_format($pred['points_wagered']); ?></td>
                                    <td><?php echo ($pred['points_earned'] >= 0 ? '+' : '') . number_format($pred['points_earned']); ?></td>
                                </tr>
                            <?php endwhile; ?>
                        </tbody>
                    </table>
                <?php else: ?>
                    <p class="no-predictions">No predictions made yet</p>
                <?php 
                endif;
                $stmt->close();
                ?>
            </div>
        </div>

    </div> <!-- End of profile-content -->
</div>

<script src="./src/profile.js"></script>
</body>
</html>

<?php
$conn->close();
?>