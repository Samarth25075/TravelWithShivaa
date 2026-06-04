"""
╔══════════════════════════════════════════════════════════╗
║     TravelBookShiva — Render Keep-Alive Script           ║
║     Pings the backend API every 20 mins to prevent       ║
║     Render Free Tier from spinning down.                 ║
╚══════════════════════════════════════════════════════════╝

Usage:
    python keep_alive.py

Run this on any always-on machine (your PC, a free cron service,
or a GitHub Actions scheduled workflow) to keep the site live.
"""

import requests
import time
from datetime import datetime, timedelta

# ─── Configuration ───────────────────────────────────────────
BACKEND_URL  = "https://travelwithshivaa.onrender.com/"
FRONTEND_URL = "https://travelbookshiva.in/"

PING_INTERVAL_SECONDS = 20 * 60   # 20 minutes
RETRY_DELAY_SECONDS   = 30        # wait 30s before retry
MAX_RETRIES           = 3         # retry up to 3 times on failure
TIMEOUT_SECONDS       = 15        # request timeout

# ─── Stats ───────────────────────────────────────────────────
stats = {
    "pings":    0,
    "success":  0,
    "failures": 0,
    "start":    datetime.now(),
}

# ─── Helpers ─────────────────────────────────────────────────
def ts():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def ping(label: str, url: str) -> bool:
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            r = requests.get(url, timeout=TIMEOUT_SECONDS)
            if r.status_code < 400:
                print(f"[{ts()}] ✅  {label} is ALIVE  —  HTTP {r.status_code}")
                return True
            else:
                print(f"[{ts()}] ⚠️  {label} returned HTTP {r.status_code} (attempt {attempt}/{MAX_RETRIES})")
        except requests.exceptions.Timeout:
            print(f"[{ts()}] ⏱  {label} TIMEOUT after {TIMEOUT_SECONDS}s (attempt {attempt}/{MAX_RETRIES})")
        except requests.exceptions.ConnectionError:
            print(f"[{ts()}] 🔌  {label} CONNECTION ERROR (attempt {attempt}/{MAX_RETRIES})")
        except Exception as e:
            print(f"[{ts()}] ❌  {label} ERROR: {e} (attempt {attempt}/{MAX_RETRIES})")

        if attempt < MAX_RETRIES:
            time.sleep(RETRY_DELAY_SECONDS)

    return False

def print_stats():
    uptime = datetime.now() - stats["start"]
    hours, rem = divmod(int(uptime.total_seconds()), 3600)
    minutes, _ = divmod(rem, 60)
    rate = (stats["success"] / stats["pings"] * 100) if stats["pings"] > 0 else 0
    print(f"\n{'─'*55}")
    print(f"  📊  Uptime Stats  |  Running for {hours}h {minutes}m")
    print(f"  Total pings : {stats['pings']}")
    print(f"  Successes   : {stats['success']}  ({rate:.1f}%)")
    print(f"  Failures    : {stats['failures']}")
    print(f"{'─'*55}\n")

# ─── Main Loop ───────────────────────────────────────────────
if __name__ == "__main__":
    print(f"""
╔══════════════════════════════════════════════════════════╗
║     TravelBookShiva — Keep-Alive  🚀                     ║
╠══════════════════════════════════════════════════════════╣
║  Backend  : {BACKEND_URL:<43}║
║  Frontend : {FRONTEND_URL:<43}║
║  Interval : every {PING_INTERVAL_SECONDS // 60} minutes                           ║
╚══════════════════════════════════════════════════════════╝
Press Ctrl+C to stop.
""")

    while True:
        stats["pings"] += 1
        print(f"\n[{ts()}]  🔔  Ping #{stats['pings']} starting...")

        backend_ok  = ping("Backend  API", BACKEND_URL)
        frontend_ok = ping("Frontend     ", FRONTEND_URL)

        if backend_ok and frontend_ok:
            stats["success"] += 1
        else:
            stats["failures"] += 1
            print(f"[{ts()}]  ⚠️  One or more services failed to respond.")

        # Print stats every 10 pings (every ~3h 20min)
        if stats["pings"] % 10 == 0:
            print_stats()

        next_ping = datetime.now() + timedelta(seconds=PING_INTERVAL_SECONDS)
        print(f"[{ts()}]  💤  Next ping at {next_ping.strftime('%H:%M:%S')}  "
              f"(sleeping {PING_INTERVAL_SECONDS // 60} min)")
        time.sleep(PING_INTERVAL_SECONDS)
