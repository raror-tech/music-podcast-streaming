import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

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
        if (!name) return alert("Enter playlist name");

        await api.post("/playlists", { name });
        setName("");
        fetchPlaylists();
    };

    return (
        <div className="p-6">
        <h1 className="text-xl font-bold mb-4">My Playlists</h1>

        {/* Create Playlist */}
        <div className="flex gap-2 mb-4">
            <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Playlist name"
            className="border p-2 rounded"
            />
            <button
            onClick={createPlaylist}
            className="bg-black text-white px-4 rounded"
            >
            Create
            </button>
        </div>

        {/* List */}
        {playlists.map((p) => (
            <Link
            key={p.id}
            to={`/playlists/${p.id}`}
            className="block p-3 border mb-2 rounded hover:bg-gray-100"
            >
            {p.name}
            </Link>
        ))}
        </div>
    );
}
