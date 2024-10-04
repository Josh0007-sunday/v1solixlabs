import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

interface SidebarProps {
    onToggle?: (isOpen: boolean) => void;
    isDarkTheme: boolean; // Accept the isDarkTheme prop
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle, isDarkTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsOpen(false);  // Start with the sidebar closed on larger screens
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const toggleSidebar = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        if (onToggle) {
            onToggle(newIsOpen);
        }
    };

    return (
        <div className={`fixed top-0 left-0 h-full ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300 ease-in-out z-20`}>
            <button
                onClick={toggleSidebar}
                className={`absolute top-4 ${isMobile ? 'left-4' : 'right-4'} z-30 p-1 rounded-full ${isDarkTheme ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} focus:outline-none`}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
            <aside className={`${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'} shadow-md h-screen ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300 ease-in-out overflow-hidden`}>
                <div className={`p-4 ${isOpen ? 'block' : 'hidden'}`}>
                    <img src={logo} alt="Logo" className="w-[150px] h-[50px]" />
                </div>
                <nav className={`${isOpen ? 'mt-8' : 'mt-16'}`}>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/dashboard" className={`flex items-center px-4 py-2 ${isDarkTheme ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                                <span className="mr-3">🏠</span> {isOpen && 'Dashboard'}
                            </Link>
                        </li>
                        <li>
                            <Link to="/swap" className={`flex items-center px-4 py-2 ${isDarkTheme ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                                <span className="mr-3">🔃</span> {isOpen && 'Swap'}
                            </Link>
                        </li>
                        <li>
                            <Link to="/nfts" className={`flex items-center px-4 py-2 ${isDarkTheme ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                                <span className="mr-3">🖼️</span> {isOpen && 'NFTs'}
                            </Link>
                        </li>
                        <li>
                            <Link to="/buymecofee" className={`flex items-center px-4 py-2 ${isDarkTheme ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                                <span className="mr-3">☕</span> {isOpen && 'Buy Me Coffee'}
                            </Link>
                        </li>
                        <li>
                            <Link to="/vault" className={`flex items-center px-4 py-2 ${isDarkTheme ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                                <span className="mr-3">🏗️</span> {isOpen && 'Savings'}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
