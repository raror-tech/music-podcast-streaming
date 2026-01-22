import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import TrackCard from "../components/TrackCard";
import PodcastCard from "../components/PodcastCard";

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({
        tracks: [],
        podcasts: [],
        external_tracks: [],
        external_podcasts: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!query.trim()) {
        setResults({
            tracks: [],
            podcasts: [],
            external_tracks: [],
            external_podcasts: [],
        });
        setLoading(false);
        setError("");
        return;
        }

        setLoading(true);
        setError("");

        const timer = setTimeout(() => {
        api
            .get(`/search?q=${encodeURIComponent(query)}`)
            .then((res) => {
            const data = res.data || {};

            // ✅ DEFENSIVE NORMALIZATION (CRITICAL FIX)
            setResults({
                tracks: Array.isArray(data.tracks) ? data.tracks : [],
                podcasts: Array.isArray(data.podcasts) ? data.podcasts : [],
                external_tracks: Array.isArray(data.external_tracks)
                ? data.external_tracks
                : [],
                external_podcasts: Array.isArray(data.external_podcasts)
                ? data.external_podcasts
                : [],
            });

            setLoading(false);
            })
            .catch((err) => {
            console.error("Search error:", err);
            setError("Failed to search content");
            setLoading(false);
            });
        }, 500); // debounce

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <Layout>
        <div className="p-6">
            {/* 🔍 SEARCH INPUT */}
            <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs, artists, or podcasts..."
            className="w-full p-3 bg-gray-900 text-white rounded outline-none focus:ring-2 focus:ring-green-500"
            />

            {loading && <p className="text-white mt-4">Searching...</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {!loading &&
            query &&
            results.tracks.length === 0 &&
            results.podcasts.length === 0 &&
            results.external_tracks.length === 0 &&
            results.external_podcasts.length === 0 && (
                <p className="text-gray-400 mt-4">No results found</p>
            )}

            {/* 🎵 LOCAL TRACKS */}
            {results.tracks.length > 0 && (
            <>
                <h2 className="mt-6 text-xl text-white">Songs</h2>
                {results.tracks.map((track) => (
                <TrackCard key={track.id} track={track} />
                ))}
            </>
            )}

            {/* 🎙 LOCAL PODCASTS */}
            {results.podcasts.length > 0 && (
            <>
                <h2 className="mt-6 text-xl text-white">Podcasts</h2>
                {results.podcasts.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
                ))}
            </>
            )}

            {/* 🌍 EXTERNAL MUSIC (MusicBrainz) */}
            {results.external_tracks.length > 0 && (
            <>
                <h2 className="mt-6 text-xl text-white">
                Discover Music (MusicBrainz)
                </h2>
                {results.external_tracks.map((track, index) => (
                <div
                    key={index}
                    className="bg-gray-800 p-3 mb-2 rounded"
                >
                    <p className="font-semibold">{track.title}</p>
                    <p className="text-sm text-gray-400">{track.artist}</p>
                    <p className="text-xs text-gray-500">
                    External • Metadata only
                    </p>
                </div>
                ))}
            </>
            )}

            {/* 🌍 EXTERNAL PODCASTS (PodcastIndex) */}
            {results.external_podcasts.length > 0 && (
            <>
                <h2 className="mt-6 text-xl text-white">
                Discover Podcasts (PodcastIndex)
                </h2>
                {results.external_podcasts.map((podcast, index) => (
                <div
                    key={index}
                    className="bg-gray-800 p-3 mb-2 rounded"
                >
                    <p className="font-semibold">{podcast.title}</p>
                    <p className="text-sm text-gray-400">
                    {podcast.author || "Unknown creator"}
                    </p>
                    <p className="text-xs text-gray-500">
                    External podcast
                    </p>
                </div>
                ))}
            </>
            )}
        </div>
        </Layout>
    );
}
