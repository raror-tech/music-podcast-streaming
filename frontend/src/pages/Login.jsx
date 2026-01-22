import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
        alert("Email and password required");
        return;
        }

        try {
        setLoading(true);
        const res = await api.post("/auth/login", { email, password });
        console.log("LOGIN RESPONSE:", res.data);

        localStorage.setItem("token", res.data.access_token);
        navigate("/"); // go to home
        } catch (err) {
        alert("Invalid credentials");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="w-full max-w-sm bg-gray-900 p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-green-400 text-center mb-6">
            🎵 Music App
            </h1>

            <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 rounded bg-gray-800 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 rounded bg-gray-800 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-500 text-black py-3 rounded font-semibold hover:bg-green-400 transition"
            >
            {loading ? "Logging in..." : "Log In"}
            </button>

            <p className="text-gray-400 text-sm text-center mt-6">
            AI-powered music & podcast streaming
            </p>
        </div>
        </div>
    );
}  