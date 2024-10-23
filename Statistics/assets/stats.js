const InputtedSearch = document.getElementById("PlayerSearch");
const SearchList = document.getElementById("PlayerOptions");
const FindPlayer = document.getElementById("FindPlayer");

document.addEventListener('DOMContentLoaded', function() {
    const statButton = document.getElementById('StatButton');
    const playerButton = document.getElementById('PlayerButton');
    const playerContent = document.getElementById('PlayerContent');
    const statContent = document.getElementById('StatContent');

    statButton.addEventListener('click', function() {
        playerContent.style.display = 'block';
        statContent.style.display = 'none';
    });

    playerButton.addEventListener('click', function() {
        playerContent.style.display = 'none';
        statContent.style.display = 'block';
    });
});

// Wait for input
InputtedSearch.addEventListener("input", function() {
    const searchTerm = InputtedSearch.value.toLowerCase();
    
    if (searchTerm === "" || searchTerm.length <= 1) {
        SearchList.style.display = 'none'; 
        FindPlayer.disabled = true;
        FindPlayer.style.backgroundColor = 'rgba(222, 255, 251, 0.841)';
        return; 
    }else if (searchTerm.length >= 2){
        const filteredPlayers = players.filter(function(player) {
            return player.toLowerCase().includes(searchTerm);
        });
    
        SearchList.innerHTML = "";
        filteredPlayers.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'player';
            playerDiv.textContent = player;
    
            playerDiv.onclick = function() {
                InputtedSearch.value = player;
                SearchList.style.display = 'none';
                FindPlayer.disabled = false;
                FindPlayer.style.backgroundColor = '#7DD8BA';
                FindPlayer.addEventListener('mouseover', function() {
                    FindPlayer.style.cursor = 'pointer'; 
                });
            };
    
            SearchList.appendChild(playerDiv);
        });
    
        SearchList.style.display = filteredPlayers.length ? 'block' : 'none';
    
        if (players.includes(InputtedSearch.value)) {
            FindPlayer.disabled = false;
            FindPlayer.style.backgroundColor = '#7DD8BA';
            FindPlayer.addEventListener('mouseover', function() {
                FindPlayer.style.cursor = 'pointer'; 
            });
        } else {
            FindPlayer.disabled = true;
            FindPlayer.style.backgroundColor = 'rgba(222, 255, 251, 0.841)';
            FindPlayer.addEventListener('mouseover', function() {
                FindPlayer.style.cursor = 'not-allowed'; 
            });
        }
    }


});

FindPlayer.addEventListener('mouseout', function() {
    FindPlayer.style.cursor = 'default'; 
});

// Close dropdown when clicking outside
document.addEventListener('click', function(exit) {
    if (!exit.target.closest('.container')) {
        SearchList.style.display = 'none';
    }
});

