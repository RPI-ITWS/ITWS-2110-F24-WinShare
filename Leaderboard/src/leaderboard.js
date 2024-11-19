let leaderboardData = [];
let currentSortBy = 'score';
let currentView = 'global'; // New variable to track current view

// Fetch leaderboard data based on current view
function fetchLeaderboardData() {
    const endpoint = currentView === 'global'
        ? './src/get_leaderboard.php'
        : './src/get_friends_leaderboard.php';

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            console.log('Received data:', data);
            leaderboardData = processLeaderboardData(data.users);
            populateLeaderboard(leaderboardData);
            setTimeout(() => animateScores(leaderboardData), 100);
        })
        .catch(error => console.error('Error:', error));
}

// Initial fetch
fetchLeaderboardData();

function processLeaderboardData(data) {
    return data.map(entry => ({
        ...entry,
        winRate: (entry.RoundsCorrect / (entry.RoundsCorrect + entry.RoundsWrong)) * 100 || 0
    })).sort((a, b) => b.score - a.score)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));
}

function populateLeaderboard(data) {
    const tableBody = document.querySelector("#leaderboardTable tbody");
    tableBody.innerHTML = '';

    if (data.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="4" class="text-center">
                ${currentView === 'friends' ? 'No friends found. Add some friends to see their rankings!' : 'No users found.'}
            </td>
        `;
        tableBody.appendChild(row);
        return;
    }

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

function setupButtons() {
    // Sort buttons
    const sortByScoreBtn = document.getElementById('sortByScore');
    const sortByWinRateBtn = document.getElementById('sortByWinRate');
    sortByScoreBtn.addEventListener('click', () => sortLeaderboard('score'));
    sortByWinRateBtn.addEventListener('click', () => sortLeaderboard('winRate'));

    // View toggle buttons
    const viewButtons = document.createElement('div');
    viewButtons.id = 'viewButtons';
    viewButtons.className = 'mb-3';
    viewButtons.innerHTML = `
        <button id="globalView" class="btn btn-primary active">Global</button>
        <button id="friendsView" class="btn btn-primary">Friends</button>
    `;
    document.getElementById('sortButtons').insertAdjacentElement('beforebegin', viewButtons);

    document.getElementById('globalView').addEventListener('click', () => switchView('global'));
    document.getElementById('friendsView').addEventListener('click', () => switchView('friends'));
}

function switchView(view) {
    currentView = view;
    document.querySelectorAll('#viewButtons .btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${view}View`).classList.add('active');
    fetchLeaderboardData();
}

function sortLeaderboard(sortBy) {
    currentSortBy = sortBy;
    leaderboardData.sort((a, b) => b[sortBy] - a[sortBy]);
    leaderboardData.forEach((entry, index) => entry.rank = index + 1);
    populateLeaderboard(leaderboardData);
    animateScores(leaderboardData);

    document.querySelectorAll('#sortButtons .btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`sortBy${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}`).classList.add('active');
}

// Animation functions remain the same
function animateScores(data) {
    const baseDuration = 3000;
    const delayBetweenScores = 200;
    const fps = 30;

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

// Initialize buttons when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupButtons();
});