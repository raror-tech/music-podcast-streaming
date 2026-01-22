import { createContext, useContext, useRef, useState } from "react";
import api from "../services/api";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const audioRef = useRef(new Audio());
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playTrack = async (track) => {
        const audio = audioRef.current;

        // 🚫 Guard: invalid audio
        if (!track?.audio_url || !track.audio_url.startsWith("http")) {
        console.error("Invalid audio URL:", track?.audio_url);
        alert("This track has no valid audio source");
        return;
        }

        // 🔁 Same track → toggle play/pause
        if (currentTrack && currentTrack.id === track.id) {
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            try {
            await audio.play();
            setIsPlaying(true);
            } catch (err) {
            console.error("Play failed:", err);
            }
        }
        return;
        }

        // 🔥 Reset audio before loading new track
        audio.pause();
        audio.src = "";
        audio.load();

        console.log("🎧 PLAYING URL:", track.audio_url);

        // ✅ Set Supabase public URL directly
        audio.src = track.audio_url;

        // ▶ Resume from last position (Day 9)
        try {
        const res = await api.get(`/recent/${track.id}`);
        audio.currentTime = Number(res.data.last_position) || 0;
        } catch {
        audio.currentTime = 0;
        }

        // ▶ Play when browser confirms readiness
        audio.oncanplay = () => {
        audio
            .play()
            .then(() => setIsPlaying(true))
            .catch((err) => console.error("Audio play error:", err));
        };

        // ✅ Update current track
        setCurrentTrack({
        id: track.id,
        title: track.title,
        artist: track.artist,
        audio_url: track.audio_url,
        });

        // ⏱ Save playback position
        audio.ontimeupdate = () => {
        api.post("/recent", {
            track_id: track.id,
            position: Math.floor(audio.currentTime),
        });
        };
    };

    const pauseTrack = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    return (
        <PlayerContext.Provider
        value={{ currentTrack, isPlaying, playTrack, pauseTrack }}
        >
        {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);
