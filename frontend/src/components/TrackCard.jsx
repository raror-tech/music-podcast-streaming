import { usePlayer } from "../context/PlayerContext";

export default function TrackCard({ track }) {
    const { playTrack } = usePlayer();
    return ( 
    <div className="bg-gray-900 p-4 rounded">
    <h3 className="text-white">{track.title}</h3> 
    <p className="text-gray-400">{track.artist}</p> 
    <button className="mt-2 text-green-400" onClick={() => playTrack(track)} > ▶ Play </button> 
    </div> ); 
    }

