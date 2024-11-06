// Teams.js

// Function to get query parameters from the URL
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

// Extract teamId and teamName from query parameters
const queryParams = getQueryParams();
const teamId = queryParams['teamId'];
const teamName = queryParams['teamName'];

// Set team name in the title and header if available
if (teamName) {
    document.title = teamName;
    document.getElementById('team-name').innerText = teamName;
}

// Fetch team data from the backend if teamId is present
if (teamId) {
    fetch(`fetchTeamByID.php?teamId=${teamId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => displayTeamInfo(data))
        .catch(error => {
            console.error("Error loading team data:", error);
            document.getElementById('team-info').innerText = "Failed to load team data.";
        });
} else {
    document.getElementById('team-info').innerText = "No team selected.";
}

// Function to display team information on the page
function displayTeamInfo(data) {
    document.getElementById('market').innerText = data.market || "N/A";
    document.getElementById('general-manager').innerText = data.general_manager || "N/A";
    document.getElementById('owner').innerText = data.owner || "N/A";

    const rosterList = document.getElementById('roster-list');
    rosterList.innerHTML = ''; // Clear any existing roster entries

    if (data.players && data.players.length > 0) {
        data.players.forEach(player => {
            const playerItem = document.createElement('li');
            playerItem.textContent = player.full_name;
            rosterList.appendChild(playerItem);
        });
    } else {
        rosterList.innerHTML = '<li>No players available</li>';
    }
}
