// components/Dashboard.js
import dashboard from "../../utils/images/dashboard.png";
export default function Dashboard() {
    return (
        <section className="bg-black text-white py-16 relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="relative">
                    <img
                        src={dashboard}
                        alt="Dashboard"
                        className="mx-auto rounded-lg shadow-lg relative z-10 w-full max-w-[1200px] object-cover"
                    />
                    <div className="absolute inset-0 z-0 rounded-lg blur-xl bg-blue-500 opacity-50"></div>
                </div>
                <p className="text-center mt-8 text-gray-400"></p>
            </div>
        </section>

    );
}
