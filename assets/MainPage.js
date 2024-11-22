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
    fetch('./php/fetchTodaySchedule.php')
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
            displayGames(upcomingGamesToday, 'Upcoming_Matches');
            displayGames(upcomingGamesTomorrow, 'Upcoming_Matches');
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

// "cached" real data so we dont waste api calls
/*
const data = {
   yesterday: {
      date: '2024-10-24',
      league: {
         id: '4353138d-4c22-4396-95d8-5f587d2df25c',
         name: 'NBA',
         alias: 'NBA',
      },
      games: [
         {
            id: 'a3daeb53-a1d5-47a2-b4ee-f09e9719a166',
            status: 'closed',
            coverage: 'full',
            scheduled: '2024-10-24T23:00:00Z',
            home_points: 102,
            away_points: 122,
            track_on_court: true,
            sr_id: 'sr:match:52631989',
            reference: '0022400073',
            time_zones: {
               venue: 'US/Eastern',
               home: 'US/Eastern',
               away: 'US/Eastern',
            },
            venue: {
               id: 'f62d5b49-d646-56e9-ba60-a875a00830f8',
               name: 'Capital One Arena',
               capacity: 20356,
               address: '601 F Street NW',
               city: 'Washington',
               state: 'DC',
               zip: '20004',
               country: 'USA',
               sr_id: 'sr:venue:6016',
               location: {
                  lat: '38.898056',
                  lng: '-77.020833',
               },
            },
            broadcasts: [
               {
                  network: 'MNMT',
                  type: 'TV',
                  locale: 'Home',
                  channel: '642',
               },
               {
                  network: 'NBCS-BOS',
                  type: 'TV',
                  locale: 'Away',
                  channel: '630',
               },
            ],
            home: {
               name: 'Washington Wizards',
               alias: 'WAS',
               id: '583ec8d4-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3431',
               reference: '1610612764',
            },
            away: {
               name: 'Boston Celtics',
               alias: 'BOS',
               id: '583eccfa-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3422',
               reference: '1610612738',
            },
         },
         {
            id: '41686cfc-b00c-407a-86a8-55b4705cdcc4',
            status: 'closed',
            coverage: 'full',
            scheduled: '2024-10-24T23:30:00Z',
            home_points: 120,
            away_points: 109,
            track_on_court: true,
            sr_id: 'sr:match:52631091',
            reference: '0022400074',
            time_zones: {
               venue: 'US/Central',
               home: 'US/Central',
               away: 'US/Central',
            },
            venue: {
               id: '401ba62f-19b5-5bfc-84d6-021772943311',
               name: 'American Airlines Center',
               capacity: 19200,
               address: '2500 Victory Avenue',
               city: 'Dallas',
               state: 'TX',
               zip: '75219',
               country: 'USA',
               sr_id: 'sr:venue:5988',
               location: {
                  lat: '32.79087',
                  lng: '-96.810338',
               },
            },
            broadcasts: [
               {
                  network: 'TNT',
                  type: 'TV',
                  locale: 'National',
                  channel: '245',
               },
            ],
            home: {
               name: 'Dallas Mavericks',
               alias: 'DAL',
               id: '583ecf50-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3411',
               reference: '1610612742',
            },
            away: {
               name: 'San Antonio Spurs',
               alias: 'SAS',
               id: '583ecd4f-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3429',
               reference: '1610612759',
            },
         },
         {
            id: '73a78131-a907-4a84-9d60-c41e90c11991',
            status: 'closed',
            coverage: 'full',
            scheduled: '2024-10-25T02:00:00Z',
            home_points: 87,
            away_points: 102,
            track_on_court: true,
            sr_id: 'sr:match:52631627',
            reference: '0022400075',
            time_zones: {
               venue: 'US/Mountain',
               home: 'US/Mountain',
               away: 'US/Central',
            },
            venue: {
               id: '1a28ef88-76c9-5bcc-b4ee-51d30ca98f4f',
               name: 'Ball Arena',
               capacity: 19520,
               address: '1000 Chopper Circle',
               city: 'Denver',
               state: 'CO',
               zip: '80204',
               country: 'USA',
               sr_id: 'sr:venue:5976',
               location: {
                  lat: '39.749034',
                  lng: '-105.007604',
               },
            },
            broadcasts: [
               {
                  network: 'TNT',
                  type: 'TV',
                  locale: 'National',
                  channel: '245',
               },
            ],
            home: {
               name: 'Denver Nuggets',
               alias: 'DEN',
               id: '583ed102-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3417',
               reference: '1610612743',
            },
            away: {
               name: 'Oklahoma City Thunder',
               alias: 'OKC',
               id: '583ecfff-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3418',
               reference: '1610612760',
            },
         },
         {
            id: 'd8b95107-7d49-4cf7-aa7f-52d232966dc8',
            status: 'closed',
            coverage: 'full',
            scheduled: '2024-10-25T02:00:00Z',
            home_points: 115,
            away_points: 117,
            track_on_court: true,
            sr_id: 'sr:match:52631649',
            reference: '0022400076',
            time_zones: {
               venue: 'US/Pacific',
               home: 'US/Pacific',
               away: 'US/Central',
            },
            venue: {
               id: '2e687b9a-c7a7-487c-85b4-43479abc8458',
               name: 'Golden 1 Center',
               capacity: 17608,
               address: '500 David J. Stern Walkway',
               city: 'Sacramento',
               state: 'CA',
               zip: '95814',
               country: 'USA',
               sr_id: 'sr:venue:6942',
               location: {
                  lat: '38.580361',
                  lng: '-121.499611',
               },
            },
            broadcasts: [
               {
                  network: 'NBCS-CA',
                  type: 'TV',
                  locale: 'Home',
                  channel: '698',
               },
               {
                  network: 'FDSN',
                  type: 'TV',
                  locale: 'Away',
                  channel: '668',
               },
            ],
            home: {
               name: 'Sacramento Kings',
               alias: 'SAC',
               id: '583ed0ac-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3413',
               reference: '1610612758',
            },
            away: {
               name: 'Minnesota Timberwolves',
               alias: 'MIN',
               id: '583eca2f-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3426',
               reference: '1610612750',
            },
         },
      ],
   },
   today: {
      date: '2024-10-25',
      league: {
         id: '4353138d-4c22-4396-95d8-5f587d2df25c',
         name: 'NBA',
         alias: 'NBA',
      },
      games: [
         {
            id: '02ea2224-8839-4e38-8bd2-7893e498c300',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-25T23:00:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52630349',
            reference: '0022400077',
            time_zones: {
               venue: 'US/Eastern',
               home: 'US/Eastern',
               away: 'US/Eastern',
            },
            venue: {
               id: 'aecd8da6-0404-599c-a792-4b33fb084a2a',
               name: 'Kia Center',
               capacity: 18846,
               address: '400 W. Church Street',
               city: 'Orlando',
               state: 'FL',
               zip: '32801',
               country: 'USA',
               sr_id: 'sr:venue:6936',
               location: {
                  lat: '28.539167',
                  lng: '-81.383611',
               },
            },
            broadcasts: [
               {
                  network: 'YES',
                  type: 'TV',
                  locale: 'Away',
                  channel: '631',
               },
               {
                  network: 'FDSFL',
                  type: 'TV',
                  locale: 'Home',
                  channel: '654',
               },
            ],
            home: {
               name: 'Orlando Magic',
               alias: 'ORL',
               id: '583ed157-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3437',
               reference: '1610612753',
            },
            away: {
               name: 'Brooklyn Nets',
               alias: 'BKN',
               id: '583ec9d6-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3436',
               reference: '1610612751',
            },
         },
         {
            id: '8879770e-9dfc-4a9a-a7ae-4362f6e9bfd2',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-25T23:00:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52631373',
            reference: '0022400078',
            time_zones: {
               venue: 'US/Eastern',
               home: 'US/Eastern',
               away: 'US/Eastern',
            },
            venue: {
               id: '62cc9661-7b13-56e7-bf4a-bba7ad7be8da',
               name: 'Scotiabank Arena',
               capacity: 19800,
               address: '40 Bay Street',
               city: 'Toronto',
               state: 'ON',
               zip: 'M5J 2X2',
               country: 'CAN',
               sr_id: 'sr:venue:6030',
               location: {
                  lat: '43.643333',
                  lng: '-79.379167',
               },
            },
            broadcasts: [
               {
                  network: 'NBCS-PH',
                  type: 'TV',
                  locale: 'Away',
               },
               {
                  network: 'TSN',
                  type: 'TV',
                  locale: 'International',
               },
            ],
            home: {
               name: 'Toronto Raptors',
               alias: 'TOR',
               id: '583ecda6-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3433',
               reference: '1610612761',
            },
            away: {
               name: 'Philadelphia 76ers',
               alias: 'PHI',
               id: '583ec87d-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3420',
               reference: '1610612755',
            },
         },
         {
            id: '380c7fb9-da83-4b7d-8221-40afb3b009d6',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-25T23:30:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52630273',
            reference: '0022400080',
            time_zones: {
               venue: 'US/Eastern',
               home: 'US/Eastern',
               away: 'US/Eastern',
            },
            venue: {
               id: '42cddf7a-0e1f-5f91-ae6f-c620582fdb01',
               name: 'Rocket Mortgage FieldHouse',
               capacity: 19432,
               address: '1 Center Court',
               city: 'Cleveland',
               state: 'OH',
               zip: '44115',
               country: 'USA',
               sr_id: 'sr:venue:6132',
               location: {
                  lat: '41.496565',
                  lng: '-81.688265',
               },
            },
            broadcasts: [
               {
                  network: 'FDSOH',
                  type: 'TV',
                  locale: 'Home',
                  channel: '660',
               },
               {
                  network: 'FDSDET',
                  type: 'TV',
                  locale: 'Away',
                  channel: '663',
               },
            ],
            home: {
               name: 'Cleveland Cavaliers',
               alias: 'CLE',
               id: '583ec773-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3432',
               reference: '1610612739',
            },
            away: {
               name: 'Detroit Pistons',
               alias: 'DET',
               id: '583ec928-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3424',
               reference: '1610612765',
            },
         },
         {
            id: '8df2b2f6-57e0-42a6-bdc9-6ad91e27fe1d',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-25T23:30:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52630839',
            reference: '0022400079',
            time_zones: {
               venue: 'US/Eastern',
               home: 'US/Eastern',
               away: 'US/Eastern',
            },
            venue: {
               id: 'fd21f639-8a47-51ac-a5dd-590629d445cf',
               name: 'State Farm Arena',
               capacity: 18118,
               address: 'One Philips Drive',
               city: 'Atlanta',
               state: 'GA',
               zip: '30303',
               country: 'USA',
               sr_id: 'sr:venue:6916',
               location: {
                  lat: '33.757162',
                  lng: '-84.396352',
               },
            },
            broadcasts: [
               {
                  network: 'FDSSE',
                  type: 'TV',
                  locale: 'Home',
                  channel: '649',
               },
               {
                  network: 'FDSSE',
                  type: 'TV',
                  locale: 'Away',
                  channel: '649',
               },
            ],
            home: {
               name: 'Atlanta Hawks',
               alias: 'ATL',
               id: '583ecb8f-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3423',
               reference: '1610612737',
            },
            away: {
               name: 'Charlotte Hornets',
               alias: 'CHA',
               id: '583ec97e-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3430',
               reference: '1610612766',
            },
         },
         {
            id: 'd3999649-0f75-4326-90d4-83305b48a81d',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-25T23:30:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52630643',
            reference: '0022400081',
            time_zones: {
               venue: 'US/Eastern',
               home: 'US/Eastern',
               away: 'US/Eastern',
            },
            venue: {
               id: '583152aa-de75-5bea-ac92-ac5b8a51f9f9',
               name: 'Madison Square Garden',
               capacity: 19812,
               address: '4 Pennsylvania Plaza',
               city: 'New York',
               state: 'NY',
               zip: '10001',
               country: 'USA',
               sr_id: 'sr:venue:6054',
               location: {
                  lat: '40.750496',
                  lng: '-73.993447',
               },
            },
            broadcasts: [
               {
                  network: 'ESPN',
                  type: 'TV',
                  locale: 'National',
                  channel: '206',
               },
               {
                  network: 'MSG',
                  type: 'TV',
                  locale: 'Home',
                  channel: '634',
               },
               {
                  network: 'FDSIN',
                  type: 'TV',
                  locale: 'Away',
                  channel: '671-4',
               },
            ],
            home: {
               name: 'New York Knicks',
               alias: 'NYK',
               id: '583ec70e-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3421',
               reference: '1610612752',
            },
            away: {
               name: 'Indiana Pacers',
               alias: 'IND',
               id: '583ec7cd-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3419',
               reference: '1610612754',
            },
         },
         {
            id: '23295d5b-d760-494a-a8d8-6fd3901d10c6',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-26T00:00:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52630113',
            reference: '0022400082',
            time_zones: {
               venue: 'US/Central',
               home: 'US/Central',
               away: 'US/Central',
            },
            venue: {
               id: '5b239206-57ce-50aa-baaa-627f3349dfdc',
               name: 'Toyota Center',
               capacity: 18500,
               address: '1510 Polk Street',
               city: 'Houston',
               state: 'TX',
               zip: '77002',
               country: 'USA',
               sr_id: 'sr:venue:6134',
               location: {
                  lat: '29.750751',
                  lng: '-95.362049',
               },
            },
            broadcasts: [
               {
                  network: 'SCHN',
                  type: 'TV',
                  locale: 'Home',
                  channel: '674',
               },
               {
                  network: 'FDSSE',
                  type: 'TV',
                  locale: 'Away',
                  channel: '649',
               },
            ],
            home: {
               name: 'Houston Rockets',
               alias: 'HOU',
               id: '583ecb3a-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3412',
               reference: '1610612745',
            },
            away: {
               name: 'Memphis Grizzlies',
               alias: 'MEM',
               id: '583eca88-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3415',
               reference: '1610612763',
            },
         },
         {
            id: 'deea9000-6a18-4340-8084-e21d2ae854b0',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-26T00:00:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52630975',
            reference: '0022400083',
            time_zones: {
               venue: 'US/Central',
               home: 'US/Central',
               away: 'US/Central',
            },
            venue: {
               id: '50b75324-b994-46af-a0a7-28db7bea67d0',
               name: 'Fiserv Forum',
               capacity: 17500,
               address: '1111 Vel R Phillips Avenue',
               city: 'Milwaukee',
               state: 'WI',
               zip: '53203',
               country: 'USA',
               sr_id: 'sr:venue:31495',
               location: {
                  lat: '43.045028',
                  lng: '-87.918167',
               },
            },
            broadcasts: [
               {
                  network: 'CHSN',
                  type: 'TV',
                  locale: 'Away',
                  channel: '665',
               },
               {
                  network: 'FDSWI',
                  type: 'TV',
                  locale: 'Home',
                  channel: '669',
               },
            ],
            home: {
               name: 'Milwaukee Bucks',
               alias: 'MIL',
               id: '583ecefd-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3410',
               reference: '1610612749',
            },
            away: {
               name: 'Chicago Bulls',
               alias: 'CHI',
               id: '583ec5fd-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3409',
               reference: '1610612741',
            },
         },
         {
            id: 'bb7154a0-c923-4a43-95a6-1c01ab13b52e',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-26T01:30:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52631099',
            reference: '0022400084',
            time_zones: {
               venue: 'US/Mountain',
               home: 'US/Mountain',
               away: 'US/Pacific',
            },
            venue: {
               id: '53bac75a-a667-52b5-a416-b80718ae4ed2',
               name: 'Delta Center',
               capacity: 18206,
               address: '301 South Temple Street',
               city: 'Salt Lake City',
               state: 'UT',
               zip: '84101',
               country: 'USA',
               sr_id: 'sr:venue:6944',
               location: {
                  lat: '40.768273',
                  lng: '-111.901141',
               },
            },
            broadcasts: [
               {
                  network: 'NBCS-BA',
                  type: 'TV',
                  locale: 'Away',
                  channel: '696',
               },
               {
                  network: 'KJZZ',
                  type: 'TV',
                  locale: 'Home',
               },
            ],
            home: {
               name: 'Utah Jazz',
               alias: 'UTA',
               id: '583ece50-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3434',
               reference: '1610612762',
            },
            away: {
               name: 'Golden State Warriors',
               alias: 'GSW',
               id: '583ec825-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3428',
               reference: '1610612744',
            },
         },
         {
            id: '15bfb994-bc43-4167-963b-735e7119483c',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-26T02:00:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52631783',
            reference: '0022400085',
            time_zones: {
               venue: 'US/Pacific',
               home: 'US/Pacific',
               away: 'US/Arizona',
            },
            venue: {
               id: '792ec100-691e-5e16-8ef8-79b2b6ee38ba',
               name: 'Crypto.com Arena',
               capacity: 18997,
               address: '1111 S. Figueroa Street',
               city: 'Los Angeles',
               state: 'CA',
               zip: '90015',
               country: 'USA',
               sr_id: 'sr:venue:6008',
               location: {
                  lat: '34.043059',
                  lng: '-118.267223',
               },
            },
            broadcasts: [
               {
                  network: 'ESPN',
                  type: 'TV',
                  locale: 'National',
                  channel: '206',
               },
               {
                  network: 'SportsNet LA',
                  type: 'TV',
                  locale: 'Home',
                  channel: '690',
               },
            ],
            home: {
               name: 'Los Angeles Lakers',
               alias: 'LAL',
               id: '583ecae2-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3427',
               reference: '1610612747',
            },
            away: {
               name: 'Phoenix Suns',
               alias: 'PHX',
               id: '583ecfa8-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3416',
               reference: '1610612756',
            },
         },
         {
            id: 'fe92dd9c-51ed-4213-8f65-861ecaf1c318',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-26T02:00:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52631747',
            reference: '0022400086',
            time_zones: {
               venue: 'US/Pacific',
               home: 'US/Pacific',
               away: 'US/Central',
            },
            venue: {
               id: '1d1f74a2-7b35-56f0-8cbd-552c51cb2c14',
               name: 'Moda Center',
               capacity: 19393,
               address: '1 Center Court',
               city: 'Portland',
               state: 'OR',
               zip: '97227',
               country: 'USA',
               sr_id: 'sr:venue:6940',
               location: {
                  lat: '45.531667',
                  lng: '-122.666667',
               },
            },
            broadcasts: [
               {
                  network: 'KATU',
                  type: 'TV',
                  locale: 'Home',
               },
               {
                  network: 'Gulf Coast Sports',
                  type: 'TV',
                  locale: 'Away',
               },
            ],
            home: {
               name: 'Portland Trail Blazers',
               alias: 'POR',
               id: '583ed056-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3414',
               reference: '1610612757',
            },
            away: {
               name: 'New Orleans Pelicans',
               alias: 'NOP',
               id: '583ecc9a-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:5539',
               reference: '1610612740',
            },
         },
      ],
   },
   tomorrow: {
      date: '2024-10-26',
      league: {
         id: '4353138d-4c22-4396-95d8-5f587d2df25c',
         name: 'NBA',
         alias: 'NBA',
      },
      games: [
         {
            id: 'fa0acb5c-39fc-4a83-8699-77f3531a613a',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-26T21:00:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52630671',
            reference: '0022400087',
            time_zones: {
               venue: 'US/Mountain',
               home: 'US/Mountain',
               away: 'US/Pacific',
            },
            venue: {
               id: '1a28ef88-76c9-5bcc-b4ee-51d30ca98f4f',
               name: 'Ball Arena',
               capacity: 19520,
               address: '1000 Chopper Circle',
               city: 'Denver',
               state: 'CO',
               zip: '80204',
               country: 'USA',
               sr_id: 'sr:venue:5976',
               location: {
                  lat: '39.749034',
                  lng: '-105.007604',
               },
            },
            broadcasts: [
               {
                  network: 'NBA TV',
                  type: 'TV',
                  locale: 'National',
                  channel: '216',
               },
               {
                  network: 'ALT',
                  type: 'TV',
                  locale: 'Home',
                  channel: '681',
               },
               {
                  network: 'FDSSC',
                  type: 'TV',
                  locale: 'Away',
                  channel: '693',
               },
            ],
            home: {
               name: 'Denver Nuggets',
               alias: 'DEN',
               id: '583ed102-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3417',
               reference: '1610612743',
            },
            away: {
               name: 'LA Clippers',
               alias: 'LAC',
               id: '583ecdfb-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3425',
               reference: '1610612746',
            },
         },
         {
            id: '01d2d39d-8c96-4c30-aefd-564139088d90',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-26T23:00:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52632207',
            reference: '0022400090',
            time_zones: {
               venue: 'US/Eastern',
               home: 'US/Eastern',
               away: 'US/Eastern',
            },
            venue: {
               id: 'f62d5b49-d646-56e9-ba60-a875a00830f8',
               name: 'Capital One Arena',
               capacity: 20356,
               address: '601 F Street NW',
               city: 'Washington',
               state: 'DC',
               zip: '20004',
               country: 'USA',
               sr_id: 'sr:venue:6016',
               location: {
                  lat: '38.898056',
                  lng: '-77.020833',
               },
            },
            broadcasts: [
               {
                  network: 'MNMT',
                  type: 'TV',
                  locale: 'Home',
                  channel: '642',
               },
               {
                  network: 'FDSOH',
                  type: 'TV',
                  locale: 'Away',
                  channel: '660',
               },
            ],
            home: {
               name: 'Washington Wizards',
               alias: 'WAS',
               id: '583ec8d4-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3431',
               reference: '1610612764',
            },
            away: {
               name: 'Cleveland Cavaliers',
               alias: 'CLE',
               id: '583ec773-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3432',
               reference: '1610612739',
            },
         },
         {
            id: '4020920b-60f9-45f1-90bb-e154c22c38a2',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-26T23:00:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52630637',
            reference: '0022400088',
            time_zones: {
               venue: 'US/Eastern',
               home: 'US/Eastern',
               away: 'US/Eastern',
            },
            venue: {
               id: 'a380f011-6e5d-5430-9f37-209e1e8a9b6f',
               name: 'Spectrum Center',
               capacity: 19077,
               address: '330 E. Trade Street',
               city: 'Charlotte',
               state: 'NC',
               zip: '28202',
               country: 'USA',
               sr_id: 'sr:venue:6146',
               location: {
                  lat: '35.225148',
                  lng: '-80.839249',
               },
            },
            broadcasts: [
               {
                  network: 'FDSSE',
                  type: 'TV',
                  locale: 'Home',
                  channel: '649',
               },
               {
                  network: 'FDSSUN',
                  type: 'TV',
                  locale: 'Away',
                  channel: '653',
               },
            ],
            home: {
               name: 'Charlotte Hornets',
               alias: 'CHA',
               id: '583ec97e-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3430',
               reference: '1610612766',
            },
            away: {
               name: 'Miami Heat',
               alias: 'MIA',
               id: '583ecea6-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3435',
               reference: '1610612748',
            },
         },
         {
            id: 'b1351e58-1ce4-4de2-9360-1886ebfc7609',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-26T23:00:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52631503',
            reference: '0022400089',
            time_zones: {
               venue: 'US/Eastern',
               home: 'US/Eastern',
               away: 'US/Eastern',
            },
            venue: {
               id: '5a9ddefc-2267-4fd1-8d6e-0f82163ce8bd',
               name: 'Little Caesars Arena',
               capacity: 20491,
               address: '2645 Woodward Avenue',
               city: 'Detroit',
               state: 'MI',
               zip: '48201',
               country: 'USA',
               sr_id: 'sr:venue:21782',
               location: {
                  lat: '42.341172',
                  lng: '-83.054911',
               },
            },
            broadcasts: [
               {
                  network: 'NBCS-BOS',
                  type: 'TV',
                  locale: 'Away',
                  channel: '630',
               },
               {
                  network: 'FDSDET',
                  type: 'TV',
                  locale: 'Home',
                  channel: '663',
               },
            ],
            home: {
               name: 'Detroit Pistons',
               alias: 'DET',
               id: '583ec928-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3424',
               reference: '1610612765',
            },
            away: {
               name: 'Boston Celtics',
               alias: 'BOS',
               id: '583eccfa-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3422',
               reference: '1610612738',
            },
         },
         {
            id: '591b96cb-1ef3-49d3-865a-8ce204fc42e3',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-27T00:00:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52630733',
            reference: '0022400091',
            time_zones: {
               venue: 'US/Central',
               home: 'US/Central',
               away: 'US/Central',
            },
            venue: {
               id: '38911649-acfd-551a-949b-68f0fcaa44e7',
               name: 'United Center',
               capacity: 20917,
               address: '1901 W Madison Street',
               city: 'Chicago',
               state: 'IL',
               zip: '60612',
               country: 'USA',
               sr_id: 'sr:venue:5964',
               location: {
                  lat: '41.880675',
                  lng: '-87.674091',
               },
            },
            broadcasts: [
               {
                  network: 'CHSN',
                  type: 'TV',
                  locale: 'Home',
                  channel: '665',
               },
               {
                  network: 'FDSOK',
                  type: 'TV',
                  locale: 'Away',
                  channel: '675',
               },
            ],
            home: {
               name: 'Chicago Bulls',
               alias: 'CHI',
               id: '583ec5fd-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3409',
               reference: '1610612741',
            },
            away: {
               name: 'Oklahoma City Thunder',
               alias: 'OKC',
               id: '583ecfff-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3418',
               reference: '1610612760',
            },
         },
         {
            id: '71dfe2a5-bfe0-4fb1-b93d-a7b687e80d1f',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-27T00:00:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52630521',
            reference: '0022400092',
            time_zones: {
               venue: 'US/Central',
               home: 'US/Central',
               away: 'US/Eastern',
            },
            venue: {
               id: '7657c204-a20b-527a-99cb-dc29218462aa',
               name: 'FedExForum',
               capacity: 18119,
               address: '191 Beale Street',
               city: 'Memphis',
               state: 'TN',
               zip: '38103',
               country: 'USA',
               sr_id: 'sr:venue:6926',
               location: {
                  lat: '35.138142',
                  lng: '-90.050427',
               },
            },
            broadcasts: [
               {
                  network: 'NBA TV',
                  type: 'TV',
                  locale: 'National',
                  channel: '216',
               },
               {
                  network: 'FDSSE',
                  type: 'TV',
                  locale: 'Home',
                  channel: '649',
               },
               {
                  network: 'FDSFL',
                  type: 'TV',
                  locale: 'Away',
                  channel: '654',
               },
            ],
            home: {
               name: 'Memphis Grizzlies',
               alias: 'MEM',
               id: '583eca88-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3415',
               reference: '1610612763',
            },
            away: {
               name: 'Orlando Magic',
               alias: 'ORL',
               id: '583ed157-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3437',
               reference: '1610612753',
            },
         },
         {
            id: 'eca90d83-4b57-4178-9237-e06762d35f2d',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-27T00:00:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52630525',
            reference: '0022400093',
            time_zones: {
               venue: 'US/Central',
               home: 'US/Central',
               away: 'US/Eastern',
            },
            venue: {
               id: '7aed802e-3562-5b73-af1b-3859529f9b95',
               name: 'Target Center',
               capacity: 19356,
               address: '600 First Avenue North',
               city: 'Minneapolis',
               state: 'MN',
               zip: '55403',
               country: 'USA',
               sr_id: 'sr:venue:6930',
               location: {
                  lat: '44.979444',
                  lng: '-93.276111',
               },
            },
            broadcasts: [
               {
                  network: 'TSN',
                  type: 'TV',
                  locale: 'International',
               },
               {
                  network: 'FDSN',
                  type: 'TV',
                  locale: 'Home',
                  channel: '668',
               },
            ],
            home: {
               name: 'Minnesota Timberwolves',
               alias: 'MIN',
               id: '583eca2f-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3426',
               reference: '1610612750',
            },
            away: {
               name: 'Toronto Raptors',
               alias: 'TOR',
               id: '583ecda6-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3433',
               reference: '1610612761',
            },
         },
         {
            id: 'babb297f-818f-4c07-b22f-bb05d2ce0ab2',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-27T00:30:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52630133',
            reference: '0022400094',
            time_zones: {
               venue: 'US/Central',
               home: 'US/Central',
               away: 'US/Central',
            },
            venue: {
               id: '8a7580c0-4052-54d5-85cd-85aab6200acf',
               name: 'Frost Bank Center',
               capacity: 18581,
               address: '1 AT&T Center Parkway',
               city: 'San Antonio',
               state: 'TX',
               zip: '78219',
               country: 'USA',
               sr_id: 'sr:venue:6112',
               location: {
                  lat: '29.426944',
                  lng: '-98.4375',
               },
            },
            broadcasts: [
               {
                  network: 'SCHN',
                  type: 'TV',
                  locale: 'Away',
                  channel: '674',
               },
               {
                  network: 'KENS',
                  type: 'TV',
                  locale: 'Home',
               },
            ],
            home: {
               name: 'San Antonio Spurs',
               alias: 'SAS',
               id: '583ecd4f-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3429',
               reference: '1610612759',
            },
            away: {
               name: 'Houston Rockets',
               alias: 'HOU',
               id: '583ecb3a-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3412',
               reference: '1610612745',
            },
         },
         {
            id: 'fc48d55d-eb51-465a-8231-2ea58aa8b12f',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-27T02:00:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52630309',
            reference: '0022400095',
            time_zones: {
               venue: 'US/Arizona',
               home: 'US/Arizona',
               away: 'US/Central',
            },
            venue: {
               id: '1d2e59b2-2479-5f84-a6a7-e82f65dd8442',
               name: 'Footprint Center',
               capacity: 18422,
               address: '201 E. Jefferson Street',
               city: 'Phoenix',
               state: 'AZ',
               zip: '85004',
               country: 'USA',
               sr_id: 'sr:venue:6938',
               location: {
                  lat: '33.445833',
                  lng: '-112.071389',
               },
            },
            broadcasts: [
               {
                  network: 'AZFamily',
                  type: 'TV',
                  locale: 'Home',
               },
               {
                  network: 'KFAA',
                  type: 'TV',
                  locale: 'Away',
               },
            ],
            home: {
               name: 'Phoenix Suns',
               alias: 'PHX',
               id: '583ecfa8-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3416',
               reference: '1610612756',
            },
            away: {
               name: 'Dallas Mavericks',
               alias: 'DAL',
               id: '583ecf50-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3411',
               reference: '1610612742',
            },
         },
         {
            id: 'f1dd3401-97dd-4a89-8cbd-fa56fa405103',
            status: 'scheduled',
            coverage: 'full',
            scheduled: '2024-10-27T02:30:00Z',
            track_on_court: true,
            sr_id: 'sr:match:52630783',
            reference: '0022400096',
            time_zones: {
               venue: 'US/Pacific',
               home: 'US/Pacific',
               away: 'US/Pacific',
            },
            venue: {
               id: '792ec100-691e-5e16-8ef8-79b2b6ee38ba',
               name: 'Crypto.com Arena',
               capacity: 18997,
               address: '1111 S. Figueroa Street',
               city: 'Los Angeles',
               state: 'CA',
               zip: '90015',
               country: 'USA',
               sr_id: 'sr:venue:6008',
               location: {
                  lat: '34.043059',
                  lng: '-118.267223',
               },
            },
            broadcasts: [
               {
                  network: 'NBA TV',
                  type: 'TV',
                  locale: 'National',
                  channel: '216',
               },
               {
                  network: 'SportsNet LA',
                  type: 'TV',
                  locale: 'Home',
                  channel: '690',
               },
               {
                  network: 'NBCS-CA',
                  type: 'TV',
                  locale: 'Away',
                  channel: '698',
               },
            ],
            home: {
               name: 'Los Angeles Lakers',
               alias: 'LAL',
               id: '583ecae2-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3427',
               reference: '1610612747',
            },
            away: {
               name: 'Sacramento Kings',
               alias: 'SAC',
               id: '583ed0ac-fb46-11e1-82cb-f4ce4684ea4c',
               sr_id: 'sr:team:3413',
               reference: '1610612758',
            },
         },
      ],
   },
};
const upcomingGamesToday = filterGames(data.today.games, [
   'scheduled',
   'created',
   'inprogress',
   'halftime',
]);
const completedGamesToday = filterGames(data.today.games, [
   'complete',
   'closed',
]);
const upcomingGamesTomorrow = filterGames(data.tomorrow.games, [
   'scheduled',
   'created',
   'inprogress',
   'halftime',
]);
const completedGamesTomorrow = filterGames(data.tomorrow.games, [
   'complete',
   'closed',
]);
const completedGamesYesterday = filterGames(data.yesterday.games, [
   'complete',
   'closed',
]);

displayGames(upcomingGamesToday, 'Upcoming_Matches');
displayGames(upcomingGamesTomorrow, 'Upcoming_Matches');
displayGames(completedGamesTomorrow, 'Recent_Results');
displayGames(completedGamesToday, 'Recent_Results');
displayGames(completedGamesYesterday, 'Recent_Results');
*/

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
      gameElement.dataset.gameId = game.id; // Store game ID in data attribute
      gameElement.style.cursor = 'pointer'; // Add cursor style
      const startTime = new Date(game.scheduled);
      const now = new Date();
      const timeLeft = startTime - now;
      const timeAgo = now - startTime;
      const timeLeftString = formatTimeDifference(timeLeft);
      const timeAgoString = formatTimeDifference(timeAgo) + ' ago';

      const homeTeamLogo = `./assets/Photos/teamLogo/${game.home.name
         .split(' ')
         .pop()
         .toLowerCase()}.png`;
      const awayTeamLogo = `./assets/Photos/teamLogo/${game.away.name
         .split(' ')
         .pop()
         .toLowerCase()}.png`;

      if (
         ['scheduled', 'created', 'inprogress', 'halftime'].includes(
            game.status
         )
      ) {
         gameElement.innerHTML = `
            <div class="game-info">
                <img class="small-logo" src="${homeTeamLogo}" alt="${game.home.name} logo">
                <div class="team" onclick="navigateToTeamPage('${game.home.name}', '${game.home.id}')">${game.home.name}</div>
                <div class="time green-text">${timeLeftString}</div>
            </div>
            <div class="game-info">
                <img class="small-logo" src="${awayTeamLogo}" alt="${game.away.name} logo">
                <div class="team" onclick="navigateToTeamPage('${game.away.name}', '${game.away.id}')">${game.away.name}</div>
                <div class="time invisible">${timeLeftString}</div>
            </div>
            `;
         container.appendChild(gameElement);
      } else if (['complete', 'closed'].includes(game.status)) {
         gameElement.innerHTML = `
            <div class="game-info">
                <img class="small-logo" src="${homeTeamLogo}" alt="${game.home.name} logo">
                <div class="team" onclick="navigateToTeamPage('${game.home.name}', '${game.home.id}')">${game.home.name}</div>
                <div class="score">${game.home_points}</div>
                <div class="time">${timeAgoString}</div>
            </div>
            <div class="game-info">
            <img class="small-logo" src="${awayTeamLogo}" alt="${game.away.name} logo">
            <div class="team" onclick="navigateToTeamPage('${game.away.name}', '${game.away.id}')">${game.away.name}</div>
            <div class="score">${game.away_points}</div>
            <div class="time invisible">${timeAgoString}</div>
            </div>
            `;
         container.appendChild(gameElement);
      }

      // Add event listener to navigate to game page
      gameElement.addEventListener('click', function (event) {
         if (!event.target.classList.contains('team')) {
            window.location.href = `Game/game.php?game_id=${game.id}`;
         }
      });
   });
}
