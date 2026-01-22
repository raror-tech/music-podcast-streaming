import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { PlayerProvider } from "./context/PlayerContext";
import MiniPlayer from "./components/MiniPlayer";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Playlists from "./pages/Playlists";
import PlaylistDetail from "./pages/PlaylistDetail";
import RecentlyPlayed from "./pages/RecentlyPlayed";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔐 Check login on load + when token changes
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <PlayerProvider>
      <BrowserRouter>
        {/* padding-bottom so content doesn't hide behind mini player */}
        <div className="min-h-screen bg-black text-white pb-24">
          <Routes>
            {/* 🔑 LOGIN */}
            <Route path="/login" element={<Login />} />

            {/* 🏠 HOME */}
            <Route
              path="/"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
            />

            {/* 🔍 SEARCH */}
            <Route
              path="/search"
              element={isLoggedIn ? <Search /> : <Navigate to="/login" />}
            />

            {/* 📂 PLAYLISTS */}
            <Route
              path="/playlists"
              element={isLoggedIn ? <Playlists /> : <Navigate to="/login" />}
            />
            <Route
              path="/playlists/:id"
              element={
                isLoggedIn ? <PlaylistDetail /> : <Navigate to="/login" />
              }
            />

            {/* 🕘 RECENT */}
            <Route
              path="/recent"
              element={isLoggedIn ? <RecentlyPlayed /> : <Navigate to="/login" />}
            />

            {/* ❓ FALLBACK */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          {/* 🎧 GLOBAL MINI PLAYER */}
          <MiniPlayer />
        </div>
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;