const players = [
    "Nikola Jokić", "LeBron James", "Stephen Curry", "Shai Gilgeous-Alexander", "Kevin Durant",
    "Jayson Tatum", "Anthony Edwards", "Joel Embiid", "Damian Lillard", "Jimmy Butler",
    "Luka Dončić", "Kawhi Leonard", "Ja Morant", "Donovan Mitchell", "Bam Adebayo",
    "Karl-Anthony Towns", "Jaren Jackson Jr.", "Draymond Green", "Zion Williamson", "LaMelo Ball",
    "Trae Young", "Chris Paul", "Bradley Beal", "Devin Booker", "Klay Thompson",
    "Kyrie Irving", "CJ McCollum", "DeMar DeRozan", "Mikal Bridges", "Jrue Holiday",
    "Tyrese Haliburton", "Nikola Vučević", "Pascal Siakam", "John Collins", "Michael Porter Jr.",
    "Darius Garland", "Jaden Ivey", "Franz Wagner", "Bojan Bogdanović", "Jalen Green",
    "Jonas Valančiūnas", "Collin Sexton", "OG Anunoby", "Jaren Jackson", "Derrick Rose",
    "Rudy Gobert", "Kyle Lowry", "Tobias Harris", "Robert Williams III", "Bobby Portis",
    "Victor Wembanyama", "Scoot Henderson", "Chet Holmgren", "Paolo Banchero", "Jabari Smith Jr.",
    "Evan Mobley", "Scottie Barnes", "Josh Giddey", "Tyler Herro", "RJ Barrett",
    "De'Aaron Fox", "Domantas Sabonis", "Brandon Ingram", "Zach LaVine", "Keldon Johnson",
    "Fred VanVleet", "Julius Randle", "Miles Bridges", "Desmond Bane", "Anfernee Simons",
    "Gary Trent Jr.", "Lonzo Ball", "D'Angelo Russell", "Markelle Fultz", "Patrick Williams",
    "Keegan Murray", "Cade Cunningham", "Jaden Ivey", "Jabari Smith Jr.", "Tyrese Maxey",
    "Bennedict Mathurin", "Shaedon Sharpe", "Cam Thomas", "Josh Hart", "Malcolm Brogdon",
    "Trey Murphy III", "Austin Reaves", "Grayson Allen", "Alperen Şengün", "Davion Mitchell",
    "Jordan Poole", "Jonathan Kuminga", "Moses Moody", "Kevon Looney", "Andrew Wiggins",
    "James Wiseman", "Jalen Duren", "Tari Eason", "Kenyon Martin Jr.", "Christian Wood",
    "Jeremy Sochan", "Walker Kessler", "Brook Lopez", "Bobby Portis", "Chris Duarte",
    "Jalen Johnson", "Onyeka Okongwu", "Mo Bamba", "Bol Bol", "Isaiah Stewart",
    "Marvin Bagley III", "Killian Hayes", "Herbert Jones", "Tre Mann", "Ayo Dosunmu",
    "Cam Reddish", "Dyson Daniels", "Talen Horton-Tucker", "Luguentz Dort", "Josh Richardson",
    "Aaron Gordon", "Bruce Brown", "Reggie Jackson", "Dennis Schröder", "Monte Morris",
    "Kelly Oubre Jr.", "PJ Washington", "Malik Beasley", "Malik Monk", "Terance Mann",
    "Rui Hachimura", "Deni Avdija", "Corey Kispert", "Daniel Gafford", "Saddiq Bey",
    "De'Andre Hunter", "Bogdan Bogdanović", "Dillon Brooks", "Steven Adams", "Isaac Okoro",
    "Coby White", "Wendell Carter Jr.", "Cole Anthony", "Mo Wagner", "Naz Reid",
    "Kyle Anderson", "Patrick Beverley", "Kris Dunn", "Santi Aldama", "Grayson Allen",
    "Tyus Jones", "Jalen Suggs", "Chris Boucher", "Precious Achiuwa", "Nick Richards",
    "Cody Martin", "Ziaire Williams", "Usman Garuba", "Jabari Walker", "Chuma Okeke",
    "Payton Pritchard", "Luke Kennard", "Svi Mykhailiuk", "Isaiah Hartenstein", "Jericho Sims",
    "Nassir Little", "Drew Eubanks", "Xavier Tillman", "Naz Reid", "Sandro Mamukelashvili",
    "Jalen Williams", "Isaiah Jackson", "Justin Holiday", "Gabe Vincent", "Caleb Martin",
    "Max Strus", "Duncan Robinson", "JaVale McGee", "Zeke Nnaji", "Jevon Carter",
    "Ty Jerome", "Thanasis Antetokounmpo", "Delon Wright", "Jordan Clarkson", "Brandon Clarke",
    "Al Horford", "Trent Forrest", "Jaylen Nowell", "David Roddy", "Jock Landale",
    "Paul Reed", "Peyton Watson", "Aleksej Pokuševski", "Isaiah Joe", "Bol Bol",
    "Chet Holmgren", "Victor Wembanyama", "Jabari Smith Jr.", "Paolo Banchero", "Walker Kessler"
];
