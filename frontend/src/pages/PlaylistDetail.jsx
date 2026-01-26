import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import api from "../services/api";
import Layout from "../components/Layout";

export default function PlaylistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playTrack } = usePlayer();

  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  // 📂 FETCH PLAYLIST
  const fetchPlaylist = useCallback(async () => {
    try {
      const res = await api.get(`/playlists/${id}`);
      setPlaylist(res.data);
    } catch {
      alert("Failed to load playlist");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  // ❌ REMOVE TRACK
  const removeTrack = async (trackId) => {
    try {
      await api.delete(`/playlists/${id}/tracks/${trackId}`);
      fetchPlaylist();
    } catch {
      alert("Failed to remove track");
    }
  };

  // ➕ ADD SONGS → SEARCH PAGE
  const goToAddSongs = () => {
    navigate(`/search?playlistId=${id}`);
  };

  if (loading) {
    return (
      <Layout>
        <p className="p-6 text-gray-400">Loading playlist...</p>
      </Layout>
    );
  }

  if (!playlist) return null;

  return (
    <Layout>
      <div className="p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">
            {playlist.name}
          </h1>

          <button
            onClick={goToAddSongs}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm"
          >
            ➕ Add Songs
          </button>
        </div>

        {playlist.tracks.length === 0 && (
          <p className="text-gray-400">
            No songs in this playlist
          </p>
        )}

        {/* 🎵 TRACK LIST */}
        <div className="space-y-3">
          {playlist.tracks.map((track) => (
            <div
              key={track.id}
              className="flex justify-between items-center bg-gray-800 p-3 rounded"
            >
              <div>
                <p className="text-white font-medium">{track.title}</p>
                <p className="text-gray-400 text-sm">{track.artist}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => playTrack(track)}
                  className="px-3 py-1 bg-green-600 rounded hover:bg-green-500 text-sm"
                >
                  ▶ Play
                </button>

                <button
                  onClick={() => removeTrack(track.id)}
                  className="px-3 py-1 bg-red-600 rounded hover:bg-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
