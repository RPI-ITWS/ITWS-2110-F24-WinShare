const InputtedSearch = document.getElementById("PlayerSearch");
const SearchList = document.getElementById("PlayerOptions");
const FindPlayer = document.getElementById("FindPlayer");
FindPlayer.disabled = true;

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
        FindPlayer.style.backgroundColor = '#7a7f86';
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
                FindPlayer.style.backgroundColor = '#00aaff';
                FindPlayer.addEventListener('mouseover', function() {
                    FindPlayer.style.cursor = 'pointer'; 
                });
            };
    
            SearchList.appendChild(playerDiv);
        });
    
        SearchList.style.display = filteredPlayers.length ? 'block' : 'none';
    
        if (players.includes(InputtedSearch.value.toLowerCase()) || lowerplayers.includes(InputtedSearch.value.toLowerCase())) {
            FindPlayer.disabled = false;
            FindPlayer.style.backgroundColor = '#00aaff';
            FindPlayer.style.color = 'black';
            FindPlayer.addEventListener('mouseover', function() {
                FindPlayer.style.cursor = 'pointer';
            });
        } else {
            FindPlayer.disabled = true;
            FindPlayer.style.backgroundColor = '#7a7f86';
            FindPlayer.style.color = 'black';
            FindPlayer.addEventListener('mouseover', function() {
                FindPlayer.style.cursor = 'not-allowed';
            });
        }
    }

});

