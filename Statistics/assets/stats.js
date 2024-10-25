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
    "Keegan Murray", "Cade Cunningham", "Tyrese Maxey", "Bennedict Mathurin", "Shaedon Sharpe",
    "Cam Thomas", "Josh Hart", "Malcolm Brogdon", "Trey Murphy III", "Austin Reaves",
    "Grayson Allen", "Alperen Şengün", "Davion Mitchell", "Jordan Poole", "Jonathan Kuminga",
    "Moses Moody", "Kevon Looney", "Andrew Wiggins", "James Wiseman", "Jalen Duren",
    "Tari Eason", "Kenyon Martin Jr.", "Christian Wood", "Jeremy Sochan", "Walker Kessler",
    "Brook Lopez", "Chris Duarte", "Jalen Johnson", "Onyeka Okongwu", "Mo Bamba",
    "Bol Bol", "Isaiah Stewart", "Marvin Bagley III", "Killian Hayes", "Herbert Jones",
    "Tre Mann", "Ayo Dosunmu", "Cam Reddish", "Dyson Daniels", "Talen Horton-Tucker",
    "Luguentz Dort", "Josh Richardson", "Aaron Gordon", "Bruce Brown", "Reggie Jackson",
    "Dennis Schröder", "Monte Morris", "Kelly Oubre Jr.", "PJ Washington", "Malik Beasley",
    "Malik Monk", "Terance Mann", "Rui Hachimura", "Deni Avdija", "Corey Kispert",
    "Daniel Gafford", "Saddiq Bey", "De'Andre Hunter", "Bogdan Bogdanović", "Dillon Brooks",
    "Steven Adams", "Isaac Okoro", "Coby White", "Wendell Carter Jr.", "Cole Anthony",
    "Mo Wagner", "Naz Reid", "Kyle Anderson", "Patrick Beverley", "Kris Dunn",
    "Santi Aldama", "Tyus Jones", "Jalen Suggs", "Chris Boucher", "Precious Achiuwa",
    "Nick Richards", "Cody Martin", "Ziaire Williams", "Usman Garuba", "Jabari Walker",
    "Chuma Okeke", "Payton Pritchard", "Luke Kennard", "Svi Mykhailiuk", "Isaiah Hartenstein",
    "Jericho Sims", "Nassir Little", "Drew Eubanks", "Xavier Tillman", "Sandro Mamukelashvili",
    "Jalen Williams", "Isaiah Jackson", "Justin Holiday", "Gabe Vincent", "Caleb Martin",
    "Max Strus", "Duncan Robinson", "JaVale McGee", "Zeke Nnaji", "Jevon Carter",
    "Ty Jerome", "Thanasis Antetokounmpo", "Delon Wright", "Jordan Clarkson", "Brandon Clarke",
    "Al Horford", "Trent Forrest", "Jaylen Nowell", "David Roddy", "Jock Landale",
    "Paul Reed", "Peyton Watson", "Aleksej Pokuševski", "Isaiah Joe"
];


const lowerplayers = [
    "nikola jokić", "lebron james", "stephen curry", "shai gilgeous-alexander", "kevin durant",
    "jayson tatum", "anthony edwards", "joel embiid", "damian lillard", "jimmy butler",
    "luka dončić", "kawhi leonard", "ja morant", "donovan mitchell", "bam adebayo",
    "karl-anthony towns", "jaren jackson jr.", "draymond green", "zion williamson", "lamelo ball",
    "trae young", "chris paul", "bradley beal", "devin booker", "klay thompson",
    "kyrie irving", "cj mccollum", "demar derozan", "mikal bridges", "jrue holiday",
    "tyrese haliburton", "nikola vučević", "pascal siakam", "john collins", "michael porter jr.",
    "darius garland", "jaden ivey", "franz wagner", "bojan bogdanović", "jalen green",
    "jonas valančiūnas", "collin sexton", "og anunoby", "jaren jackson", "derrick rose",
    "rudy gobert", "kyle lowry", "tobias harris", "robert williams iii", "bobby portis",
    "victor wembanyama", "scoot henderson", "chet holmgren", "paolo banchero", "jabari smith jr.",
    "evan mobley", "scottie barnes", "josh giddey", "tyler herro", "rj barrett",
    "de'aaron fox", "domantas sabonis", "brandon ingram", "zach lavine", "keldon johnson",
    "fred vanvleet", "julius randle", "miles bridges", "desmond bane", "anfernee simons",
    "gary trent jr.", "lonzo ball", "d'angelo russell", "markelle fultz", "patrick williams",
    "keegan murray", "cade cunningham", "tyrese maxey", "bennedict mathurin", "shaedon sharpe",
    "cam thomas", "josh hart", "malcolm brogdon", "trey murphy iii", "austin reaves",
    "grayson allen", "alperen şengün", "davion mitchell", "jordan poole", "jonathan kuminga",
    "moses moody", "kevon looney", "andrew wiggins", "james wiseman", "jalen duren",
    "tari eason", "kenyon martin jr.", "christian wood", "jeremy sochan", "walker kessler",
    "brook lopez", "chris duarte", "jalen johnson", "onyeka okongwu", "mo bamba",
    "bol bol", "isaiah stewart", "marvin bagley iii", "killian hayes", "herbert jones",
    "tre mann", "ayo dosunmu", "cam reddish", "dyson daniels", "talen horton-tucker",
    "luguentz dort", "josh richardson", "aaron gordon", "bruce brown", "reggie jackson",
    "dennis schröder", "monte morris", "kelly oubre jr.", "pj washington", "malik beasley",
    "malik monk", "terance mann", "rui hachimura", "deni avdija", "corey kispert",
    "daniel gafford", "saddiq bey", "de'andre hunter", "bogdan bogdanović", "dillon brooks",
    "steven adams", "isaac okoro", "coby white", "wendell carter jr.", "cole anthony",
    "mo wagner", "naz reid", "kyle anderson", "patrick beverley", "kris dunn",
    "santi aldama", "tyus jones", "jalen suggs", "chris boucher", "precious achiuwa",
    "nick richards", "cody martin", "ziaire williams", "usman garuba", "jabari walker",
    "chuma okeke", "payton pritchard", "luke kennard", "svi mykhailiuk", "isaiah hartenstein",
    "jericho sims", "nassir little", "drew eubanks", "xavier tillman", "sandro mamukelashvili",
    "jalen williams", "isaiah jackson", "justin holiday", "gabe vincent", "caleb martin",
    "max strus", "duncan robinson", "javale mcgee", "zeke nnaji", "jevon carter",
    "ty jerome", "thanasis antetokounmpo", "delon wright", "jordan clarkson", "brandon clarke",
    "al horford", "trent forrest", "jaylen nowell", "david roddy", "jock landale",
    "paul reed", "peyton watson", "aleksej pokuševski", "isaiah joe"
];
