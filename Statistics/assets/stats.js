const InputtedSearch = document.getElementById("PlayerSearch");
const SearchList = document.getElementById("PlayerOptions");
const FindPlayer = document.getElementById("FindPlayer");
FindPlayer.disabled = true;


document.addEventListener('DOMContentLoaded', function() {
    const statButton = document.getElementById('StatButton');
    const playerButton = document.getElementById('PlayerButton');
    const playerContent = document.getElementById('PlayerContent');
    const statContent = document.getElementById('StatContent');

    const statSelect = document.getElementById('stat');

    statButton.addEventListener('click', function() {
        playerContent.style.display = 'block';
        statContent.style.display = 'none';
    });

    playerButton.addEventListener('click', function() {
        playerContent.style.display = 'none';
        statContent.style.display = 'block';
        FindPlayerStats("lebron james");
    });

    // Changes base off dropdown selection
    statSelect.addEventListener('change', async function() {
        const value = this.value;
        const jsonKey = StatOptionsDropDown[value];
        const out = document.getElementById("data1");
        out.textContent = jsonKey;
        const list = await bestPlayers(jsonKey);
        out.textContent = list.map((player, index) => 
            `${index + 1}. ${player[0]}: ${player[1]}`
        ).join('\n');
    });
});

async function bestPlayers(jsonKey) {
    try {
        if (jsonKey === 'default') {
            const out = document.getElementById("data1");
            out.textContent = 'Select a statistic to view top players';
            return;
        }
        const response = await fetch("./assets/PlayerStats.json");
        const playersData = await response.json();
        const playerArray = Object.entries(playersData).map(([name, data]) => ({
            name,
            value: data.season_stats[jsonKey]
        }));
        const sortedPlayers = playerArray.sort((a, b) => b.value - a.value);
        return sortedPlayers.slice(0, 10).map(player => [player.name, player.value]);
    } catch (error) {
        console.error('Error loading players data:', error);
    }
}


// Wait for input
InputtedSearch.addEventListener("input", function() {
    const searchTerm = InputtedSearch.value.toLowerCase();
    
    if (searchTerm === "" || searchTerm.length <= 1) {
        SearchList.style.display = 'none'; 
        FindPlayer.disabled = true;
        FindPlayer.style.backgroundColor = '#7a7f86';
        FindPlayer.style.cursor = 'not-allowed';
        return; 
    } else if (searchTerm.length >= 2) {
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
                FindPlayer.style.cursor = 'pointer';
            };
    
            SearchList.appendChild(playerDiv);
        });
    
        SearchList.style.display = filteredPlayers.length ? 'block' : 'none';
    
        if (players.includes(InputtedSearch.value) || lowerplayers.includes(InputtedSearch.value.toLowerCase())) {
            FindPlayer.disabled = false;
            FindPlayer.style.backgroundColor = '#00aaff';
            FindPlayer.style.color = 'black';
            FindPlayer.style.cursor = 'pointer';
        } else {
            FindPlayer.disabled = true;
            FindPlayer.style.backgroundColor = '#7a7f86';
            FindPlayer.style.color = 'black';
            FindPlayer.style.cursor = 'not-allowed';
        }
    }
});



