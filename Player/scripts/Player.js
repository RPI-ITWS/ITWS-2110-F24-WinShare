function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const queryArray = queryString.split('&');

    queryArray.forEach((param) => {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
    });

    return params;
}

const params = getQueryParams();
const playerId = params.id;
const playerName = params.name;

if (playerId && playerName) {
    document.title = playerName;
    document.getElementById('player-name').textContent = playerName;

    fetch(`../php/fetchPlayerByID.php?playerId=${playerId}`)
        .then(response => response.json())
        .then(data => {
            displayPlayerInfo(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayPlayerInfo(data) {
    // Update player details
    const detailsHTML = `
        ${data.position || ''} | 
        ${data.team?.name || ''} | 
        Jersey #${data.jersey_number || ''}
    `;
    document.getElementById('player-details').textContent = detailsHTML;

    // Update player bio
    const bioHTML = `
        <div class="stat-item">
            <strong>Height:</strong> ${data.height ? Math.floor(data.height/12) + "'" + data.height%12 + '"' : 'N/A'}
        </div>
        <div class="stat-item">
            <strong>Weight:</strong> ${data.weight || 'N/A'} lbs
        </div>
        <div class="stat-item">
            <strong>Birth Date:</strong> ${new Date(data.birthdate).toLocaleDateString()}
        </div>
        <div class="stat-item">
            <strong>Birth Place:</strong> ${data.birth_place || 'N/A'}
        </div>
        <div class="stat-item">
            <strong>Experience:</strong> ${data.experience || '0'} years
        </div>
        <div class="stat-item">
            <strong>College:</strong> ${data.college || 'N/A'}
        </div>
    `;
    document.getElementById('player-bio').innerHTML = bioHTML;

    // Update draft info
    if (data.draft) {
        const draftHTML = `
            <div class="stat-item">
                <strong>Draft Year:</strong> ${data.draft.year}
            </div>
            <div class="stat-item">
                <strong>Draft Round:</strong> ${data.draft.round}
            </div>
            <div class="stat-item">
                <strong>Draft Pick:</strong> ${data.draft.pick}
            </div>
        `;
        document.getElementById('draft-details').innerHTML = draftHTML;
    }

    // Update season stats if available
    if (data.seasons) {
        const statsHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Season</th>
                        <th>Team</th>
                        <th>Games</th>
                        <th>PPG</th>
                        <th>RPG</th>
                        <th>APG</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.seasons.map(season => `
                        <tr>
                            <td>${season.year}</td>
                            <td>${season.team?.name || 'N/A'}</td>
                            <td>${season.games_played || 0}</td>
                            <td>${season.average?.points || '0.0'}</td>
                            <td>${season.average?.rebounds || '0.0'}</td>
                            <td>${season.average?.assists || '0.0'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        document.getElementById('season-stats').innerHTML = statsHTML;
    }

    PlayerStats.displayStats(data);
}
