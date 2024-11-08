let leaderboardData = [];
let currentSortBy = 'score';


// Fetch the JSON data
fetch('./src/get_leaderboard.php')
    .then(response => response.json())
    .then(data => {
        console.log('Received data:', data);
        leaderboardData = processLeaderboardData(data.users);
        populateLeaderboard(leaderboardData);
        setTimeout(() => animateScores(leaderboardData), 100);
        setupSortButtons();
    })
    .catch(error => console.error('Error:', error));

// Rest of the JavaScript code remains the same
function processLeaderboardData(data) {
    return data.map(entry => ({
        ...entry,
        winRate: (entry.RoundsCorrect / (entry.RoundsCorrect + entry.RoundsWrong)) * 100
    })).sort((a, b) => b.score - a.score)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));
}

// Populate the leaderboard table
function populateLeaderboard(data) {
    const tableBody = document.querySelector("#leaderboardTable tbody");
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td id="rank-num">${entry.rank}</td>
            <td>
                <img src="${entry.profilePic}" alt="${entry.player}'s profile" class="profile-pic">
                <span class="player-name">${entry.player}</span>
            </td>
            <td>
                <div class="score-container" data-score="${entry.score}">
                    <div class="score-wrapper"></div>
                </div>
            </td>
            <td>
                <div class="winrate-container" data-winrate="${entry.winRate.toFixed(2)}">
                    <div class="winrate-wrapper"></div>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Animate the scores and win rates with a cascading effect
function animateScores(data) {
    const baseDuration = 3000; // Base animation duration in milliseconds
    const delayBetweenScores = 200; // Delay between each score finishing
    const fps = 30; // Frames per second

    const maxScore = Math.max(...data.map(entry => entry.score));
    const maxWinRate = Math.max(...data.map(entry => entry.winRate));

    data.forEach((entry, index) => {
        animateValue(entry.score, maxScore, '.score-container', '.score-wrapper', index, baseDuration, delayBetweenScores, fps, false);
        animateValue(entry.winRate, maxWinRate, '.winrate-container', '.winrate-wrapper', index, baseDuration, delayBetweenScores, fps, true);
    });
}

function animateValue(value, maxValue, containerSelector, wrapperSelector, index, baseDuration, delayBetweenScores, fps, isPercentage) {
    const container = document.querySelectorAll(containerSelector)[index];
    const wrapper = container.querySelector(wrapperSelector);
    const duration = (value / maxValue) * baseDuration;
    const delay = (leaderboardData.length - index - 1) * delayBetweenScores;

    let currentValue = 0;
    const totalFrames = duration / 1000 * fps;
    let currentFrame = 0;

    function easeOutQuad(t) {
        return t * (2 - t);
    }

    function animateFrame() {
        currentFrame++;
        const progress = easeOutQuad(currentFrame / totalFrames);
        currentValue = value * progress;

        wrapper.innerHTML = `<span>${formatValue(currentValue, isPercentage)}</span>`;

        if (currentFrame < totalFrames) {
            requestAnimationFrame(animateFrame);
        } else {
            wrapper.innerHTML = `<span>${formatValue(value, isPercentage)}</span>`;
        }
    }

    setTimeout(() => {
        requestAnimationFrame(animateFrame);
    }, delay);
}

function formatValue(value, isPercentage) {
    if (isPercentage) {
        return value.toFixed(1) + '%';
    } else {
        return value.toLocaleString(undefined, {maximumFractionDigits: 0});
    }
}

function setupSortButtons() {
    const sortByScoreBtn = document.getElementById('sortByScore');
    const sortByWinRateBtn = document.getElementById('sortByWinRate');

    sortByScoreBtn.addEventListener('click', () => sortLeaderboard('score'));
    sortByWinRateBtn.addEventListener('click', () => sortLeaderboard('winRate'));
}

function sortLeaderboard(sortBy) {
    currentSortBy = sortBy;
    leaderboardData.sort((a, b) => b[sortBy] - a[sortBy]);
    leaderboardData.forEach((entry, index) => entry.rank = index + 1);
    populateLeaderboard(leaderboardData);
    animateScores(leaderboardData);

    // Update active button
    document.querySelectorAll('#sortButtons .btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`sortBy${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}`).classList.add('active');
}