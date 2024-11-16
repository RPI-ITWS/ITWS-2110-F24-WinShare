-- Create teams table
CREATE TABLE teams (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create previous games table
CREATE TABLE previous_games (
    game_id VARCHAR(36) PRIMARY KEY,
    home_team_id VARCHAR(36),
    away_team_id VARCHAR(36),
    home_team_score INT,
    away_team_score INT,
    game_date DATETIME,
    season_year INT,
    season_type VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (home_team_id) REFERENCES teams(id),
    FOREIGN KEY (away_team_id) REFERENCES teams(id)
);
 
-- Insert the teams data
INSERT INTO teams (id, name) VALUES
('583eca88-fb46-11e1-82cb-f4ce4684ea4c', 'Memphis Grizzlies'),
('583ed0ac-fb46-11e1-82cb-f4ce4684ea4c', 'Sacramento Kings'),
('583ed102-fb46-11e1-82cb-f4ce4684ea4c', 'Denver Nuggets'),
('583eccfa-fb46-11e1-82cb-f4ce4684ea4c', 'Boston Celtics'),
('583ecefd-fb46-11e1-82cb-f4ce4684ea4c', 'Milwaukee Bucks'),
('583ec8d4-fb46-11e1-82cb-f4ce4684ea4c', 'Washington Wizards'),
('583ec70e-fb46-11e1-82cb-f4ce4684ea4c', 'New York Knicks'),
('583ecfa8-fb46-11e1-82cb-f4ce4684ea4c', 'Phoenix Suns'),
('583ec87d-fb46-11e1-82cb-f4ce4684ea4c', 'Philadelphia 76ers'),
('583ecc9a-fb46-11e1-82cb-f4ce4684ea4c', 'New Orleans Pelicans'),
('583ec97e-fb46-11e1-82cb-f4ce4684ea4c', 'Charlotte Hornets'),
('583ecae2-fb46-11e1-82cb-f4ce4684ea4c', 'Los Angeles Lakers'),
('583ec7cd-fb46-11e1-82cb-f4ce4684ea4c', 'Indiana Pacers'),
('583ecda6-fb46-11e1-82cb-f4ce4684ea4c', 'Toronto Raptors'),
('583ec773-fb46-11e1-82cb-f4ce4684ea4c', 'Cleveland Cavaliers'),
('583ec5fd-fb46-11e1-82cb-f4ce4684ea4c', 'Chicago Bulls'),
('583ec9d6-fb46-11e1-82cb-f4ce4684ea4c', 'Brooklyn Nets'),
('583ecd4f-fb46-11e1-82cb-f4ce4684ea4c', 'San Antonio Spurs'),
('583eca2f-fb46-11e1-82cb-f4ce4684ea4c', 'Minnesota Timberwolves'),
('583ecb3a-fb46-11e1-82cb-f4ce4684ea4c', 'Houston Rockets'),
('583ecf50-fb46-11e1-82cb-f4ce4684ea4c', 'Dallas Mavericks'),
('583ed056-fb46-11e1-82cb-f4ce4684ea4c', 'Portland Trail Blazers'),
('583ec928-fb46-11e1-82cb-f4ce4684ea4c', 'Detroit Pistons'),
('583ec825-fb46-11e1-82cb-f4ce4684ea4c', 'Golden State Warriors'),
('583ecb8f-fb46-11e1-82cb-f4ce4684ea4c', 'Atlanta Hawks'),
('583ecdfb-fb46-11e1-82cb-f4ce4684ea4c', 'LA Clippers'),
('583ecea6-fb46-11e1-82cb-f4ce4684ea4c', 'Miami Heat'),
('583ecfff-fb46-11e1-82cb-f4ce4684ea4c', 'Oklahoma City Thunder'),
('583ece50-fb46-11e1-82cb-f4ce4684ea4c', 'Utah Jazz'),
('583ed157-fb46-11e1-82cb-f4ce4684ea4c', 'Orlando Magic');

-- FOR REFERENCE LATER
-- Example query to get all past games for a team
-- SELECT t1.name as home_team, t2.name as away_team, 
--        pg.home_team_score, pg.away_team_score, pg.game_date
-- FROM previous_games pg
-- JOIN teams t1 ON pg.home_team_id = t1.id
-- JOIN teams t2 ON pg.away_team_id = t2.id
-- WHERE t1.id = '583ec825-fb46-11e1-82cb-f4ce4684ea4c' -- Golden State Warriors
-- OR t2.id = '583ec825-fb46-11e1-82cb-f4ce4684ea4c'
-- ORDER BY pg.game_date DESC;
