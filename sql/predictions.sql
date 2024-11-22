DROP TABLE IF EXISTS game_predictions;
CREATE TABLE game_predictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    game_id VARCHAR(255) NOT NULL,
    winner_id VARCHAR(255) NOT NULL,
    winner_name VARCHAR(255) NOT NULL,
    points_wagered INT NOT NULL DEFAULT 100,
    prediction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    points_earned INT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_prediction (user_id, game_id)
) ENGINE=InnoDB;
