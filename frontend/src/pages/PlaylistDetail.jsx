import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { usePlayer } from "../context/PlayerContext";
import Layout from "../components/Layout";

export default function PlaylistDetail() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const { playTrack } = usePlayer();

    useEffect(() => {
        api.get(`/playlists/${id}`).then((res) => {
        setPlaylist(res.data);
        });
    }, [id]);

    if (!playlist) {
        return (
        <Layout>
            <div className="p-4 text-white">Loading...</div>
        </Layout>
        );
    }

    return (
        <Layout>
        <div className="p-4 text-white">
            <h1 className="text-2xl mb-4">{playlist.name}</h1>

            {playlist.tracks.length === 0 && (
            <p className="text-gray-400">No tracks in this playlist</p>
            )}

            {playlist.tracks.map((track) => (
            <div
                key={track.id}
                className="bg-gray-800 p-3 mb-2 rounded flex justify-between items-center hover:bg-gray-700 transition"
            >
                <div>
                <p className="font-semibold">{track.title}</p>
                <p className="text-sm text-gray-400">{track.artist}</p>
                </div>

                {/* ▶ PLAY */}
                <button
                onClick={() =>
                    playTrack({
                    id: track.id,
                    title: track.title,
                    artist: track.artist,
                    audio_url: track.audio_url,
                    })
                }
                className="text-green-400 hover:text-green-300 transition"
                >
                ▶
                </button>
            </div>
            ))}
        </div>
        </Layout>
    );
}
