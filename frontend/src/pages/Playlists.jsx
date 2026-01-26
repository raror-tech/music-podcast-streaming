import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  // 📂 FETCH PLAYLISTS
  const fetchPlaylists = async () => {
    try {
      const res = await api.get("/playlists");
      setPlaylists(res.data);
    } catch (err) {
      alert("Failed to load playlists");
    } finally {
      setLoading(false);
    }
  };

  // ➕ CREATE PLAYLIST
  const createPlaylist = async () => {
    if (!name.trim()) {
      alert("Please enter a playlist name");
      return;
    }

    try {
      await api.post("/playlists", { name });
      setName("");
      fetchPlaylists();
    } catch {
      alert("Failed to create playlist");
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-4">
          My Playlists
        </h1>

        {/* ➕ CREATE PLAYLIST */}
        <div className="flex gap-2 mb-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Playlist name"
            className="flex-1 p-2 rounded bg-gray-800 text-white outline-none"
          />
          <button
            onClick={createPlaylist}
            className="bg-green-600 hover:bg-green-500 px-4 rounded text-black font-medium"
          >
            Create
          </button>
        </div>

        {/* ⏳ LOADING */}
        {loading && <p className="text-gray-400">Loading playlists...</p>}

        {/* 📭 EMPTY STATE */}
        {!loading && playlists.length === 0 && (
          <p className="text-gray-400">
            You don’t have any playlists yet.
          </p>
        )}

        {/* 📂 PLAYLIST LIST */}
        <div className="space-y-3">
          {playlists.map((p) => (
            <Link
              key={p.id}
              to={`/playlists/${p.id}`}
              className="block bg-gray-800 p-3 rounded hover:bg-gray-700 transition"
            >
              🎵 {p.name}
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
