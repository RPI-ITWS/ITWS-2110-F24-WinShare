let Clicks = 0;

function displayMore() {
    const bar = document.getElementById('DropdownBar');
    const content = document.getElementById('Sponsors');
    if (Clicks === 0) {
        Clicks++;
        bar.style.display = 'block';
        content.style.display = 'none';
    } else {
        Clicks--;
        bar.style.display = 'none';
        content.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('../php/fetchTodaySchedule.php')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('Raw NBA Daily Schedule:', data);

            if (!data.today || !data.tomorrow || !data.yesterday) {
                console.error('Missing data in response:', data);
                return;
            }

            const upcomingGamesToday = filterGames(data.today.games, [
                'scheduled', 'created', 'inprogress', 'halftime',
            ]) || [];
            const completedGamesToday = filterGames(data.today.games, [
                'complete', 'closed',
            ]) || [];
            const upcomingGamesTomorrow = filterGames(data.tomorrow.games, [
                'scheduled', 'created', 'inprogress', 'halftime',
            ]) || [];
            const completedGamesTomorrow = filterGames(data.tomorrow.games, [
                'complete', 'closed',
            ]) || [];
            const completedGamesYesterday = filterGames(data.yesterday.games, [
                'complete', 'closed',
            ]) || [];

            console.log('Filtered games:', {
                upcomingGamesToday,
                completedGamesToday,
                upcomingGamesTomorrow,
                completedGamesTomorrow,
                completedGamesYesterday
            });
            console.log(completedGamesYesterday);
            displayGames(completedGamesTomorrow, 'Recent_Results');
            displayGames(completedGamesToday, 'Recent_Results');
            displayGames(completedGamesYesterday, 'Recent_Results');
        })
        .catch((error) => {
            console.error('Error fetching NBA schedule:', error);
            document.getElementById('Upcoming_Matches').innerHTML =
                '<p>Error loading games. Please try again later.</p>';
            document.getElementById('Recent_Results').innerHTML =
                '<p>Error loading games. Please try again later.</p>';
        });
});

function filterGames(games, statuses) {
    if (!games || !Array.isArray(games)) {
        console.warn('Invalid games data:', games);
        return [];
    }
    return games.filter((game) => statuses.includes(game.status));
}


function formatTimeDifference(milliseconds) {
    const totalMinutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (totalMinutes < 60) {
        return `${minutes}m`;
    } else {
        return `${hours}h ${minutes}m`;
    }
}

function displayGames(games, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID ${containerId} not found`);
        return;
    }

    games.forEach((game) => {
        const gameElement = document.createElement('div');
        gameElement.className = 'game-card';
        gameElement.dataset.gameId = game.id;
        gameElement.style.cursor = 'pointer';

        const startTime = new Date(game.scheduled);
        const now = new Date();
        const timeAgo = now - startTime;
        const timeAgoString = formatTimeDifference(timeAgo) + ' ago';

        const homeTeamLogo = `../assets/Photos/teamLogo/${game.home.name
            .split(' ')
            .pop()
            .toLowerCase()}.png`;
        const awayTeamLogo = `../assets/Photos/teamLogo/${game.away.name
            .split(' ')
            .pop()
            .toLowerCase()}.png`;

        if (['complete', 'closed'].includes(game.status)) {
            gameElement.innerHTML = `
                <div class="game-info">
                    <img class="team-logo" src="${homeTeamLogo}" alt="${game.home.name} logo" onclick="navigateToTeamPage('${game.home.name}', '${game.home.id}')">
                    <div class="game-details">
                        <div class="score-display">XXX VS XXX</div>
                        <div class="time-display">${timeAgoString}</div>
                    </div>
                    <img class="team-logo" src="${awayTeamLogo}" alt="${game.away.name} logo" onclick="navigateToTeamPage('${game.away.name}', '${game.away.id}')">
                </div>
            `;
        }
        container.appendChild(gameElement);

        gameElement.addEventListener('click', function (event) {
            window.location.href = `/ITWS-2110-F24-WinShare/Game/game.php?game_id=${game.id}`;
        });
    });
}