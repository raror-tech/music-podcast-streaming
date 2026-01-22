import requests
from requests.exceptions import RequestException

BASE_URL = "https://musicbrainz.org/ws/2"

HEADERS = {
    "User-Agent": "MusicPodcastApp/1.0 (contact@example.com)"
}

def search_tracks(query, limit=10):
    url = f"{BASE_URL}/recording"
    params = {
        "query": query,
        "fmt": "json",
        "limit": limit
    }

    try:
        response = requests.get(
            url,
            headers=HEADERS,
            params=params,
            timeout=5   
        )

        response.raise_for_status()

        data = response.json()
        results = []

        for r in data.get("recordings", []):
            results.append({
                "title": r.get("title"),
                "artist": (
                    r["artist-credit"][0]["name"]
                    if r.get("artist-credit")
                    else "Unknown"
                ),
                "source": "musicbrainz"
            })

        return results

    except RequestException as e:
        
        print("MusicBrainz error:", e)
        return []