FindPlayer.addEventListener('mouseover', function() {
    if (FindPlayer.disabled) {
        FindPlayer.style.cursor = 'not-allowed';
    } else {
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

function FindPlayerStats(query){
    if (!query.trim()) {
        query = "lebron james";
    }

    if(!lowerplayers.includes(query.toLowerCase())){
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
            const playerName = players[lowerplayers.indexOf(query.toLowerCase())];
            
            const teamName = player[query.toLowerCase()].team_name;
            const teamMarket = player[query.toLowerCase()].market;
            const team = `${teamMarket} ${teamName}`;

            const fgm = (player[query.toLowerCase()].season_stats["field_goals_made"]);
            const fgp = (player[query.toLowerCase()].season_stats["field_goals_pct"] * 100).toFixed(1) + '%';
            const tpm = (player[query.toLowerCase()].season_stats["two_points_made"]);
            const tpp = (player[query.toLowerCase()].season_stats["two_points_pct"] * 100).toFixed(1) + '%';
            const thpm = (player[query.toLowerCase()].season_stats["three_points_made"]);
            const thpp = (player[query.toLowerCase()].season_stats["three_points_pct"] * 100).toFixed(1) + '%';
            
            const displayName = document.getElementById("name");
            displayName.textContent = playerName;

            const displayTeam = document.getElementById("position");
            displayTeam.textContent = team;
    
            const stat1 = document.getElementById("value-1");
            stat1.textContent = "Field Goal Made:";
            const stat2 = document.getElementById("label-2");
            stat2.textContent = fgm;

            const stat3 = document.getElementById("value-3");
            stat3.textContent = "Field Goal Pct:";
            const stat4 = document.getElementById("label-4");
            stat4.textContent = fgp;

            const stat5 = document.getElementById("value-5");
            stat5.textContent = "2-Pointers Made:";
            const stat6 = document.getElementById("label-6");
            stat6.textContent = tpm;

            const stat7 = document.getElementById("value-7");
            stat7.textContent = "2-Pointer Pct:";
            const stat8 = document.getElementById("label-8");
            stat8.textContent = tpp;

            const stat9 = document.getElementById("value-9");
            stat9.textContent = "3-Pointers Made:";
            const stat10 = document.getElementById("label-10");
            stat10.textContent = thpm;

            const stat11 = document.getElementById("value-11");
            stat11.textContent = "3-Pointer Pct:";
            const stat12 = document.getElementById("label-12");
            stat12.textContent = thpp;

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

const playerid = {
    "Brandon Clarke": "c978afe7-cf22-45fc-8d0f-da8f867eb5ee","Desmond Bane": "49962b13-0afc-43f5-a3e2-7e37b7736260",
    "Ja Morant": "9983bed6-e53c-4c65-a90a-51546a0e3352","Jaren Jackson Jr.": "3e492a6a-ed3c-499d-b3f5-ff68ca16f6fd",
    "Luke Kennard": "a537047d-c29f-4dfe-99b0-3bac4e258dc7","Santi Aldama": "266cd359-f378-45c6-957e-6e21378e5219",
    "De'Aaron Fox": "cfc1e41b-74ab-45ee-8132-aaf9ca7f8163","DeMar DeRozan": "5e86a9c3-b4d0-4fe1-a551-acd83e5d60eb",
    "Domantas Sabonis": "22038780-8c50-4211-a99e-656d983e5207","Keegan Murray": "7494fbb4-5ac7-43ee-b91a-8859532f548b",
    "Malik Monk": "3214b8de-d3ea-4188-9329-15a92f894f23","Aaron Gordon": "20f85838-0bd5-4c1f-ab85-a308bafaf5bc",
    "Michael Porter Jr.": "3a7d6510-00e9-4265-81df-864a1f547269","Nikola Jokic": "f2625432-3903-4f90-9b0b-2e4f63856bb0",
    "Peyton Watson": "abfc35ea-baf0-4aff-b69a-30732ddf2b1b","Zeke Nnaji": "5a563d9c-10c4-4005-a884-109f05264b0b",
    "Al Horford": "cf3a87ec-c2f7-42e8-9698-6f8b2ba916a9","Jayson Tatum": "98136da3-452f-49dc-a794-1ee9c76443f2",
    "Jrue Holiday": "65700e81-3aa0-49a9-8a94-004f2cfb64e5","Payton Pritchard": "0718c0e1-7804-471a-b4ed-cde778948d4d",
    "Bobby Portis": "68b7aac9-02fd-4bd8-b10c-6702d2c5eb98","Brook Lopez": "c179fb5c-9845-4e37-aef7-6e00d97548eb",
    "Damian Lillard": "5382cf43-3a79-4a5a-a7fd-153906fe65dd","Delon Wright": "1db0df17-b3d5-4ddb-98d0-8f86239347bf",
    "Gary Trent Jr.": "62daf16f-0c4c-46ae-9e54-0d34d6fdef85","Corey Kispert": "3358cc38-7331-43ad-af04-ebd34fe328e7",
    "Jonas Valanciunas": "c8788ad2-89f7-4ec9-a22b-dcaf6190889b","Jordan Poole": "2ed2f76f-5a2f-4d79-ab7c-e84a8a42dc21",
    "Malcolm Brogdon": "f7134fc8-b298-41fd-933d-d0c4a5d8f6ac","Marvin Bagley III": "e86c1439-4ef0-4530-9c41-c3a682962eb3",
    "Saddiq Bey": "d531a451-6377-4942-a26f-3507d60fb36b","Jericho Sims": "56003e58-6b25-4f22-9d97-020b3d1f6616",
    "Josh Hart": "d6fbf8f8-bb4a-43f7-95f6-498a5e042138","Karl-Anthony Towns": "ab532a66-9314-4d57-ade7-bb54a70c65ad",
    "Mikal Bridges": "83cc5b28-36a7-43ba-ba20-8347bd1de583","OG Anunoby": "9474fa0a-70dd-44c4-9751-dac5839ae7f3",
    "Precious Achiuwa": "3dbbb869-88a8-44f2-ac36-46fd0f5d825c","Bol Bol": "6395ff32-c9b6-4ad0-8f0f-dce474274725",
    "Bradley Beal": "ff461754-ad20-4eeb-af02-2b46cc980b24","Devin Booker": "31baa84f-c759-4f92-8e1f-a92305ade3d6",
    "Grayson Allen": "ffa9a64f-d624-4033-bd23-59dcfd805175","Kevin Durant": "53f2fa48-e61b-49fb-843d-8a3e872257eb",
    "Monte Morris": "48b05ddf-0a9f-4426-9394-231c54726eaa","Tyus Jones": "cbc0a3b2-985e-4484-9cb6-6891337b18b7",
    "Caleb Martin": "566685c7-ff63-439a-8888-5278904835fa","Joel Embiid": "bf9ad0fd-0cb8-4360-8970-5f1b5cf3fa8d",
    "Kelly Oubre Jr.": "7dfa0971-96be-4705-9811-f9f54758145f","Kyle Lowry": "8c090758-6baa-468d-82fd-d47e17d5091b",
    "Reggie Jackson": "7b745dde-a011-45a8-98a8-460a9facb3ce","Tyrese Maxey": "75fc46eb-71d8-4d1a-984f-3747ccd7a4c9",
    "Brandon Ingram": "8082841d-e516-43c6-a81b-7987fa321acd","CJ McCollum": "bc70a55a-cee0-478f-9a13-cf51c4a4187c",
    "Herbert Jones": "66b88001-06c2-4f4a-9825-b6e0cc1df6cc","Jaylen Nowell": "6e16fada-c4ba-42af-ab1d-aca511a6c684",
    "Trey Murphy III": "51b62fe8-1e5c-4c65-8ad3-2ad06e749b70","Zion Williamson": "5cc51c05-06f5-4ae4-89a4-1d329fbbcdfb",
    "Cody Martin": "6eadcfb0-1d51-4525-add6-17f07ae2ad49","LaMelo Ball": "be53f27f-c666-4bd2-8fcd-0713f963aa2b",
    "Miles Bridges": "af8f331b-96a6-416e-8837-b14d5b11c52d","Nick Richards": "9654c7f1-d16c-428c-88fd-2a6cdb5a8370",
    "Tre Mann": "5b681679-4d8c-4964-bbba-5ed058257745","Austin Reaves": "c4981f56-93a2-47b1-8d31-4e8635f45e1d",
    "Cam Reddish": "8f10f30f-cab7-43e1-be6b-736cd8700081","Christian Wood": "98100660-988b-4e71-a89e-f35839964483",
    "D'Angelo Russell": "dbf09e15-1cd8-434e-acda-9527735ef4d6","Gabe Vincent": "1d4905d6-a6b4-4b45-8a90-91ed03440d0f",
    "LeBron James": "0afbe608-940a-4d5d-a1f7-468718c67d91","Rui Hachimura": "5bfc9a4c-deb7-4f37-a784-5d99ada863cb",
    "Bennedict Mathurin": "3f98b652-71d4-4a40-949d-41c33dddd15d","Isaiah Jackson": "067d9f05-a6b8-4a4b-854c-3364234e62b1",
    "James Wiseman": "5228b552-2eb0-4476-96c2-f3c9f82a7a35","Pascal Siakam": "3df1db1d-6596-489e-8e26-80f60fd9b1f4",
    "Tyrese Haliburton": "254e42d7-df01-4c68-9264-bca06c83c2c1","Bruce Brown": "fc058e75-1015-4bbe-8fab-925d5f6d83fb",
    "Chris Boucher": "f01d5d8d-f949-437a-a23f-3835c0939ced","Davion Mitchell": "38a9b2cc-008e-406b-ad5a-87e0e54f93b7",
    "RJ Barrett": "42c5f009-dfd2-4a94-a750-0943791e138e","Scottie Barnes": "1738927f-6ef3-4b23-921d-168b4371f917",
    "Darius Garland": "b79b88e1-35ef-4947-8a61-f6ec631a1e15","Donovan Mitchell": "b6dde96e-3748-4cbe-86d2-798d5dffb3c0",
    "Evan Mobley": "d64b602e-45f2-4ba9-878b-0a4f7210ec77","Isaac Okoro": "d13849d9-a696-44af-84a1-3196132c3ecd",
    "Max Strus": "f6aff1dc-15b9-4c89-a2fb-746f4cf78890","Ty Jerome": "03cf6eb6-688a-49b1-a4cc-f10c39c21725",
    "Ayo Dosunmu": "f8a7e4c7-d60e-4751-9203-30a772dd9272","Chris Duarte": "1233bcf7-d653-4a86-b10a-86e3da52bdf0",
    "Coby White": "a1e46e84-bd9e-454d-9117-a8fa1aab0ce4","Jevon Carter": "79cd9581-3aaa-484c-a8b1-a349cdc5c34c",
    "Josh Giddey": "66ea876a-1cc9-47ed-ae31-2ed3c8f9350e","Lonzo Ball": "0f1de951-5a0e-4bc7-977c-8dafd0fbf121",
    "Nikola Vucevic": "7366b2b7-5959-4dd9-9204-760e861b3119","Patrick Williams": "67f6467e-0acc-48ce-9872-a63225ef295c",
    "Talen Horton-Tucker": "b0b79700-15f3-4981-8d81-73534bbdd0ab","Zach LaVine": "db72e294-1c54-454a-96b9-0b4fd2f38112",
    "Bojan Bogdanovic": "7ff02e19-e829-4e56-9a34-233a71fce76c","Cam Thomas": "c6289b1b-7bb2-4ee6-8111-1a6e96aa9104",
    "Ziaire Williams": "1c9a1c2e-3e3b-439e-8d72-0b41b17e4ba9","Chris Paul": "942c53e3-7268-44e3-b0a9-fdff55a72c03",
    "Jeremy Sochan": "4d9e0abc-05aa-45de-be32-b0770697416a","Keldon Johnson": "190797ba-a6f4-4286-9d5e-d157ff834829",
    "Sandro Mamukelashvili": "c910f29a-3f6b-4dba-92e9-20137fbdf2c7","Victor Wembanyama": "98e2cdeb-69dc-499c-a853-84c32c714924",
    "Anthony Edwards": "d0c7135a-1aea-40cb-ba20-df656de71749","Julius Randle": "24c85a15-686e-4161-934b-40948188fa36",
    "Naz Reid": "823b2161-0c34-494c-9d7c-b438152f4f4d","Rudy Gobert": "37fbc3a5-0d10-4e22-803b-baa2ea0cdb12",
    "Dillon Brooks": "72a6489b-ad35-4f06-8a4f-a68ea1052f7b","Fred VanVleet": "45f17314-918c-49bd-a482-adc171859025",
    "Jabari Smith Jr.": "293be24b-3a94-40b2-a7a4-a1dd788302e9","Jalen Green": "9a331092-35db-456c-a44a-d5b80a02ebe9",
    "Jock Landale": "02dc6e18-95a4-4919-b4fc-f8a981ccd359","Steven Adams": "a208e22a-6b63-45f9-b7c6-bf913a68f3df",
    "Tari Eason": "e7373530-b566-4f36-b0de-0510b6d94e0e","Daniel Gafford": "52cd8137-c791-4569-ad70-433e25d34882",
    "Klay Thompson": "4e152a06-673e-4701-b115-aa7e2cd00d2d","Kyrie Irving": "dd146010-902b-4ad7-b98c-650d0363a2f0",
    "Luka Doncic": "d2ee92e9-3e72-45eb-b156-2dc5adc1e6f7","Anfernee Simons": "632adcc4-97f1-4e67-a132-e0b79f013c67",
    "Deni Avdija": "312f21c9-a061-43e2-9a22-65199131068e","Jabari Walker": "ff065b75-4031-474c-9610-c505db2ca63e",
    "Robert Williams III": "c20dfb58-5622-405e-90b1-92b79ee97461","Scoot Henderson": "a978acbc-e84b-4cc4-85c9-30595e022847",
    "Shaedon Sharpe": "eb0bd3d9-4bf0-4cc3-bbdf-c79e2255c175","Cade Cunningham": "57d55cd4-6ab8-4255-a248-bef800c0cbab",
    "Isaiah Stewart": "9d4d6c87-78db-4556-b94a-bb8d566dd004","Jaden Ivey": "ec887131-efba-43a0-ad0a-0757ab3f0399",
    "Jalen Duren": "00fb2704-aa25-4ef7-8972-cde454810810","Malik Beasley": "d3392ee6-cbe4-419e-bbd5-1b658d83e10e",
    "Paul Reed": "c7c7c72b-7cee-409a-b2b5-256d173ac305","Tobias Harris": "82f09975-6a8d-42e4-b42c-a52b9349ed50",
    "Andrew Wiggins": "77c425f0-0fce-4fab-bd1e-c915c8fb5bc7","Draymond Green": "5e5099d1-4a58-43f2-8d03-f2ae5dd49337","Jonathan Kuminga": "b27687c1-55bb-49e6-9c5b-96a099fda7b7","Kevon Looney": "ebb50069-6fdf-4c07-9a21-a63d5c814536","Kyle Anderson": "2e49c27a-06c5-4c4a-87fd-69840b783947",
    "Moses Moody": "a316cf6a-693d-4c6a-b0d9-ebf80e73e832","Stephen Curry": "8ec91366-faea-4196-bbfd-b8fab7434795","Bogdan Bogdanovic": "b4282659-dd1a-4042-a075-7df4890858e7",
    "David Roddy": "339eff07-4d8e-42c6-9a47-900e94b13654","De'Andre Hunter": "a4a75d83-54b5-4dca-913e-44ab04288446",
    "Dyson Daniels": "358fb074-ac1b-45a6-bf54-46c30534786e","Jalen Johnson": "d222539f-fa52-4070-807f-d3aba372f46d",
    "Onyeka Okongwu": "70e50e53-ca3b-425d-ac49-b156d6d1e016","Trae Young": "cf418e0c-de9d-438f-a1ac-3be539a56c42",
    "Kawhi Leonard": "c12fb587-fc86-471c-8a84-19caf31325ce","Kris Dunn": "56c796d6-74d3-4881-9166-7f528e2b67f6",
    "Mo Bamba": "a6bf9402-7f41-49a9-ab28-fe0bdffb5060","Terance Mann": "a6cc820a-8dce-40aa-840c-f0c94cfa9e46",
    "Bam Adebayo": "11c303dc-540c-4090-8e0c-76c2fb2c125a","Duncan Robinson": "18d35316-9f40-408c-abcc-ab49e06ef8e8",
    "Jimmy Butler": "0e163d44-67a7-4107-9421-5333600166bb","Josh Richardson": "ef11cca9-6605-44e8-943e-193c7b821465",
    "Tyler Herro": "8bd80771-843f-4d7f-a4e7-b4d4f6c4e7c6","Chet Holmgren": "eb91a4c8-1a8a-46bf-86e6-e16950b67ef6",
    "Isaiah Hartenstein": "38745a56-7472-4844-a2dc-f61d3bcd941f","Isaiah Joe": "36d083a5-49ca-42f1-80b7-b78275a8abd9",
    "Jalen Williams": "62c44a90-f280-438a-9c7e-252f4f376283","Luguentz Dort": "3f7e2350-e208-4791-98c2-684b53bb5a9a",
    "Shai Gilgeous-Alexander": "d9ea4a8f-ff51-408d-b518-980efc2a35a1","Collin Sexton": "80b5cccf-203b-4482-92aa-76d1598216be",
    "Drew Eubanks": "0fbb8fd5-9b9c-48a2-a355-18aba7b5d9d5","John Collins": "28a2e698-9f33-4d4d-9a5d-9bea66ee42a1",
    "Jordan Clarkson": "03d77214-5780-4715-8df2-13de3af5ea2d","Svi Mykhailiuk": "8c0929ae-ce3d-47e0-a964-bf6b8d3981ab",
    "Walker Kessler": "7eccbdf9-58a3-4b96-8b1e-eaa8ea9da836","Cole Anthony": "b6ba1ad1-c57b-4215-8ded-5eeee7171017",
    "Franz Wagner": "514fd4aa-5384-4bc7-a670-367a426ca235","Jalen Suggs": "6dda6e0a-4b74-4486-80cd-5f9a8d93d1ba",
    "Paolo Banchero": "49d8f5ef-2867-4597-a3ab-5ffc5e651258","Wendell Carter Jr.": "744d5db7-b0be-474a-a58b-6ddf7ae35567"
    };

const StatOptionsDropDown = {
    'default': 'default',
    'statP0': 'points',
    'statP1': 'minutes',
    'statP2': 'field_goals_made',
    'statP3': 'field_goals_pct',
    'statP4': 'three_points_made',
    'statP5': 'three_points_pct',
    'statP6': 'free_throws_made',
    'statP7': 'free_throws_pct',
    'statP8': 'offensive_rebounds',
    'statP9': 'defensive_rebounds',
    'statP10': 'steals',
    'statP11': 'blocks',
    'statP12': 'personal_fouls'
};