FindPlayer.addEventListener('mouseover', function() {
    if(FindPlayer.disabled){
        FindPlayer.style.cursor = 'not-allowed';
        
    }else{
        FindPlayer.style.cursor = 'pointer';
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

function FindPlayerStats(){
    const query = document.getElementById('PlayerSearch').value;
    
    if(!lowerplayers.includes(query.toLowerCase()) ||  !query.trim()){
        alert("Player not found!");
        return;
    }

    fetch("./assets/PlayerStats.json")
        .then(response => {
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(player => {
            const playerName = players[lowerplayers.indexOf(query.toLowerCase())]; // Player's name
            
            const teamName = player[query.toLowerCase()].team_name;
            const teamMarket = player[query.toLowerCase()].market;
            const team = `${teamMarket} ${teamName}`;
            
            const displayName = document.getElementById("name");
            displayName.textContent = playerName;

            const displayTeam = document.getElementById("position");
            displayTeam.textContent = team;
    
            

        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
        document.getElementById("PlayerSearch").value = "";
        FindPlayer.style.cursor = 'not-allowed';
        FindPlayer.disabled = true;
        FindPlayer.style.backgroundColor = '#7a7f86';
    return;
}

const players = [
    "Brandon Clarke", "Desmond Bane", "Ja Morant", "Jaren Jackson Jr.", "Luke Kennard",
    "Santi Aldama", "De'Aaron Fox", "DeMar DeRozan", "Domantas Sabonis", "Keegan Murray",
    "Malik Monk", "Aaron Gordon", "Michael Porter Jr.", "Nikola Jokic", "Peyton Watson",
    "Zeke Nnaji", "Al Horford", "Jayson Tatum", "Jrue Holiday", "Payton Pritchard",
    "Bobby Portis", "Brook Lopez", "Damian Lillard", "Delon Wright", "Gary Trent Jr.",
    "Corey Kispert", "Jonas Valanciunas", "Jordan Poole", "Malcolm Brogdon", "Marvin Bagley III",
    "Saddiq Bey", "Jericho Sims", "Josh Hart", "Karl-Anthony Towns", "Mikal Bridges",
    "OG Anunoby", "Precious Achiuwa", "Bol Bol", "Bradley Beal", "Devin Booker",
    "Grayson Allen", "Kevin Durant", "Monte Morris", "Tyus Jones", "Caleb Martin",
    "Joel Embiid", "Kelly Oubre Jr.", "Kyle Lowry", "Reggie Jackson", "Tyrese Maxey",
    "Brandon Ingram", "CJ McCollum", "Herbert Jones", "Jaylen Nowell", "Trey Murphy III",
    "Zion Williamson", "Cody Martin", "LaMelo Ball", "Miles Bridges", "Nick Richards",
    "Tre Mann", "Austin Reaves", "Cam Reddish", "Christian Wood", "D'Angelo Russell",
    "Gabe Vincent", "LeBron James", "Rui Hachimura", "Bennedict Mathurin", "Isaiah Jackson",
    "James Wiseman", "Pascal Siakam", "Tyrese Haliburton", "Bruce Brown", "Chris Boucher",
    "Davion Mitchell", "RJ Barrett", "Scottie Barnes", "Darius Garland", "Donovan Mitchell",
    "Evan Mobley", "Isaac Okoro", "Max Strus", "Ty Jerome", "Ayo Dosunmu", "Chris Duarte",
    "Coby White", "Jevon Carter", "Josh Giddey", "Lonzo Ball", "Nikola Vucevic",
    "Patrick Williams", "Talen Horton-Tucker", "Zach LaVine", "Bojan Bogdanovic", "Cam Thomas",
    "Ziaire Williams", "Chris Paul", "Jeremy Sochan", "Keldon Johnson", "Sandro Mamukelashvili",
    "Victor Wembanyama", "Anthony Edwards", "Julius Randle", "Naz Reid", "Rudy Gobert",
    "Dillon Brooks", "Fred VanVleet", "Jabari Smith Jr.", "Jalen Green", "Jock Landale",
    "Steven Adams", "Tari Eason", "Daniel Gafford", "Klay Thompson", "Kyrie Irving",
    "Luka Doncic", "Anfernee Simons", "Deni Avdija", "Jabari Walker", "Robert Williams III",
    "Scoot Henderson", "Shaedon Sharpe", "Cade Cunningham", "Isaiah Stewart", "Jaden Ivey",
    "Jalen Duren", "Malik Beasley", "Paul Reed", "Tobias Harris", "Andrew Wiggins",
    "Draymond Green", "Jonathan Kuminga", "Kevon Looney", "Kyle Anderson", "Moses Moody",
    "Stephen Curry", "Bogdan Bogdanovic", "David Roddy", "De'Andre Hunter", "Dyson Daniels",
    "Jalen Johnson", "Onyeka Okongwu", "Trae Young", "Kawhi Leonard", "Kris Dunn",
    "Mo Bamba", "Terance Mann", "Bam Adebayo", "Duncan Robinson", "Jimmy Butler",
    "Josh Richardson", "Tyler Herro", "Chet Holmgren", "Isaiah Hartenstein", "Isaiah Joe",
    "Jalen Williams", "Luguentz Dort", "Shai Gilgeous-Alexander", "Collin Sexton", "Drew Eubanks",
    "John Collins", "Jordan Clarkson", "Svi Mykhailiuk", "Walker Kessler", "Cole Anthony",
    "Franz Wagner", "Jalen Suggs", "Paolo Banchero", "Wendell Carter Jr."  
];


const lowerplayers = [
    "brandon clarke", "desmond bane", "ja morant", "jaren jackson jr.", "luke kennard",
    "santi aldama", "de'aaron fox", "demar derozan", "domantas sabonis", "keegan murray",
    "malik monk", "aaron gordon", "michael porter jr.", "nikola jokic", "peyton watson",
    "zeke nnaji", "al horford", "jayson tatum", "jrue holiday", "payton pritchard",
    "bobby portis", "brook lopez", "damian lillard", "delon wright", "gary trent jr.",
    "corey kispert", "jonas valanciunas", "jordan poole", "malcolm brogdon", "marvin bagley iii",
    "saddiq bey", "jericho sims", "josh hart", "karl-anthony towns", "mikal bridges",
    "og anunoby", "precious achiuwa", "bol bol", "bradley beal", "devin booker",
    "grayson allen", "kevin durant", "monte morris", "tyus jones", "caleb martin",
    "joel embiid", "kelly oubre jr.", "kyle lowry", "reggie jackson", "tyrese maxey",
    "brandon ingram", "cj mccollum", "herbert jones", "jaylen nowell", "trey murphy iii",
    "zion williamson", "cody martin", "lamelo ball", "miles bridges", "nick richards",
    "tre mann", "austin reaves", "cam reddish", "christian wood", "d'angelo russell",
    "gabe vincent", "lebron james", "rui hachimura", "bennedict mathurin", "isaiah jackson",
    "james wiseman", "pascal siakam", "tyrese haliburton", "bruce brown", "chris boucher",
    "davion mitchell", "rj barrett", "scottie barnes", "darius garland", "donovan mitchell",
    "evan mobley", "isaac okoro", "max strus", "ty jerome", "ayo dosunmu", "chris duarte",
    "coby white", "jevon carter", "josh giddey", "lonzo ball", "nikola vucevic",
    "patrick williams", "talen horton-tucker", "zach lavine", "bojan bogdanovic", "cam thomas",
    "ziaire williams", "chris paul", "jeremy sochan", "keldon johnson", "sandro mamukelashvili",
    "victor wembanyama", "anthony edwards", "julius randle", "naz reid", "rudy gobert",
    "dillon brooks", "fred vanvleet", "jabari smith jr.", "jalen green", "jock landale",
    "steven adams", "tari eason", "daniel gafford", "klay thompson", "kyrie irving",
    "luka doncic", "anfernee simons", "deni avdija", "jabari walker", "robert williams iii",
    "scoot henderson", "shaedon sharpe", "cade cunningham", "isaiah stewart", "jaden ivey",
    "jalen duren", "malik beasley", "paul reed", "tobias harris", "andrew wiggins",
    "draymond green", "jonathan kuminga", "kevon looney", "kyle anderson", "moses moody",
    "stephen curry", "bogdan bogdanovic", "david roddy", "de'andre hunter", "dyson daniels",
    "jalen johnson", "onyeka okongwu", "trae young", "kawhi leonard", "kris dunn",
    "mo bamba", "terance mann", "bam adebayo", "duncan robinson", "jimmy butler",
    "josh richardson", "tyler herro", "chet holmgren", "isaiah hartenstein", "isaiah joe",
    "jalen williams", "luguentz dort", "shai gilgeous-alexander", "collin sexton", "drew eubanks",
    "john collins", "jordan clarkson", "svi mykhailiuk", "walker kessler", "cole anthony",
    "franz wagner", "jalen suggs", "paolo banchero", "wendell carter jr."
];