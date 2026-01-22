import { useEffect, useState } from "react";
import api from "../services/api";
import { usePlayer } from "../context/PlayerContext";

export default function AIRecommendations() {
    const [tracks, setTracks] = useState([]);
    const { playTrack } = usePlayer();

    useEffect(() => {
        api.get("/recommendations")
        .then(res => setTracks(res.data))
        .catch(() => {});
    }, []);

    if (tracks.length === 0) return null;

    return (
        <div className="mt-10">
        <h2 className="text-xl text-white mb-4">
            🤖 Made For You
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tracks.map(track => (
            <div
                key={track.id}
                className="bg-gray-900 p-4 rounded-xl hover:bg-gray-800 transition"
            >
                <p className="font-semibold text-white">
                {track.title}
                </p>
                <p className="text-sm text-gray-400">
                {track.artist}
                </p>

                <button
                onClick={() => playTrack(track)}
                className="mt-3 text-green-400"
                >
                ▶ Play
                </button>
            </div>
            ))}
        </div>
        </div>
    );
}
