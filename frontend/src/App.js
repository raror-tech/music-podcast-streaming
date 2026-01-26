import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";
import MiniPlayer from "./components/MiniPlayer";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Playlists from "./pages/Playlists";
import PlaylistDetail from "./pages/PlaylistDetail";
import RecentlyPlayed from "./pages/RecentlyPlayed";

// 🔐 simple auth check
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-black text-white pb-24">
          <Routes>
            {/* LOGIN */}
            <Route
              path="/login"
              element={
                isAuthenticated() ? <Navigate to="/" /> : <Login />
              }
            />

            {/* HOME */}
            <Route
              path="/"
              element={
                isAuthenticated() ? <Home /> : <Navigate to="/login" />
              }
            />

            {/* SEARCH */}
            <Route
              path="/search"
              element={
                isAuthenticated() ? <Search /> : <Navigate to="/login" />
              }
            />

            {/* PLAYLISTS */}
            <Route
              path="/playlists"
              element={
                isAuthenticated() ? <Playlists /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/playlists/:id"
              element={
                isAuthenticated() ? (
                  <PlaylistDetail />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* RECENT */}
            <Route
              path="/recent"
              element={
                isAuthenticated() ? (
                  <RecentlyPlayed />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          {/* GLOBAL PLAYER */}
          {isAuthenticated() && <MiniPlayer />}
        </div>
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;
