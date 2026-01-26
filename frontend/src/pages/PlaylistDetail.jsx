import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function PlaylistDetail() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        fetchPlaylist();
    }, []);

    const fetchPlaylist = async () => {
        const res = await api.get(`/playlists/${id}`);
        setPlaylist(res.data);
    };

    const removeTrack = async (trackId) => {
        await api.delete(`/playlists/${id}/tracks/${trackId}`);
        fetchPlaylist();
    };

    if (!playlist) return null;

    return (
        <div className="p-6">
        <h1 className="text-xl font-bold mb-4">{playlist.name}</h1>

        {playlist.tracks.map((track) => (
            <div
            key={track.id}
            className="flex justify-between items-center border p-3 mb-2 rounded"
            >
            <span>
                {track.title} – {track.artist}
            </span>

            <button
                onClick={() => removeTrack(track.id)}
                className="text-red-600 text-sm"
            >
                ❌ Remove
            </button>
            </div>
        ))}
        </div>
    );
}
