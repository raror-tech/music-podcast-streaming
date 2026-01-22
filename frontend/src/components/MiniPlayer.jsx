import { usePlayer } from "../context/PlayerContext";

export default function MiniPlayer() {
    const { currentTrack, isPlaying, playTrack, pauseTrack } = usePlayer();

    // 🚫 Nothing playing → hide player
    if (!currentTrack) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-6 py-4 flex items-center justify-between z-50">
        {/* 🎵 TRACK INFO */}
        <div>
            <p className="text-white font-semibold">
            {currentTrack.title}
            </p>
            <p className="text-gray-400 text-sm">
            {currentTrack.artist || "Unknown Artist"}
            </p>
        </div>

        {/* ▶️ CONTROLS */}
        <div>
            {isPlaying ? (
            <button
                onClick={pauseTrack}
                className="text-green-400 text-xl hover:text-green-300"
            >
                ❚❚
            </button>
            ) : (
            <button
                onClick={() => playTrack(currentTrack)}
                className="text-green-400 text-xl hover:text-green-300"
            >
                ▶
            </button>
            )}
        </div>
        </div>
    );
}
