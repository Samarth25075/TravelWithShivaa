import requests
import time
from datetime import datetime

# URL of your Render backend
URL = "https://travelwithshivaa.onrender.com/"

def ping_server():
    try:
        response = requests.get(URL)
        if response.status_code == 200:
            print(f"[{datetime.now()}] ✅ Server is awake! Status: {response.json().get('status')}")
        else:
            print(f"[{datetime.now()}] ⚠️ Server returned status: {response.status_code}")
    except Exception as e:
        print(f"[{datetime.now()}] ❌ Error pinging server: {e}")

if __name__ == "__main__":
    print(f"🚀 Starting Keep-Alive script for: {URL}")
    print("Press Ctrl+C to stop.")
    
    while True:
        ping_server()
        # Wait for 10 minutes (600 seconds)
        # Render sleeps after 15 mins of inactivity, so 10 mins is a safe interval
        time.sleep(600)
