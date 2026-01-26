import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function PlaylistDetail() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        const fetchPlaylist = async () => {
        try {
            const res = await api.get(`/playlists/${id}`);
            setPlaylist(res.data);
        } catch {
            alert("Failed to load playlist");
        }
        };

        fetchPlaylist();
    }, [id]);

    const removeTrack = async (trackId) => {
        try {
        await api.delete(`/playlists/${id}/tracks/${trackId}`);
        // refresh playlist
        const res = await api.get(`/playlists/${id}`);
        setPlaylist(res.data);
        } catch {
        alert("Failed to remove track");
        }
    };

    if (!playlist) {
        return (
        <Layout>
            <p className="p-6">Loading playlist...</p>
        </Layout>
        );
    }

    return (
        <Layout>
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{playlist.name}</h1>

            {playlist.tracks.length === 0 && (
            <p className="text-gray-400">No songs in this playlist</p>
            )}

            {playlist.tracks.map((track) => (
            <div
                key={track.id}
                className="flex justify-between items-center bg-gray-800 p-3 mb-2 rounded"
            >
                <span>
                {track.title} – {track.artist}
                </span>

                <button
                onClick={() => removeTrack(track.id)}
                className="text-red-400 text-sm"
                >
                ❌ Remove
                </button>
            </div>
            ))}
        </div>
        </Layout>
    );
}
