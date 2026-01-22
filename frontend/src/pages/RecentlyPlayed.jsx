import { useEffect, useState } from "react";
import api from "../services/api";
import { usePlayer } from "../context/PlayerContext";
import Layout from "../components/Layout";

export default function RecentlyPlayed() {
    const [tracks, setTracks] = useState([]);
    const { playTrack } = usePlayer();

    useEffect(() => {
        api
        .get("/recent")
        .then((res) => setTracks(res.data))
        .catch((err) => {
            console.error("Failed to load recently played", err);
        });
    }, []);

    return (
        <Layout>
        <div className="p-4 text-white">
            <h1 className="text-2xl mb-4">⏱ Recently Played</h1>

            {tracks.length === 0 && (
            <p className="text-gray-400">No recently played tracks</p>
            )}

            {tracks.map((track) => (
            <div
                key={track.id}
                className="bg-gray-800 p-3 mb-2 rounded flex justify-between items-center hover:bg-gray-700 transition"
            >
                <div>
                <p className="font-semibold">{track.title}</p>
                <p className="text-sm text-gray-400">{track.artist}</p>
                </div>

                {/* ▶ RESUME */}
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
                ▶ Resume
                </button>
            </div>
            ))}
        </div>
        </Layout>
    );
}
