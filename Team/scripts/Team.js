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

const queryParams = getQueryParams();
const teamName = queryParams['teamName'];
const teamId = queryParams['id'];

if (teamName && teamId) {
   document.title = teamName;
   document.getElementById('team-name').innerText = teamName;
      const teamNameParts = teamName.split(" ");
      const logoFileName = teamNameParts[teamNameParts.length - 1].toLowerCase() + ".png";
      const logoPath = `../assets/Photos/teamLogo/${logoFileName}`;
      
      const logoImg = document.getElementById('logoPath');
      logoImg.src = logoPath;
      logoImg.alt = `${teamName} Logo`;

   fetch(`../php/fetchTeamByID.php?teamId=${teamId}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            displayTeamInfo(data);
        });

   fetch(`../php/fetchTeamGames.php?teamId=${teamId}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                displayRecentResults(data.games);
                console.log(data);
            }
        })
        .catch(error => console.error('Error fetching games:', error));
} else {
   document.title = 'No team specified';
}

function displayTeamInfo(data) {
   document.getElementById('alias').innerText = data.alias;
   document.getElementById('GM').innerText =
      ' General Manager: ' + data.general_manager;
   document.getElementById('Owner').innerText = ' Owner: ' + data.owner;
   document.getElementById('market').innerText = data.market;

   const coachesSection = document.querySelector('.current-coaches');
   coachesSection.innerHTML = `<h2>Current Coaches (${data.coaches.length})</h2>`;

   data.coaches.forEach((coach) => {
      const coachCard = document.createElement('div');
      coachCard.className = 'coach-card';

      const coachImage = document.createElement('img');
      coachImage.src = '../assets/Photos/default.png';
      coachImage.alt = `${coach.full_name}`;

      const coachName = document.createElement('p');
      coachName.textContent = `${coach.first_name} ${coach.last_name}`;

      coachCard.appendChild(coachImage);
      coachCard.appendChild(coachName);
      coachesSection.appendChild(coachCard);
   });

   const rosterSection = document.querySelector('.current-roster');
   rosterSection.innerHTML = `<h2>Current Roster (${data.players.length})</h2>`;

   data.players.forEach((player) => {
      const playerCard = document.createElement('div');
      playerCard.className = 'player-card';
      playerCard.onclick = () => {
         window.location.href = `../Player/Player.php?id=${player.id}&name=${encodeURIComponent(player.full_name)}`;
      };

      playerCard.style.cursor = 'pointer';

      const playerImage = document.createElement('img');
      playerImage.src = '../assets/Photos/default.png';
      playerImage.alt = `${player.full_name}`;

      const playerName = document.createElement('p');
      playerName.textContent = `${player.first_name} ${player.last_name}`;

      playerCard.appendChild(playerImage);
      playerCard.appendChild(playerName);
      rosterSection.appendChild(playerCard);
   });
}

function displayRecentResults(games) {
    const recentResultsSection = document.querySelector('.recent-results');
    const resultsContainer = recentResultsSection.querySelector('.results-container');
    const toggleButton = document.getElementById('toggleResults');
    
    resultsContainer.innerHTML = '';
    let isExpanded = false;
    const initialDisplay = 5;

    let wins = 0;
    let losses = 0;
    games.forEach(game => {
        const isHomeTeam = game.home_team_id === teamId;
        const isWin = isHomeTeam ? 
            game.home_team_score > game.away_team_score :
            game.away_team_score > game.home_team_score;
        if (isWin) wins++; else losses++;
    });

    const sectionTitle = recentResultsSection.querySelector('h2');
    sectionTitle.innerHTML = `Past Results <span style="color: #666; font-size: 0.8em;">(Wins: ${wins} - Losses: ${losses})</span>`;

    function renderResults(count) {
        resultsContainer.innerHTML = ''; 
        const displayGames = count ? games.slice(0, count) : games;

        displayGames.forEach(game => {
            const isHomeTeam = game.home_team_id === teamId;
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';

            const gameDate = new Date(game.game_date);
            const formattedDate = gameDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            const homeTeamLogo = `../assets/Photos/teamLogo/${game.home_team_name.split(' ').pop().toLowerCase()}.png`;
            const awayTeamLogo = `../assets/Photos/teamLogo/${game.away_team_name.split(' ').pop().toLowerCase()}.png`;

            resultDiv.innerHTML = `
                <span>${formattedDate}</span>
                <img src="${homeTeamLogo}" alt="${game.home_team_name}" onclick="window.location.href='Team.php?teamName=${encodeURIComponent(game.home_team_name)}&id=${game.home_team_id}'" style="cursor: pointer;">
                <span>${game.home_team_score} : ${game.away_team_score}</span>
                <img src="${awayTeamLogo}" alt="${game.away_team_name}" onclick="window.location.href='Team.php?teamName=${encodeURIComponent(game.away_team_name)}&id=${game.away_team_id}'" style="cursor: pointer;">
            `;

            if (isHomeTeam) {
                if (game.home_team_score > game.away_team_score) {
                    resultDiv.classList.add('win');
                } else {
                    resultDiv.classList.add('loss');
                }
            } else {
                if (game.away_team_score > game.home_team_score) {
                    resultDiv.classList.add('win');
                } else {
                    resultDiv.classList.add('loss');
                }
            }

            resultsContainer.appendChild(resultDiv);
        });
    }

    renderResults(initialDisplay);

    if (games.length > initialDisplay) {
        toggleButton.style.display = 'block';
        
        toggleButton.addEventListener('click', () => {
            isExpanded = !isExpanded;
            renderResults(isExpanded ? null : initialDisplay);
            toggleButton.textContent = isExpanded ? 'Show Less' : 'View More';
        });
    } else {
        toggleButton.style.display = 'none';
    }
}

