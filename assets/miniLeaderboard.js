// Fetch the JSON data
fetch('./Leaderboard/src/leaderboard_data.json')
    .then(response => response.json())
    .then(data => {
        const leaderboardData = processLeaderboardData(data.leaderboard);
        populateMiniLeaderboard(leaderboardData.slice(0, 10)); // Display top 5 players
    })
    .catch(error => console.error('Error:', error));

// Process the leaderboard data: sort and add rankings
function processLeaderboardData(data) {
    const sortedData = data.sort((a, b) => b.score - a.score);
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
            score: entry.score
        };
    });
}

// Populate the mini leaderboard table
function populateMiniLeaderboard(data) {
    const tableBody = document.querySelector("#miniLeaderboard tbody");
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.rank}</td>
            <td>${entry.player}</td>
        `;
        tableBody.appendChild(row);
    });
}