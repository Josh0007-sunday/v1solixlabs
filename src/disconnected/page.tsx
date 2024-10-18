import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { AiOutlineDisconnect } from "react-icons/ai"; // For the disconnect icon

interface DisconnectedProps {
  isDarkTheme: boolean;
}

const Disconnected: React.FC<DisconnectedProps> = ({ isDarkTheme }) => {
  const { publicKey } = useWallet();

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${
        isDarkTheme ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {!publicKey && (
        <div className="flex flex-col items-center text-center">
          <AiOutlineDisconnect
            size={100}
            className={`${isDarkTheme ? "text-white" : "text-gray-700"}`}
          />
          <h1
            className={`text-3xl font-bold mb-6 ${
              isDarkTheme ? "text-white" : "text-black"
            }`}
          >
            Wallet Disconnected, Connect your SPL Wallet
          </h1>
          <Link to="/">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-lg hover:bg-blue-600 transition">
              Go to Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Disconnected;
