
function calculateSeasonStats(season) {
    const stats = season.teams[0].average;
    return {
        year: season.year,
        type: season.type,
        gamesPlayed: season.teams[0].total.games_played,
        ppg: stats.points || 0,
        rpg: stats.rebounds || 0,
        apg: stats.assists || 0,
        spg: stats.steals || 0,
        bpg: stats.blocks || 0,
        mpg: stats.minutes || 0,
        fgPercent: (season.teams[0].total.field_goals_pct * 100).toFixed(1) || 0,
        threePtPercent: (season.teams[0].total.three_points_pct * 100).toFixed(1) || 0,
        ftPercent: (season.teams[0].total.free_throws_pct * 100).toFixed(1) || 0,
        turnovers: stats.turnovers || 0,
        plusMinus: season.teams[0].total.plus - season.teams[0].total.minus || 0
    };
}

function calculateCareerStats(seasons) {
    const regularSeasons = seasons.filter(s => s.type === 'REG');
    const totals = regularSeasons.reduce((acc, season) => {
        const total = season.teams[0].total;
        acc.games += total.games_played;
        acc.points += total.points;
        acc.rebounds += total.rebounds;
        acc.assists += total.assists;
        acc.steals += total.steals;
        acc.blocks += total.blocks;
        acc.minutes += total.minutes;
        acc.fgMade += total.field_goals_made;
        acc.fgAttempts += total.field_goals_att;
        acc.threePtMade += total.three_points_made;
        acc.threePtAttempts += total.three_points_att;
        acc.ftMade += total.free_throws_made;
        acc.ftAttempts += total.free_throws_att;
        acc.turnovers += total.turnovers;
        acc.plusMinus += (total.plus - total.minus);
        return acc;
    }, {
        games: 0, points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
        minutes: 0, fgMade: 0, fgAttempts: 0, threePtMade: 0, threePtAttempts: 0,
        ftMade: 0, ftAttempts: 0, turnovers: 0, plusMinus: 0
    });

    return {
        gamesPlayed: totals.games,
        ppg: (totals.points / totals.games).toFixed(1),
        rpg: (totals.rebounds / totals.games).toFixed(1),
        apg: (totals.assists / totals.games).toFixed(1),
        spg: (totals.steals / totals.games).toFixed(1),
        bpg: (totals.blocks / totals.games).toFixed(1),
        mpg: (totals.minutes / totals.games).toFixed(1),
        fgPercent: ((totals.fgMade / totals.fgAttempts) * 100).toFixed(1),
        threePtPercent: ((totals.threePtMade / totals.threePtAttempts) * 100).toFixed(1),
        ftPercent: ((totals.ftMade / totals.ftAttempts) * 100).toFixed(1),
        turnovers: (totals.turnovers / totals.games).toFixed(1),
        plusMinus: totals.plusMinus,
        totalPoints: totals.points
    };
}

function displayStats(data) {
    // Calculate stats for each season
    const seasonStats = data.seasons
        .filter(s => s.type === 'REG' || s.type === 'PST')
        .map(calculateSeasonStats)
        .sort((a, b) => b.year - a.year);

    const careerStats = calculateCareerStats(data.seasons);

    const statsSection = document.getElementById('season-stats');
    const statsHTML = `
        <div class="career-stats">
            <h3>Career Statistics</h3>
            <div class="stats-grid">
                <div class="stat-item">
                    <label>Games</label>
                    <span>${careerStats.gamesPlayed}</span>
                </div>
                <div class="stat-item">
                    <label>PPG</label>
                    <span>${careerStats.ppg}</span>
                </div>
                <div class="stat-item">
                    <label>RPG</label>
                    <span>${careerStats.rpg}</span>
                </div>
                <div class="stat-item">
                    <label>APG</label>
                    <span>${careerStats.apg}</span>
                </div>
                <div class="stat-item">
                    <label>Total Points</label>
                    <span>${careerStats.totalPoints}</span>
                </div>
            </div>
        </div>
        <div class="season-stats">
            <h3>Season Statistics</h3>
            <table>
                <thead>
                    <tr>
                        <th>Season</th>
                        <th>Type</th>
                        <th>GP</th>
                        <th>PPG</th>
                        <th>RPG</th>
                        <th>APG</th>
                        <th>FG%</th>
                        <th>3P%</th>
                        <th>FT%</th>
                        <th>+/-</th>
                    </tr>
                </thead>
                <tbody>
                    ${seasonStats.map(season => `
                        <tr>
                            <td>${season.year}</td>
                            <td>${season.type}</td>
                            <td>${season.gamesPlayed}</td>
                            <td>${season.ppg.toFixed(1)}</td>
                            <td>${season.rpg.toFixed(1)}</td>
                            <td>${season.apg.toFixed(1)}</td>
                            <td>${season.fgPercent}%</td>
                            <td>${season.threePtPercent}%</td>
                            <td>${season.ftPercent}%</td>
                            <td>${season.plusMinus}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    statsSection.innerHTML = statsHTML;
}

window.PlayerStats = {
    calculateSeasonStats,
    calculateCareerStats,
    displayStats
};
