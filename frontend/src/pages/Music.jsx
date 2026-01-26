import { useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Music() {
  const [tracks, setTracks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { playTrack } = usePlayer();
  const [searchParams] = useSearchParams();
  const playlistIdFromUrl = searchParams.get("playlistId");

  // 🔄 FETCH MUSIC / SEARCH
  useEffect(() => {
    setLoading(true);
    setError("");

    const delay = query.trim() ? 500 : 0;

    const timer = setTimeout(() => {
      const request = query.trim()
        ? api.get(`/music/search?q=${query}`)
        : api.get("/music");

      request
        .then((res) => {
          setTracks(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load music");
          setLoading(false);
        });
    }, delay);

    return () => clearTimeout(timer);
  }, [query]);

  // ➕ ADD TRACK TO PLAYLIST
  const addToPlaylist = async (e, trackId) => {
    e.stopPropagation();

    let playlistId = playlistIdFromUrl;

    if (!playlistId) {
      playlistId = prompt("Enter Playlist ID");
    }

    if (!playlistId) return;

    try {
      await api.post(`/playlists/${playlistId}/tracks`, {
        track_id: trackId,
      });
      alert("Added to playlist ✅");
    } catch {
      alert("Failed to add to playlist ❌");
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-4">
          {playlistIdFromUrl ? "Add Songs to Playlist" : "Search Music"}
        </h1>

        <input
          type="text"
          placeholder="Search songs or artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 mb-6 rounded bg-gray-900 text-white outline-none focus:ring-2 focus:ring-green-500"
        />

        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && tracks.length === 0 && (
          <p className="text-gray-400">No songs found</p>
        )}

        <div className="grid gap-4">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-gray-800 p-4 rounded flex justify-between items-center hover:bg-gray-700 transition"
            >
              <div>
                <h3 className="text-white font-semibold">{track.title}</h3>
                <p className="text-gray-400">
                  {track.artist || "Unknown Artist"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => playTrack(track)}
                  className="px-3 py-1 bg-green-600 rounded hover:bg-green-500 text-sm"
                >
                  ▶ Play
                </button>

                <button
                  onClick={(e) => addToPlaylist(e, track.id)}
                  className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500 text-sm"
                >
                  + Playlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
