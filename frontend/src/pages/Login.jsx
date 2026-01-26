import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        if (isRegister) {
            // ✅ REGISTER
            await api.post("/auth/register", form);
            alert("Registered successfully. Please login.");
            setIsRegister(false);
        } else {
            // ✅ LOGIN
            const res = await api.post("/auth/login", {
            email: form.email,
            password: form.password,
            });

            // 🔐 THIS IS WHAT App.js CHECKS
            localStorage.setItem("token", res.data.access_token);

            // Redirect to home
            navigate("/");
        }
        } catch (err) {
        alert(err.response?.data?.msg || "Authentication failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-6 rounded w-80"
        >
            <h2 className="text-xl font-bold mb-4 text-center">
            {isRegister ? "Register" : "Login"}
            </h2>

            {isRegister && (
            <input
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className="w-full p-2 mb-3 rounded bg-gray-800"
                required
            />
            )}

            <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-gray-800"
            required
            />

            <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded bg-gray-800"
            required
            />

            <button className="w-full bg-green-500 text-black p-2 rounded font-semibold">
            {isRegister ? "Register" : "Login"}
            </button>

            <p
            className="text-sm text-center mt-4 text-green-400 cursor-pointer"
            onClick={() => setIsRegister(!isRegister)}
            >
            {isRegister
                ? "Already have an account? Login"
                : "New user? Register"}
            </p>
        </form>
        </div>
    );
}
