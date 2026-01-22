import { useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext";

export default function AudioPlayer() {
const { currentTrack, isPlaying, playTrack, pauseTrack, audioRef } = usePlayer();

const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);

if (!currentTrack) return null;


useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateTime);

    return () => {
    audio.removeEventListener("timeupdate", updateTime);
    };
}, [audioRef]);


const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
};

return (
    <div className="fixed bottom-0 w-full bg-black text-white p-4">

      {/* Song Info */}
    <div className="mb-2">
        <p className="font-semibold">{currentTrack.title}</p>
        <p className="text-sm text-gray-400">{currentTrack.artist}</p>
    </div>

      {/* Seek Bar */}
    <input
        type="range"
        min="0"
        max="100"
        value={duration ? (currentTime / duration) * 100 : 0}
        onChange={handleSeek}
        className="w-full"
    />

      {/* Controls */}
    <div className="mt-2 flex justify-end">
        {isPlaying ? (
        <button onClick={pauseTrack}>⏸ Pause</button>
        ) : (
        <button onClick={() => playTrack(currentTrack)}>▶ Play</button>
        )}
</div>

    </div>
);
}
