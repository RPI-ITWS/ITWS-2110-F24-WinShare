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

function displayGameSummary(data, userId) {
    const container = document.getElementById('game-summary');
    if (!container) {
        console.error('Container with ID game-summary not found');
        return;
    }

    // Check if user has made a prediction for completed games
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
                    <div class="status-badge status-${data.status.toLowerCase()}">${
               data.status
            }</div>
                    ${
                       data.inseason_tournament
                          ? '<div class="tournament-badge">In-Season Tournament Game</div>'
                          : ''
                    }
                    <p>${new Date(data.scheduled).toLocaleDateString('en-US', {
                       weekday: 'long',
                       year: 'numeric',
                       month: 'long',
                       day: 'numeric',
                       hour: '2-digit',
                       minute: '2-digit',
                    })}</p>
                </div>

                <div class="teams-container">
                <div class="team-box">
                    <img class="team-logo" src="${homeTeamLogo}" alt="${
                        data.home.name
                        } logo">
                    <h2>${data.home.name}</h2>
                    <p class="team-market">${data.home.market}</p>
                    ${
                    shouldShowScores
                        ? `<div class="score" style="color: ${
                            data.home.points > data.away.points ? '#28a745' : '#dc3545'
                            }">${data.home.points}</div>`
                        : `<div class="prediction-needed">Prediction required</div>`
                    }
                </div>
                <div class="versus">VS</div>
                <div class="team-box">
                    <img class="team-logo" src="${awayTeamLogo}" alt="${
                        data.away.name
                        } logo">
                    <h2>${data.away.name}</h2>
                    <p class="team-market">${data.away.market}</p>
                    ${
                    shouldShowScores
                        ? `<div class="score" style="color: ${
                            data.away.points > data.home.points ? '#28a745' : '#dc3545'
                            }">${data.away.points}</div>`
                        : `<div class="prediction-needed">Prediction required</div>`
                    }
                </div>
            </div>
            `;

            const predictionSection = `
                <div class="prediction-section">
                    <h3>Game Prediction</h3>
                    ${predictionData && predictionData.hasPrediction ? `
                        <div class="existing-prediction">
                            <p>Your prediction: ${predictionData.prediction.winner_name} will win</p>
                            <p class="prediction-time">Made on: ${new Date(predictionData.prediction.prediction_time).toLocaleString()}</p>
                        </div>
                    ` : `
                        <div class="prediction-form">
                            <p>Who do you think will win?</p>
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
                    button.addEventListener('click', () => handleTeamChoice(button, data.id, userId));
                });
            }
        })
        .catch(error => {
            console.error('Error checking prediction:', error);
        });
}

function handleTeamChoice(button, gameId, userId) {
    const teamId = button.dataset.teamId;
    const teamName = button.dataset.teamName;

    fetch(`../php/submitPrediction.php?user_id=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            game_id: gameId,
            winner_id: teamId,
            winner_name: teamName
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            location.reload();
        } else {
            alert(result.error || 'Failed to submit prediction');
        }
    })
    .catch(error => {
        console.error('Error submitting prediction:', error);
        alert('Failed to submit prediction');
    });
}
