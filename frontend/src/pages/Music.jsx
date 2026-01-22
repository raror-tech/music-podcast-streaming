import { useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Music() {
    const [tracks, setTracks] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { playTrack } = usePlayer();

    useEffect(() => {
        setLoading(true);
        setError("");

        const delay = query ? 500 : 0;

        const timer = setTimeout(() => {
        const request = query
            ? api.get(`/music/search?q=${query}`)
            : api.get("/music");

        request
            .then((res) => {
            setTracks(res.data);
            setLoading(false);
            })
            .catch(() => {
            setError("Failed to load music");
            setLoading(false);
            });
        }, delay);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <Layout>
        <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-4">Music</h1>

            {/* 🔍 SEARCH BAR */}
            <input
            type="text"
            placeholder="Search songs or artists..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 mb-6 rounded bg-gray-900 text-white outline-none focus:ring-2 focus:ring-green-500"
            />

            {loading && <p className="text-white">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && tracks.length === 0 && (
            <p className="text-gray-400">No songs found</p>
            )}

            <div className="grid gap-4">
            {tracks.map((track) => (
                <div
                key={track.id}
                onClick={() => playTrack(track)}
                className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700 transition"
                >
                <h3 className="text-white font-semibold">
                    {track.title}
                </h3>
                <p className="text-gray-400">
                    {track.artist || "Unknown Artist"}
                </p>
                </div>
            ))}
            </div>
        </div>
        </Layout>
    );
}
