import { usePlayer } from "../context/PlayerContext";

export default function PodcastCard({ podcast }) {
    const { playTrack } = usePlayer();

    return (
        <div className="bg-gray-900 p-4 rounded">
        <h3 className="text-white">{podcast.title}</h3>
        <p className="text-gray-400">{podcast.description}</p>
        <button
            className="mt-2 text-green-400"
            onClick={() => playTrack(podcast)}
        >
            ▶ Play
        </button>
        </div>
    );
}
