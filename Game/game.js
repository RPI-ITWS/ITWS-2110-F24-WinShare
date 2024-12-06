document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game_id');
    
    // Get user ID from data attribute
    const gameSummary = document.getElementById('game-summary');
    const userId = gameSummary.dataset.userId;

    if (!gameId) {
        console.error('Game ID is required');
        return;
    }

    fetch(`../php/fetchGameStatus.php?game_id=${gameId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('Game Summary:', data);
            displayGameSummary(data, userId);
        })
        .catch((error) => {
            console.error('Error fetching game summary:', error);
            document.getElementById('game-summary').innerHTML = 
                '<p>Error loading game summary. Please try again later.</p>';
        });
});

const teamEloScores = {
    '76ers': 1509.8949,
    'Blazers': 1495.2697,
    'Bucks': 1501.5102,
    'Bulls': 1508.048,
    'Cavaliers': 1504.5623,
    'Celtics': 1497.0135,
    'Clippers': 1487.0311,
    'Grizzlies': 1512.5353,
    'Hawks': 1493.8404,
    'Heat': 1503.6657,
    'Hornets': 1497.0017,
    'Jazz': 1495.2262,
    'Kings': 1492.2708,
    'Knicks': 1512.3603,
    'Lakers': 1515.5124,
    'Magic': 1503.275,
    'Mavericks': 1504.5808,
    'Nets': 1503.0356,
    'Nuggets': 1509.4212,
    'Pacers': 1504.7406,
    'Pelicans': 1492.1657,
    'Pistons': 1490.012,
    'Raptors': 1489.1503,
    'Rockets': 1488.9597,
    'Spurs': 1492.3143,
    'Suns': 1486.021,
    'Thunder': 1504.5864,
    'Timberwolves': 1514.038,
    'Warriors': 1498.3336,
    'Wizards': 1493.6232
};

// FORMULA: P(A wins) = 1 / (1 + 10^((RatingB - RatingA)/200))
function calculateWinProbability(teamAName, teamBName) {
    const teamA = teamAName.split(' ').pop();
    const teamB = teamBName.split(' ').pop();
    
    const ratingA = teamEloScores[teamA];
    const ratingB = teamEloScores[teamB];
    
    if (!ratingA || !ratingB) {
        console.error('Team not found:', !ratingA ? teamA : teamB);
        return null;
    }

    const exponent = (ratingB - ratingA) / 200;
    const expectedScore = 1 / (1 + Math.pow(10, exponent));
    
    return Math.round(expectedScore * 100);
}

function displayGameSummary(data, userId) {
    const container = document.getElementById('game-summary');
    if (!container) {
        console.error('Container with ID game-summary not found');
        return;
    }

    // Calculate win probabilities
    const homeWinProbability = calculateWinProbability(data.home.name, data.away.name);
    const awayWinProbability = 100 - homeWinProbability;

    fetch(`../php/checkPrediction.php?game_id=${data.id}&user_id=${userId}`)
        .then(response => response.text())
        .then(text => {
            let predictionData;
            try {
                predictionData = JSON.parse(text);
                if (predictionData.error) {
                    console.error('Prediction check error:', predictionData.error);
                }
            } catch (e) {
                console.error('Failed to parse JSON response:', text);
                throw new Error('Invalid JSON response');
            }
            
            const shouldShowPredictionForm = ['complete', 'closed'].includes(data.status) && 
                                        (!predictionData || !predictionData.hasPrediction);
            const shouldShowScores = !shouldShowPredictionForm;

            const homeTeamLogo = `../assets/Photos/teamLogo/${data.home.name.split(' ').pop().toLowerCase()}.png`;
            const awayTeamLogo = `../assets/Photos/teamLogo/${data.away.name.split(' ').pop().toLowerCase()}.png`;

            const gameInfo = `
                <div class="game-header">
                    <div class="status-badge status-${data.status.toLowerCase()}">${data.status}</div>
                    ${data.inseason_tournament ? '<div class="tournament-badge">In-Season Tournament Game</div>' : ''}
                    <p>${new Date(data.scheduled).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</p>
                </div>

                <div class="teams-container">
                    <div class="team-box">
                        <img class="team-logo" src="${homeTeamLogo}" alt="${data.home.name} logo">
                        <h2>${data.home.name}</h2>
                        <p class="team-market">${data.home.market}</p>
                        ${shouldShowScores ? 
                            `<div class="score" style="color: ${data.home.points > data.away.points ? '#28a745' : '#dc3545'}">${data.home.points}</div>` :
                            `<div class="score-placeholder">-</div>`
                        }
                        <div class="predictions-section">
                            <h4>Our Prediction</h4>
                            <div class="probability ${homeWinProbability > 50 ? 'favorable' : 'unfavorable'}">${homeWinProbability}%</div>
                        </div>
                    </div>
                    <div class="versus">VS</div>
                    <div class="team-box">
                        <img class="team-logo" src="${awayTeamLogo}" alt="${data.away.name} logo">
                        <h2>${data.away.name}</h2>
                        <p class="team-market">${data.away.market}</p>
                        ${shouldShowScores ? 
                            `<div class="score" style="color: ${data.away.points > data.home.points ? '#28a745' : '#dc3545'}">${data.away.points}</div>` :
                            `<div class="score-placeholder">-</div>`
                        }
                        <div class="predictions-section">
                            <h4>Our Prediction</h4>
                            <div class="probability ${awayWinProbability > 50 ? 'favorable' : 'unfavorable'}">${awayWinProbability}%</div>
                        </div>
                    </div>
                </div>`;

            const predictionSection = `
                <div class="prediction-section">
                    <h3>Game Prediction</h3>
                    ${predictionData && predictionData.hasPrediction ? `
                        <div class="existing-prediction">
                            <p class="${data.status === 'complete' || data.status === 'closed' ? 
                                (data.home.points > data.away.points && predictionData.prediction.winner_name === data.home.name) || 
                                (data.away.points > data.home.points && predictionData.prediction.winner_name === data.away.name) ? 
                                'correct-prediction' : 'incorrect-prediction' 
                                : ''
                            }">
                                Your prediction: ${predictionData.prediction.winner_name} will win
                                <br>Points wagered: ${predictionData.prediction.points_wagered}
                                ${predictionData.prediction.points_earned ? 
                                    `<br>Points earned: <span class="${predictionData.prediction.points_earned > 0 ? 'text-success' : 'text-danger'}">
                                        ${predictionData.prediction.points_earned > 0 ? '+' : ''}${predictionData.prediction.points_earned}
                                    </span><br>` 
                                    : ''
                                }
                                <span class="prediction-time">Made on: ${new Date(predictionData.prediction.prediction_time).toLocaleString()}</span>
                            </p>
                        </div>
                    ` : `
                        <div class="prediction-form">
                            <p>Who do you think will win?</p>
                            <div class="points-input">
                                <label for="points">Points to wager (min 1):</label>
                                <input type="number" id="points" min="1" value="1" step="1">
                            </div>
                            <div class="team-choices">
                                <button class="team-choice" data-team-id="${data.home.id}" data-team-name="${data.home.name}">
                                    <img src="${homeTeamLogo}" alt="${data.home.name}" class="choice-logo">
                                    <span>${data.home.name}</span>
                                </button>
                                <button class="team-choice" data-team-id="${data.away.id}" data-team-name="${data.away.name}">
                                    <img src="${awayTeamLogo}" alt="${data.away.name}" class="choice-logo">
                                    <span>${data.away.name}</span>
                                </button>
                            </div>
                        </div>
                    `}
                </div>
            `;

            const broadcastInfo = `
                <div class="broadcast-info">
                    <h3>Broadcast Information</h3>
                    <div class="broadcasts">
                        ${data.broadcasts.map(broadcast => `
                            <div class="broadcast-item">
                                <div>
                                    ${broadcast.network} (${broadcast.locale})
                                    ${broadcast.channel ? `- Channel ${broadcast.channel}` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            const venueInfo = `
                <div class="venue-info">
                    <h3>Venue Information</h3>
                    <div class="venue-details">
                        <div>
                            <p><strong>Venue:</strong> ${data.venue.name}</p>
                            <p><strong>Location:</strong> ${data.venue.city}, ${data.venue.state}</p>
                            <p><strong>Capacity:</strong> ${data.venue.capacity.toLocaleString()} seats</p>
                        </div>
                        <div>
                            <p><strong>Address:</strong></p>
                            <p>${data.venue.address}</p>
                            <p>${data.venue.city}, ${data.venue.state} ${data.venue.zip}</p>
                            <p>${data.venue.country}</p>
                        </div>
                    </div>
                </div>
            `;

            container.innerHTML = gameInfo + predictionSection + broadcastInfo + venueInfo;

            // Add team choice handlers for predictions
            if (!predictionData || !predictionData.hasPrediction) {
                const teamButtons = container.querySelectorAll('.team-choice');
                teamButtons.forEach(button => {
                    button.addEventListener('click', () => handleTeamChoice(button, data.id, userId, data.home.points, data.away.points));
                });
            }
        })
        .catch(error => {
            console.error('Error checking prediction:', error);
        });
}

function handleTeamChoice(button, gameId, userId, homeScore, awayScore) {
    const teamId = button.dataset.teamId;
    const teamName = button.dataset.teamName;
    const pointsInput = document.getElementById('points');
    const pointsWagered = Math.max(1, parseInt(pointsInput.value) || 1);

    const homeTeam = document.querySelector('.team-box:first-child h2')?.textContent;
    const awayTeam = document.querySelector('.team-box:last-child h2')?.textContent;

    if (!homeTeam || !awayTeam) {
        console.error('Team elements not found');
        return;
    }

    const actual_winner = homeScore > awayScore ? homeTeam : awayTeam;
    
    const systemProbabilities = {
        [homeTeam]: calculateWinProbability(homeTeam, awayTeam),
        [awayTeam]: calculateWinProbability(awayTeam, homeTeam)
    };

    fetch(`../php/submitPrediction.php?user_id=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            game_id: gameId,
            winner_id: teamId,
            winner_name: teamName,
            home_team: homeTeam,
            away_team: awayTeam,
            points_wagered: pointsWagered,
            system_probabilities: systemProbabilities,
            actual_winner: actual_winner,
            game_status: 'complete'
        })
    })
    .then(response => response.json())
    .then(result => {
        location.reload();
    })
    .catch(error => {
        console.error('Error submitting prediction:', error);
        alert('Failed to submit prediction');
    });
}
