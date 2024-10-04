import React, { useState } from 'react';
import MainLayout from '../../utils/mainlayout';

interface BuyMeCoffeeProp {
    isDarkTheme: boolean;
    toggleTheme: () => void;
}

const BuyMeCoffeeForm: React.FC<BuyMeCoffeeProp> = ({ isDarkTheme, toggleTheme }) => {
    const [amount, setAmount] = useState('');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [blinkUrl, setBlinkUrl] = useState<string | null>(null); // State for the generated link

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !receiverAddress) {
            alert('Please fill in both fields');
            return;
        }

        // Construct the URL with the form inputs
        const generatedUrl = `/pages/api/actions/donate?amount=${amount}&receiver=${receiverAddress}`;
        setBlinkUrl(generatedUrl);
    };

    return (
        <MainLayout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
            <div className={`flex h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="flex-1 flex flex-col">
                    <main className={`flex-1 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'}`}>
                        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-full">
                            <div className={`max-w-md mx-auto mt-10 p-6 rounded-lg shadow-xl ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
                                <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
                                    Buy Me a Coffee
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="amount" className={`block text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Amount (SOL)
                                        </label>
                                        <input
                                            type="number"
                                            id="amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className={`mt-1 block w-full px-3 py-2 rounded-md ${isDarkTheme ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'} shadow-sm focus:outline-none focus:ring-2 ${isDarkTheme ? 'focus:ring-indigo-500' : 'focus:ring-indigo-200'} focus:border-indigo-500 transition duration-200`}
                                            placeholder="0.1"
                                            step="0.1"
                                            min="0.1"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="receiverAddress" className={`block text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Receiver's Wallet Address
                                        </label>
                                        <input
                                            type="text"
                                            id="receiverAddress"
                                            value={receiverAddress}
                                            onChange={(e) => setReceiverAddress(e.target.value)}
                                            className={`mt-1 block w-full px-3 py-2 rounded-md ${isDarkTheme ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'} shadow-sm focus:outline-none focus:ring-2 ${isDarkTheme ? 'focus:ring-indigo-500' : 'focus:ring-indigo-200'} focus:border-indigo-500 transition duration-200`}
                                            placeholder="Enter Solana wallet address"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                                    >
                                        Buy Coffee
                                    </button>
                                </form>

                                {blinkUrl && (
                                    <div className="mt-4">
                                        <a href={blinkUrl} className="text-indigo-600 hover:underline">
                                            {blinkUrl}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </MainLayout>
    );
};

export default BuyMeCoffeeForm;
