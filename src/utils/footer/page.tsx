import React from 'react';

const Footer: React.FC<{ isDarkTheme: boolean }> = ({ isDarkTheme }) => {
    return (
        <footer className={`${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-500'} shadow-sm mt-auto`}>
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <p>&copy; 2024 Solix</p>
                    <p>All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
