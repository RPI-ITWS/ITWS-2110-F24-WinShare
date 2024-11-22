document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game_id');

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
            displayGameSummary(data);
        })
        .catch((error) => {
            console.error('Error fetching game summary:', error);
            document.getElementById('game-summary').innerHTML = 
                '<p>Error loading game summary. Please try again later.</p>';
        });
});

function displayGameSummary(data) {
    const container = document.getElementById('game-summary');
    if (!container) {
        console.error('Container with ID game-summary not found');
        return;
    }

    const homeTeamLogo = `../assets/Photos/teamLogo/${data.home.name.split(' ').pop().toLowerCase()}.png`;
    const awayTeamLogo = `../assets/Photos/teamLogo/${data.away.name.split(' ').pop().toLowerCase()}.png`;

    const broadcastLinks = {
        'ESPN': 'https://www.espn.com/watch/',
        'NBA TV': 'https://www.nba.com/watch',
        'TNT': 'https://www.tntdrama.com/watchtnt',
        'NBCS': 'https://www.nbcsports.com/live',
        'YES': 'https://www.yeenetwork.com/live',
        'MSG': 'https://www.msggo.com/',
        'NBCS-BA': 'https://www.nbcsports.com/bayarea/live',
        'NBCS-BOS': 'https://www.nbcsports.com/boston/live',
        'NBCS-CA': 'https://www.nbcsports.com/california/live',
        'NBCS-CHI': 'https://www.nbcsports.com/chicago/live',
        'NBCS-PH': 'https://www.nbcsports.com/philadelphia/live',
        'SportsNet': 'https://www.snnow.ca/live',
        'TSN': 'https://www.tsn.ca/live',
        'FDSN': 'https://www.foxsports.com/live',
        'BSSC': 'https://www.ballysports.com/socal/live',
        'BSSW': 'https://www.ballysports.com/southwest/live',
        'ALT': 'https://www.altitudesports.com/watch-live',
        // Regional Fox Sports networks
        'FDSSE': 'https://www.foxsports.com/south',
        'FDSOH': 'https://www.foxsports.com/ohio',
        'FDSFL': 'https://www.foxsports.com/florida',
        'FDSWI': 'https://www.foxsports.com/wisconsin',
        'FDSDET': 'https://www.foxsports.com/detroit',
        'FDSSUN': 'https://www.foxsports.com/sun',
        // Default case
        'default': 'https://www.nba.com/watch'
    };

    const getBroadcastLink = (network) => {
        // First try exact match
        if (broadcastLinks[network]) {
            return broadcastLinks[network];
        }
        
        // Then try partial matches
        for (const [key, url] of Object.entries(broadcastLinks)) {
            if (network.toUpperCase().includes(key)) {
                return url;
            }
        }
        
        // Return default NBA.com link if no match found
        return broadcastLinks['default'];
    };

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
                <div class="score">${data.status === 'scheduled' ? '_' : data.home.points}</div>
            </div>
            <div class="versus">VS</div>
            <div class="team-box">
                <img class="team-logo" src="${awayTeamLogo}" alt="${data.away.name} logo">
                <h2>${data.away.name}</h2>
                <p class="team-market">${data.away.market}</p>
                <div class="score">${data.status === 'scheduled' ? '_' : data.away.points}</div>
            </div>
        </div>

        <div class="broadcast-info">
            <h3>Broadcast Information</h3>
            <div class="broadcasts">
                ${data.broadcasts.map(broadcast => `
                    <div class="broadcast-item">
                        <a href="${getBroadcastLink(broadcast.network)}" target="_blank" rel="noopener noreferrer">
                            ${broadcast.network} (${broadcast.locale})
                            ${broadcast.channel ? `- Channel ${broadcast.channel}` : ''}
                        </a>
                    </div>
                `).join('')}
            </div>
        </div>

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
    
    container.innerHTML = gameInfo;
}
