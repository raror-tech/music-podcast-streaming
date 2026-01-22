import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Home() {
  // 🕒 Time-based greeting
    const hour = new Date().getHours();
    const greeting =
        hour < 12
        ? "Good Morning ☀️"
        : hour < 18
        ? "Good Afternoon 🎶"
        : "Good Evening 🎧";

    return (
        <Layout>
        <div className="px-8 py-6">
            {/* 🔝 PAGE HEADER (content header, not global header) */}
            <div className="border-b border-gray-800 pb-6">
            <h1 className="text-3xl font-bold text-green-400">
                {greeting}
            </h1>
            <p className="text-gray-400 mt-1">
                What would you like to listen to today?
            </p>
            </div>

            {/* 🎵 MAIN CONTENT */}
            <div className="mt-8 space-y-10">
            {/* QUICK ACTIONS */}
            <div>
                <h2 className="text-xl mb-4">Quick Access</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <HomeCard
                    title="Search"
                    subtitle="Find songs & podcasts"
                    link="/search"
                />
                <HomeCard
                    title="Playlists"
                    subtitle="Your curated lists"
                    link="/playlists"
                />
                <HomeCard
                    title="Recently Played"
                    subtitle="Continue listening"
                    link="/recent"
                />
                </div>
            </div>

            {/* AI SECTION */}
            <div>
                <h2 className="text-xl mb-4">Made for You 🤖</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <AICard title="Daily Mix" />
                <AICard title="Chill Vibes" />
                <AICard title="Focus & Code" />
                </div>
            </div>
            </div>
        </div>
        </Layout>
    );
    }

    function HomeCard({ title, subtitle, link }) {
    return (
        <Link
        to={link}
        className="bg-gray-900 p-6 rounded-xl hover:bg-gray-800 hover:scale-[1.02] transition transform"
        >
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
        </Link>
    );
    }

    function AICard({ title }) {
    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl hover:scale-[1.02] transition transform">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm mt-1">
            Personalized by AI
        </p>
        </div>
    );
}
