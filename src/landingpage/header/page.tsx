import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wallet, Menu, X } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Header() {
  const [showPopup, setShowPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { connected } = useWallet();

  useEffect(() => {
    if (connected) {
      navigate("/dashboard");
    }
  }, [connected, navigate]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <div className="bg-blue-500 font-extrabold text-white text-center py-1 text-lg">
        Solix Finance is under active development🏗️
      </div>

      <header className="flex justify-between items-center py-4 px-4 md:px-8 bg-black text-white">
        <h1 className="text-2xl font-bold">SOLIX</h1>

        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link to="/solix-oracle-feed">Feeds</Link>
            </li>
            <li>
              <Link to="#faq">FAQ</Link>
            </li>
            <li>
              <Link to="#about">About</Link>
            </li>
            <li>
              <Link to="#pricing">Pricing</Link>
            </li>
            <li>
              <Link to="#blog">Blog</Link>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex space-x-4">
          <button className="py-2 px-4 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
            Learn More
          </button>
          <button
            onClick={() => setShowPopup(true)}
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded font-semibold text-white flex items-center transition-colors"
          >
            <Wallet className="mr-2" size={18} />
            LAUNCH APP
          </button>
        </div>

        <button onClick={toggleMenu} className="md:hidden">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {menuOpen && (
        <div className="md:hidden bg-black text-white py-4 px-4">
          <ul className="space-y-2">
            <li>
              <Link to="/solix-oracle-feed">Feeds</Link>
            </li>
            <li>
              <Link to="#faq">FAQ</Link>
            </li>
            <li>
              <Link to="#about">About</Link>
            </li>
            <li>
              <Link to="#pricing">Pricing</Link>
            </li>
            <li>
              <Link to="#blog">Blog</Link>
            </li>
          </ul>
          <div className="mt-4 space-y-2">
            <button className="w-full py-2 px-4 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
              Learn More
            </button>
            <button
              onClick={() => {
                setShowPopup(true);
                setMenuOpen(false);
              }}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded font-semibold text-white flex items-center justify-center transition-colors"
            >
              <Wallet className="mr-2" size={18} />
              LAUNCH APP
            </button>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-900 bg-opacity-90 p-8 rounded-xl shadow-xl max-w-md w-full border-2 border-blue-500 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-white text-center">
              Connect Wallet
            </h2>
            <p className="mb-6 text-gray-300 text-center">
              Connect your wallet to access the dashboard.
            </p>
            <div className="flex justify-center">
              <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700 !rounded-md" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
