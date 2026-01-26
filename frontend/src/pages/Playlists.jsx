import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Playlists() {
    const [playlists, setPlaylists] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        const res = await api.get("/playlists");
        setPlaylists(res.data);
    };

    const createPlaylist = async () => {
        if (!name.trim()) return alert("Enter playlist name");

        await api.post("/playlists", { name });
        setName("");
        fetchPlaylists();
    };

    return (
        <Layout>
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Playlists</h1>

            {/* ➕ CREATE PLAYLIST */}
            <div className="flex gap-2 mb-6">
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Playlist name"
                className="p-2 rounded bg-gray-800 text-white"
            />
            <button
                onClick={createPlaylist}
                className="bg-green-500 text-black px-4 rounded"
            >
                Create
            </button>
            </div>

            {/* 📂 PLAYLIST LIST */}
            {playlists.map((p) => (
            <Link
                key={p.id}
                to={`/playlists/${p.id}`}
                className="block bg-gray-800 p-3 mb-2 rounded hover:bg-gray-700"
            >
                {p.name}
            </Link>
            ))}
        </div>
        </Layout>
    );
}
