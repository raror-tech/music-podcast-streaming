import requests
import time
import hashlib

API_KEY ="FYSPHQEKUXDRKJPRBWZ5"
API_SECRET ="5qVwp9gsuWe27pvWfqDPvtMYxWbKukFKCu6yPJce"

BASE_URL = "https://api.podcastindex.org/api/1.0"

def headers():
    epoch = str(int(time.time()))
    auth_hash = hashlib.sha1(
    (API_KEY + API_SECRET + epoch).encode()
).hexdigest()
    return {
    "X-Auth-Date": epoch,
    "X-Auth-Key": API_KEY,
    "Authorization": auth_hash,
    "User-Agent": "MusicPodcastApp/1.0"
}

def search_podcasts(query):
    return requests.get(
        f"{BASE_URL}/search/byterm",
    headers=headers(),
    params={"q": query}
    ).json()
    
def get_episodes(feed_id):
    return requests.get(
    f"{BASE_URL}/episodes/byfeedid",
    headers=headers(),
    params={"id": feed_id}
).json()


