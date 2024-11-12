import os
import requests
import json
from datetime import datetime, timedelta
from dotenv import load_dotenv
import time

load_dotenv()

api_key = os.getenv("SPORTS_RADAR_API_KEY")

def fetch_schedule_data(start_date, end_date, access_level='trial', language_code='en', format='json'):
    base_url = "https://api.sportradar.com/nba/{access_level}/v8/{language_code}/games/{year}/{month}/{day}/schedule.{format}?api_key={api_key}"
    
    current_date = start_date
    all_data = []

    while current_date <= end_date:
        year = current_date.strftime('%Y')
        month = current_date.strftime('%m')
        day = current_date.strftime('%d')
        
        url = base_url.format(
            access_level=access_level,
            language_code=language_code,
            year=year,
            month=month,
            day=day,
            format=format,
            api_key=api_key
        )
        
        while True:
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                all_data.append(data)
                break
            elif response.status_code == 429:
                print(f"Rate limit exceeded for {current_date}. Retrying after delay...")
                time.sleep(5)
            else:
                print(f"Failed to fetch data for {current_date}: {response.status_code}")
                break
        
        current_date += timedelta(days=1)
    
    # Ensure the directory exists
    os.makedirs('./json', exist_ok=True)
    
    with open('./json/schedule_data.json', 'w') as f:
        json.dump(all_data, f, indent=4)
    
    print("Data has been written to ./json/schedule_data.json")

# Example usage
start_date = datetime.strptime('2023-01-01', '%Y-%m-%d')
end_date = datetime.strptime('2024-10-24', '%Y-%m-%d')
fetch_schedule_data(start_date, end_date)