// Fetch the JSON data
fetch('./src/leaderboard_data.json')
    .then(response => response.json())
    .then(data => {
        const leaderboardData = processLeaderboardData(data.leaderboard);
        populateLeaderboard(leaderboardData);
    })
    .catch(error => console.error('Error:', error));

// Process the leaderboard data: sort and add rankings
function processLeaderboardData(data) {
    // Sort the data by score in descending order
    const sortedData = data.sort((a, b) => b.score - a.score);

    // Add rankings
    let currentRank = 1;
    let previousScore = null;

    return sortedData.map((entry, index) => {
        if (entry.score !== previousScore) {
            currentRank = index + 1;
        }
        previousScore = entry.score;

        return {
            rank: currentRank,
            player: entry.player,
            score: entry.score,
            profilePic: `../assets/Photos/pfp1.png`
        };
    });
}

// Populate the leaderboard table
function populateLeaderboard(data) {
    const tableBody = document.querySelector("#leaderboardTable tbody");
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td id="rankings">${entry.rank}</td>
            <td>
            <img src="${entry.profilePic}" alt="${entry.player}'s profile" class="profile-pic">
                <span class="player-name">${entry.player}</span>
                
            </td>
            <td id="score">${entry.score}</td>
    `;
        tableBody.appendChild(row);
    });
}