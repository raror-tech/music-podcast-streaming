import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import api from "../services/api";
import Layout from "../components/Layout";

export default function PlaylistDetail() {
  const { id } = useParams();
  const { playTrack } = usePlayer();

  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  // 📂 FETCH PLAYLIST (memoized to satisfy ESLint)
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
      fetchPlaylist(); // refresh list
    } catch {
      alert("Failed to remove track");
    }
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
        <h1 className="text-2xl font-bold text-white mb-4">
          {playlist.name}
        </h1>

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
              {/* 🎶 INFO */}
              <div>
                <p className="text-white font-medium">
                  {track.title}
                </p>
                <p className="text-gray-400 text-sm">
                  {track.artist}
                </p>
              </div>

              {/* 🎛 ACTIONS */}
              <div className="flex gap-3">
                {/* ▶ PLAY */}
                <button
                  onClick={() => playTrack(track)}
                  className="px-3 py-1 bg-green-600 rounded hover:bg-green-500 text-sm"
                >
                  ▶ Play
                </button>

                {/* ❌ REMOVE */}
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
