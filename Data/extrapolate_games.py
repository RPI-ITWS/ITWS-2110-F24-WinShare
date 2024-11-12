import json
import os
import csv
from dotenv import load_dotenv

load_dotenv()

def read_json_file(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def write_csv_file(data, file_path):
    with open(file_path, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["home_team", "away_team", "home_points", "away_points"]) 
        for row in data:
            writer.writerow([row["home_team"], row["away_team"], row["home_points"], row["away_points"]])

def main():
    json_file_path = 'json/schedule_data.json'
    output_csv_file_path = 'csv/game_data.csv'
    
    data = read_json_file(json_file_path)
    
    output_data = []
    for entry in data:
        for game in entry['games']:
            home_points = game.get('home_points')
            away_points = game.get('away_points')
            
            if home_points is None or away_points is None: # this means that the game was postponed, cancelled, unnecessary, in progress, etc.
                print(f"Missing points for game: {game}")
                
            game_summary = {
                "home_team": game['home']['name'],
                "away_team": game['away']['name'],
                "home_points": game.get('home_points', 'N/A'),
                "away_points": game.get('away_points', 'N/A'),
            }
            output_data.append(game_summary)
    
    os.makedirs(os.path.dirname(output_csv_file_path), exist_ok=True)
    write_csv_file(output_data, output_csv_file_path)
    print("Data has been written to ./csv/game_data.csv")

if __name__ == "__main__":
    main()