import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === "/";

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-black">
        {/* ⬅ Back to Home (hide on home page) */}
        {!isHome && (
            <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-white text-sm transition"
            >
            ← Home
</button>

        )}

        {/* Spacer */}
        <div />

        {/* 🔐 Logout */}
        <button
        onClick={handleLogout}
        className="text-red-400 hover:text-red-300 text-sm font-medium transition"
>
    Logout
</button>

        </div>
    );
}