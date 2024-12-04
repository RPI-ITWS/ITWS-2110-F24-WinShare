// Function to fetch friends and their recent predictions
async function fetchFriendsAndPredictions() {
    try {
        const response = await fetch('./src/getFriendPredictions.php');
        if (!response.ok) {
            const data = await response.json();
            if (response.status === 401) {
                displayLoginMessage();
                return;
            }
            throw new Error(data.message || 'Unknown error occurred');
        }
        const data = await response.json();
        if (data.success) {
            displayFriendsAndPredictions(data.friends);
        } else {
            throw new Error(data.error || 'Unknown error occurred');
        }
    } catch (error) {
        console.error('Error fetching friends and predictions:', error);
        document.getElementById('friends-list').innerHTML =
            '<div class="error-message">Failed to load friends and predictions.</div>';
    }
}

// Function to display login message
function displayLoginMessage() {
    const friendsList = document.getElementById('friends-list');
    friendsList.innerHTML = `
        <div class="login-message">
            <p>Please log in to view friends and predictions.</p>
            <a href="../Auth/Login/login.php" class="login-button">Go to Login</a>
        </div>
    `;
}

// Function to display friends and their predictions
function displayFriendsAndPredictions(friends) {
    const friendsList = document.getElementById('friends-list');
    const template = document.getElementById('friend-prediction-template');
    friendsList.innerHTML = '';

    if (!friends || friends.length === 0) {
        friendsList.innerHTML = '<div class="no-friends">No friends found</div>';
        return;
    }

    friends.forEach(friend => {
        const friendSection = template.content.cloneNode(true);

        // Set friend name and total points
        const friendNameElement = friendSection.querySelector('.friend-name');
        friendNameElement.textContent = friend.player;

        // Add click event and cursor style to friend name
        friendNameElement.style.cursor = 'pointer';
        friendNameElement.addEventListener('click', () => {
            window.location.href = `../profile/profile.php?id=${friend.id}`;
        });

        friendSection.querySelector('.total-points').textContent =
            `Total Points: ${friend.total_points}`;

        // Add predictions
        const predictionsList = friendSection.querySelector('.predictions-list');
        if (friend.predictions && friend.predictions.length > 0) {
            friend.predictions.forEach(prediction => {
                const predictionItem = document.createElement('div');
                predictionItem.className = 'prediction-item';

                const gameInfo = document.createElement('div');
                gameInfo.className = 'game-info';
                gameInfo.innerHTML = `
                    <span class="team ${prediction.prediction === prediction.home_team ? 'predicted' : ''}">${prediction.home_team}</span>
                    vs
                    <span class="team ${prediction.prediction === prediction.away_team ? 'predicted' : ''}">${prediction.away_team}</span>
                `;

                const pointsInfo = document.createElement('div');
                pointsInfo.className = 'points-info';
                pointsInfo.innerHTML = `
                    <span class="points-wagered">Wagered: ${prediction.points_wagered}</span>
                    <span class="prediction-points ${prediction.points > 0 ? 'points-gained' : 'points-lost'}">
                        ${prediction.points > 0 ? '+' : ''}${prediction.points}
                    </span>
                `;

                predictionItem.appendChild(gameInfo);
                predictionItem.appendChild(pointsInfo);
                predictionsList.appendChild(predictionItem);
            });
        } else {
            predictionsList.innerHTML = '<div class="no-predictions">No recent predictions</div>';
        }

        friendsList.appendChild(friendSection);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', fetchFriendsAndPredictions);