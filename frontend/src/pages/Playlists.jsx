import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Playlists() {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        api
        .get("/playlists")
        .then((res) => setPlaylists(res.data))
        .catch((err) => {
            console.error("Failed to load playlists", err);
        });
    }, []);

    return (
        <Layout>
        <div className="p-4 text-white">
            <h1 className="text-2xl mb-4">Your Playlists</h1>

            {playlists.length === 0 && (
            <p className="text-gray-400">No playlists created yet</p>
            )}

            {playlists.map((playlist) => (
            <Link
                to={`/playlists/${playlist.id}`}
                key={playlist.id}
                className="block"
            >
                <div className="bg-gray-800 p-3 mb-2 rounded hover:bg-gray-700 transition">
                {playlist.name}
                </div>
            </Link>
            ))}
        </div>
        </Layout>
    );
}
