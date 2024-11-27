// Keep track of leaderboard data
let miniLeaderboardData = [];

// Fetch leaderboard data from PHP endpoint
function fetchMiniLeaderboardData() {
    fetch('./Leaderboard/src/get_leaderboard.php')
        .then(response => response.json())
        .then(data => {
            console.log('Received mini leaderboard data:', data);
            miniLeaderboardData = processMiniLeaderboardData(data.users);
            populateMiniLeaderboard(miniLeaderboardData.slice(0, 10)); // Display top 10 players
        })
        .catch(error => console.error('Error:', error));
}

// Process the leaderboard data: sort by score and add rankings
function processMiniLeaderboardData(data) {
    return data.sort((a, b) => b.score - a.score)
        .map((entry, index) => ({
            rank: index + 1,
            player: entry.player,
            score: entry.score
        }));
}

// Populate the mini leaderboard table
function populateMiniLeaderboard(data) {
    const tableBody = document.querySelector("#miniLeaderboard tbody");
    tableBody.innerHTML = ''; // Clear existing rows

    if (data.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="2" class="text-center">No users found.</td>
        `;
        tableBody.appendChild(row);
        return;
    }

    data.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.rank}</td>
            <td>${entry.player}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Initial fetch
fetchMiniLeaderboardData();

// Optional: Add auto-refresh functionality
// Uncomment the following line if you want the mini leaderboard to update automatically
// setInterval(fetchMiniLeaderboardData, 60000); // Updates every minute