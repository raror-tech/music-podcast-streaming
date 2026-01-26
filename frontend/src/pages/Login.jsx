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
            alert("Registration successful. Please login.");
            setIsRegister(false);
        } else {
            // ✅ LOGIN
            const res = await api.post("/auth/login", {
            email: form.email,
            password: form.password,
            });

            localStorage.setItem("token", res.data.access_token);
            navigate("/");
        }
        } catch (err) {
        alert(err.response?.data?.msg || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-80"
        >
            <h2 className="text-xl font-bold mb-4 text-center">
            {isRegister ? "Register" : "Login"}
            </h2>

            {isRegister && (
            <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className="w-full p-2 mb-3 border rounded"
                required
            />
            )}

            <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
            />

            <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
            />

            <button className="w-full bg-black text-white p-2 rounded">
            {isRegister ? "Register" : "Login"}
            </button>

            <p
            className="text-sm mt-3 text-center cursor-pointer text-blue-600"
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
