CREATE TABLE game_predictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    game_id VARCHAR(255) NOT NULL,
    winner_id VARCHAR(255) NOT NULL,
    winner_name VARCHAR(255) NOT NULL,
    prediction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_prediction (user_id, game_id)
);
