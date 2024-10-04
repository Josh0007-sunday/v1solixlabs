import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import your icons
import '@solana/wallet-adapter-react-ui/styles.css';

interface HeaderProps {
    isDarkTheme: boolean;
    toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkTheme, toggleTheme }) => {
    return (
        <header className={`shadow-sm ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className={`text-2xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                    Dashboard
                </h1>
                <div className="flex items-center space-x-4">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-colors duration-300 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}
                        aria-label="Toggle theme"
                    >
                        {isDarkTheme ? <FaSun size={20} /> : <FaMoon size={20} />}
                    </button>
                    {/* Wallet Button */}
                    <WalletMultiButton className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" />
                </div>
            </div>
        </header>
    );
};

export default Header;
