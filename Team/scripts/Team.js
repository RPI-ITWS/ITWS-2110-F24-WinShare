// Team.js

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

// Get the teamName and teamId from the query parameters
const queryParams = getQueryParams();
const teamName = queryParams['teamName'];
const teamId = queryParams['id'];

// Set the document title to the teamName
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
        })
   /*
   const data = {
      id: '583ec9d6-fb46-11e1-82cb-f4ce4684ea4c',
      name: 'Nets',
      market: 'Brooklyn',
      alias: 'BKN',
      founded: 1967,
      sr_id: 'sr:team:3436',
      owner: 'Joseph Tsai',
      general_manager: 'Sean Marks',
      president: 'Sam Zussman',
      sponsor: 'Webull',
      championships_won: 0,
      conference_titles: 2,
      division_titles: 4,
      retired_numbers: '3, 5, 23, 25, 32, 52',
      playoff_appearances: 24,
      gleague_affiliate: 'Long Island Nets',
      reference: '1610612751',
      venue: {
         id: '7a330bcd-ac0f-50ca-bc29-2460e5c476b3',
         name: 'Barclays Center',
         capacity: 17732,
         address: '620 Atlantic Avenue',
         city: 'Brooklyn',
         state: 'NY',
         zip: '11217',
         country: 'USA',
         sr_id: 'sr:venue:36132',
         location: {
            lat: '40.682957',
            lng: '-73.975165',
         },
      },
      league: {
         id: '4353138d-4c22-4396-95d8-5f587d2df25c',
         name: 'NBA',
         alias: 'NBA',
      },
      conference: {
         id: '3960cfac-7361-4b30-bc25-8d393de6f62f',
         name: 'EASTERN CONFERENCE',
         alias: 'EASTERN',
      },
      division: {
         id: '582d6502-9a93-4a8d-8785-69374d732875',
         name: 'Atlantic',
         alias: 'ATLANTIC',
      },
      coaches: [
         {
            id: 'a53e12b8-2e93-4461-8c63-095992ff60c4',
            full_name: 'Jordi Fernandez',
            first_name: 'Jordi',
            last_name: 'Fernandez',
            position: 'Head Coach',
            experience: '1',
            reference: '203759',
         },
      ],
      team_colors: [
         {
            type: 'secondary',
            hex_color: '#ffffff',
            rgb_color: {
               red: 255,
               green: 255,
               blue: 255,
            },
         },
         {
            type: 'primary',
            hex_color: '#000000',
            rgb_color: {
               red: 0,
               green: 0,
               blue: 0,
            },
         },
      ],
      players: [
         {
            id: '169083b9-0653-44c8-ac69-bc5360a468c6',
            status: 'ACT',
            full_name: 'Dariq Whitehead',
            first_name: 'Dariq',
            last_name: 'Whitehead',
            abbr_name: 'D.Whitehead',
            height: 78,
            weight: 220,
            position: 'G-F',
            primary_position: 'SF',
            jersey_number: '0',
            experience: '1',
            college: 'Duke',
            high_school: 'Montverde Academy (FL)',
            birth_place: 'Newark, NJ, USA',
            birthdate: '2004-08-01',
            updated: '2024-07-16T18:24:30Z',
            sr_id: 'sr:player:2444997',
            rookie_year: 2023,
            reference: '1641727',
            draft: {
               team_id: '583ec9d6-fb46-11e1-82cb-f4ce4684ea4c',
               year: 2023,
               round: '1',
               pick: '22',
            },
         },
         {
            id: '1c82e36d-8975-4778-9d49-d872d2f3f1be',
            status: 'ACT',
            full_name: "Day'Ron Sharpe",
            first_name: "Day'Ron",
            last_name: 'Sharpe',
            abbr_name: 'D.Sharpe',
            height: 81,
            weight: 265,
            position: 'C',
            primary_position: 'C',
            jersey_number: '20',
            experience: '3',
            college: 'North Carolina',
            high_school: 'Montverde Academy (FL)',
            birth_place: 'Greenville, NC, USA',
            birthdate: '2001-11-06',
            updated: '2024-07-19T00:30:33Z',
            sr_id: 'sr:player:2078557',
            rookie_year: 2021,
            reference: '1630549',
            draft: {
               team_id: '583ecfa8-fb46-11e1-82cb-f4ce4684ea4c',
               year: 2021,
               round: '1',
               pick: '29',
            },
            injuries: [
               {
                  id: '6605e585-803a-4ce8-b637-5cb322ad85dc',
                  comment:
                     'Sharpe will miss at least six weeks with a left hamstring strain, Brett Siegel of ClutchPoints.com reports.',
                  desc: 'Hamstring',
                  status: 'Out',
                  start_date: '2024-10-07',
                  update_date: '2024-10-07',
               },
            ],
         },
         {
            id: '1c9a1c2e-3e3b-439e-8d72-0b41b17e4ba9',
            status: 'ACT',
            full_name: 'Ziaire Williams',
            first_name: 'Ziaire',
            last_name: 'Williams',
            abbr_name: 'Z.Williams',
            height: 81,
            weight: 185,
            position: 'G-F',
            primary_position: 'SF',
            jersey_number: '1',
            experience: '3',
            college: 'Stanford',
            high_school: 'Sierra Canyon (CA)',
            birth_place: 'Lancaster, CA, USA',
            birthdate: '2001-09-12',
            updated: '2024-08-30T19:47:35Z',
            sr_id: 'sr:player:2080949',
            rookie_year: 2021,
            reference: '1630533',
            draft: {
               team_id: '583ecc9a-fb46-11e1-82cb-f4ce4684ea4c',
               year: 2021,
               round: '1',
               pick: '10',
            },
         },
         {
            id: '1cc0577e-a011-4b08-a6a8-216765672f08',
            status: 'TWO-WAY',
            full_name: 'Jaylen Martin',
            first_name: 'Jaylen',
            last_name: 'Martin',
            abbr_name: 'J.Martin',
            height: 78,
            weight: 216,
            position: 'F',
            primary_position: 'SF',
            jersey_number: '16',
            experience: '0',
            high_school: 'Florida State University School (FL)',
            birth_place: 'Tallahassee, FL, USA',
            birthdate: '2004-01-28',
            updated: '2024-02-25T15:02:01Z',
            sr_id: 'sr:player:2631953',
            reference: '1641798',
            draft: {
               year: 2023,
            },
         },
         {
            id: '288519dc-eae8-4daf-afa4-c86322b7460e',
            status: 'ACT',
            full_name: 'Nic Claxton',
            first_name: 'Nic',
            last_name: 'Claxton',
            abbr_name: 'N.Claxton',
            height: 83,
            weight: 215,
            position: 'C',
            primary_position: 'C',
            jersey_number: '33',
            experience: '5',
            college: 'Georgia',
            high_school: 'Legacy Charter School (SC)',
            birth_place: 'Greenville, SC, USA',
            birthdate: '1999-04-17',
            updated: '2024-07-19T00:31:16Z',
            sr_id: 'sr:player:1307666',
            rookie_year: 2019,
            reference: '1629651',
            draft: {
               team_id: '583ec9d6-fb46-11e1-82cb-f4ce4684ea4c',
               year: 2019,
               round: '2',
               pick: '31',
            },
         },
         {
            id: '2fe5b749-7bd4-4dbc-acfb-6d675f541e37',
            status: 'ACT',
            full_name: 'Cameron Johnson',
            first_name: 'Cameron',
            last_name: 'Johnson',
            abbr_name: 'C.Johnson',
            height: 80,
            weight: 210,
            position: 'F',
            primary_position: 'PF',
            jersey_number: '2',
            experience: '5',
            college: 'North Carolina',
            high_school: 'Our Lady of the Sacred Heart (PA)',
            birth_place: 'Moon Township, PA, USA',
            birthdate: '1996-03-03',
            updated: '2024-07-19T00:29:01Z',
            sr_id: 'sr:player:1770162',
            rookie_year: 2019,
            reference: '1629661',
            draft: {
               team_id: '583eca2f-fb46-11e1-82cb-f4ce4684ea4c',
               year: 2019,
               round: '1',
               pick: '11',
            },
         },
         {
            id: '318debd7-dab6-4d4e-8849-03c4c701a7c8',
            status: 'ACT',
            full_name: 'Ben Simmons',
            first_name: 'Ben',
            last_name: 'Simmons',
            abbr_name: 'B.Simmons',
            height: 82,
            weight: 240,
            position: 'G-F',
            primary_position: 'PG',
            jersey_number: '10',
            experience: '6',
            college: 'LSU',
            high_school: 'Monteverde Academy (FL)',
            birth_place: 'Melbourne,, AUS',
            birthdate: '1996-07-20',
            updated: '2024-07-19T00:29:47Z',
            sr_id: 'sr:player:996289',
            rookie_year: 2017,
            reference: '1627732',
            draft: {
               team_id: '583ec87d-fb46-11e1-82cb-f4ce4684ea4c',
               year: 2016,
               round: '1',
               pick: '1',
            },
         },
         {
            id: '426357dc-340b-4d89-8e3b-7d6b4022b460',
            status: 'ACT',
            full_name: 'Dorian Finney-Smith',
            first_name: 'Dorian',
            last_name: 'Finney-Smith',
            abbr_name: 'D.Finney-Smith',
            height: 79,
            weight: 220,
            position: 'F',
            primary_position: 'PF',
            jersey_number: '28',
            experience: '8',
            college: 'Florida',
            high_school: 'I.C. Norcom (VA)',
            birth_place: 'Portsmouth, VA, USA',
            birthdate: '1993-05-04',
            updated: '2024-07-19T00:31:07Z',
            sr_id: 'sr:player:1050927',
            rookie_year: 2016,
            reference: '1627827',
            draft: {
               year: 2016,
            },
         },
         {
            id: '4e3d287a-49d4-4f1a-8f88-da3a5abb3e4a',
            status: 'ACT',
            full_name: 'Keon Johnson',
            first_name: 'Keon',
            last_name: 'Johnson',
            abbr_name: 'K.Johnson',
            height: 77,
            weight: 185,
            position: 'G',
            primary_position: 'SG',
            jersey_number: '45',
            experience: '3',
            college: 'Tennessee',
            high_school: 'The Webb School (TN)',
            birth_place: 'Shelbyville, TN, USA',
            birthdate: '2002-03-10',
            updated: '2024-07-23T15:13:36Z',
            sr_id: 'sr:player:2081843',
            rookie_year: 2021,
            reference: '1630553',
            draft: {
               team_id: '583ec70e-fb46-11e1-82cb-f4ce4684ea4c',
               year: 2021,
               round: '1',
               pick: '21',
            },
         },
         {
            id: '5722e429-752c-41f7-9b75-e3fc712f14f1',
            status: 'ACT',
            full_name: 'Shake Milton',
            first_name: 'Shake',
            last_name: 'Milton',
            abbr_name: 'S.Milton',
            height: 77,
            weight: 205,
            position: 'G',
            primary_position: 'SG',
            jersey_number: '7',
            experience: '6',
            college: 'SMU',
            high_school: 'Owasso (OK)',
            birth_place: 'Owasso, OK, USA',
            birthdate: '1996-09-26',
            updated: '2024-08-30T19:47:15Z',
            sr_id: 'sr:player:1495351',
            rookie_year: 2018,
            reference: '1629003',
            draft: {
               team_id: '583ecf50-fb46-11e1-82cb-f4ce4684ea4c',
               year: 2018,
               round: '2',
               pick: '54',
            },
         },
         {
            id: '73d92041-1258-4f1f-8bd3-55e07407115b',
            status: 'ACT',
            full_name: 'Jalen Wilson',
            first_name: 'Jalen',
            last_name: 'Wilson',
            abbr_name: 'J.Wilson',
            height: 78,
            weight: 220,
            position: 'F',
            primary_position: 'PF',
            jersey_number: '22',
            experience: '1',
            college: 'Kansas',
            high_school: 'John H. Guyer (TX)',
            birth_place: 'Denton, TX, USA',
            birthdate: '2000-11-04',
            updated: '2024-07-16T18:42:18Z',
            sr_id: 'sr:player:1793960',
            rookie_year: 2023,
            reference: '1630592',
            draft: {
               team_id: '583ec9d6-fb46-11e1-82cb-f4ce4684ea4c',
               year: 2023,
               round: '2',
               pick: '51',
            },
         },
         {
            id: '7ff02e19-e829-4e56-9a34-233a71fce76c',
            status: 'ACT',
            full_name: 'Bojan Bogdanović',
            first_name: 'Bojan',
            last_name: 'Bogdanović',
            abbr_name: 'B.Bogdanović',
            height: 79,
            weight: 226,
            position: 'G-F',
            primary_position: 'SF',
            jersey_number: '44',
            experience: '10',
            birth_place: 'Mostar,, BIH',
            birthdate: '1989-04-18',
            updated: '2024-09-16T12:54:06Z',
            sr_id: 'sr:player:608136',
            rookie_year: 2014,
            reference: '202711',
            draft: {
               team_id: '583ecea6-fb46-11e1-82cb-f4ce4684ea4c',
               year: 2011,
               round: '2',
               pick: '31',
            },
            injuries: [
               {
                  id: '1198e4c5-c6e4-464e-9fad-88e539b96885',
                  comment:
                     "Bogdanovic said that he remains without a return timetable, and will not play in Wednesday's game against the Hawks.",
                  desc: 'Foot',
                  status: 'Out',
                  start_date: '2024-09-30',
                  update_date: '2024-10-23',
               },
            ],
         },
         {
            id: '9c3327e3-89b3-4269-a97d-49a85f00b844',
            status: 'TWO-WAY',
            full_name: 'Yongxi Cui',
            first_name: 'Yongxi',
            last_name: 'Cui',
            abbr_name: 'Y.Cui',
            height: 79,
            weight: 202,
            position: 'G',
            primary_position: 'SG',
            jersey_number: '8',
            experience: '0',
            birth_place: 'Nanning,, CHN',
            birthdate: '2003-05-28',
            updated: '2024-10-04T17:36:41Z',
            sr_id: 'sr:player:2639801',
            reference: '1642385',
         },
         {
            id: '9f4181d5-0999-46ba-b466-d90ded24268a',
            status: 'ACT',
            full_name: 'Trendon Watford',
            first_name: 'Trendon',
            last_name: 'Watford',
            abbr_name: 'T.Watford',
            height: 80,
            weight: 237,
            position: 'F',
            primary_position: 'PF',
            jersey_number: '9',
            experience: '3',
            college: 'LSU',
            high_school: 'Mountain Brook (AL)',
            birth_place: 'Birmingham, AL, USA',
            birthdate: '2000-11-09',
            updated: '2024-07-19T00:29:38Z',
            sr_id: 'sr:player:1795024',
            rookie_year: 2021,
            reference: '1630570',
            draft: {
               year: 2021,
            },
            injuries: [
               {
                  id: '47547c25-cc54-4d24-b853-9890f2692341',
                  comment:
                     "Watford will miss at least two weeks with a left hamstring strain, but will not play in Wednesday's game against the Hawks.",
                  desc: 'Hamstring',
                  status: 'Out',
                  start_date: '2024-10-07',
                  update_date: '2024-10-23',
               },
            ],
         },
         {
            id: 'a2c6a907-282f-4172-9d60-42d03987da0e',
            status: 'ACT',
            full_name: 'Dennis Schröder',
            first_name: 'Dennis',
            last_name: 'Schröder',
            abbr_name: 'D.Schröder',
            height: 73,
            weight: 175,
            position: 'G',
            primary_position: 'PG',
            jersey_number: '17',
            experience: '11',
            birth_place: 'Braunschweig,, DEU',
            birthdate: '1993-09-15',
            updated: '2024-09-16T12:54:25Z',
            sr_id: 'sr:player:607388',
            rookie_year: 2013,
            reference: '203471',
            draft: {
               team_id: '583ecb8f-fb46-11e1-82cb-f4ce4684ea4c',
               year: 2013,
               round: '1',
               pick: '17',
            },
         },
         {
            id: 'c6289b1b-7bb2-4ee6-8111-1a6e96aa9104',
            status: 'ACT',
            full_name: 'Cam Thomas',
            first_name: 'Cam',
            last_name: 'Thomas',
            abbr_name: 'C.Thomas',
            height: 75,
            weight: 210,
            position: 'G',
            primary_position: 'SG',
            jersey_number: '24',
            experience: '3',
            college: 'LSU',
            high_school: 'Oak Hill Academy (VA)',
            birth_place: 'Yokosuka,, JPN',
            birthdate: '2001-10-13',
            updated: '2024-07-19T00:31:01Z',
            sr_id: 'sr:player:2081895',
            rookie_year: 2021,
            reference: '1630560',
            draft: {
               team_id: '583ec9d6-fb46-11e1-82cb-f4ce4684ea4c',
               year: 2021,
               round: '1',
               pick: '27',
            },
         },
         {
            id: 'dbf9e1f5-7573-4c24-992a-04ea080c61e1',
            status: 'ACT',
            full_name: 'Noah Clowney',
            first_name: 'Noah',
            last_name: 'Clowney',
            abbr_name: 'N.Clowney',
            height: 81,
            weight: 210,
            position: 'F-C',
            primary_position: 'PF',
            jersey_number: '21',
            experience: '1',
            college: 'Alabama',
            high_school: 'Dorman (SC)',
            birth_place: 'Spartanburg, SC, USA',
            birthdate: '2004-07-14',
            updated: '2024-07-16T18:23:58Z',
            sr_id: 'sr:player:2438515',
            rookie_year: 2023,
            reference: '1641730',
            draft: {
               team_id: '583ec9d6-fb46-11e1-82cb-f4ce4684ea4c',
               year: 2023,
               round: '1',
               pick: '21',
            },
         },
         {
            id: 'f871af48-952a-42e3-82da-7cad157b486c',
            status: 'TWO-WAY',
            full_name: 'Tyrese Martin',
            first_name: 'Tyrese',
            last_name: 'Martin',
            abbr_name: 'T.Martin',
            height: 78,
            weight: 215,
            position: 'G',
            primary_position: 'SG',
            jersey_number: '13',
            experience: '1',
            college: 'UConn',
            high_school: 'Massanutten Military Academy (VA)',
            birth_place: 'Allentown, PA, USA',
            birthdate: '1999-03-07',
            updated: '2024-10-20T00:51:27Z',
            sr_id: 'sr:player:1591442',
            rookie_year: 2022,
            reference: '1631213',
            draft: {
               team_id: '583ec825-fb46-11e1-82cb-f4ce4684ea4c',
               year: 2022,
               round: '2',
               pick: '51',
            },
         },
      ],
   };
   console.log(data);
   displayTeamInfo(data);
   */
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