function loadUpcomingMatches() {
    fetch('../php/fetchTodaySchedule.php')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('upcoming-matches-container');
            container.className = 'matches-container';
            container.innerHTML = '';
            
            const todayGames = data.today ? Object.values(data.today.games) : [];
            const tomorrowGames = data.tomorrow ? Object.values(data.tomorrow.games) : [];
            const allMatches = [...todayGames, ...tomorrowGames];
            
            const now = new Date();
            const upcomingMatches = allMatches.filter(match => 
                new Date(match.scheduled) > now && 
                (match.home.id === teamId || match.away.id === teamId)
            );
            
            const initialDisplay = 5;
            let isExpanded = false;

            function renderMatches(count) {
                container.innerHTML = '';
                const displayMatches = count ? upcomingMatches.slice(0, count) : upcomingMatches;

                if (displayMatches.length === 0) {
                    container.innerHTML = '<p>No upcoming matches scheduled.</p>';
                    return;
                }

                displayMatches.forEach(match => {
                    const matchTime = new Date(match.scheduled);
                    const matchDiv = document.createElement('div');
                    matchDiv.className = 'match';
                    
                    const team1Logo = match.home.name.split(' ').pop().toLowerCase() + '.png';
                    const team2Logo = match.away.name.split(' ').pop().toLowerCase() + '.png';
                    
                    matchDiv.innerHTML = `
                        <span>${match.tournament_name || 'Upcoming Match'}</span>
                        <img src="../assets/Photos/teamLogo/${team1Logo}" alt="${match.home.name}" onclick="window.location.href='Team.php?teamName=${encodeURIComponent(match.home.name)}&id=${match.home.id}'" style="cursor: pointer;">
                        <span>vs</span>
                        <img src="../assets/Photos/teamLogo/${team2Logo}" alt="${match.away.name}" onclick="window.location.href='Team.php?teamName=${encodeURIComponent(match.away.name)}&id=${match.away.id}'" style="cursor: pointer;">
                        <span class="time-until">${formatTimeUntil(match.scheduled)}</span>
                    `;
                    
                    container.appendChild(matchDiv);
                });
            }

            renderMatches(initialDisplay);

            const toggleButton = document.createElement('button');
            toggleButton.id = 'toggleMatches';
            toggleButton.className = 'toggle-matches-btn';
            toggleButton.textContent = 'View More';

            if (upcomingMatches.length > initialDisplay) {
                toggleButton.style.display = 'block';
                container.parentElement.appendChild(toggleButton);
                
                toggleButton.addEventListener('click', () => {
                    isExpanded = !isExpanded;
                    renderMatches(isExpanded ? null : initialDisplay);
                    toggleButton.textContent = isExpanded ? 'Show Less' : 'View More';
                });
            }
        })
        .catch(error => {
            console.error('Error loading matches:', error);
        });
}

function formatTimeUntil(startTime) {
    const diff = new Date(startTime) - new Date();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours >= 24) {
        const days = Math.floor(hours / 24);
        return `${days}d ${hours % 24}h`;
    }
    return `${hours}h ${minutes}m`;
}

document.addEventListener('DOMContentLoaded', loadUpcomingMatches);
