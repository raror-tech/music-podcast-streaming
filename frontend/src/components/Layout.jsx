import Header from "./Header";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-black text-white pb-20">
        <Header />
        <main>{children}</main>
        </div>
    );
}
