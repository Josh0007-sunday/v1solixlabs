import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../utils/sidebar/page';
import Header from '../../utils/header/page';
import Footer from '../../utils/footer/page';

const BuyMeCoffeeForm = () => {
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
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <Header />

                {/* Main content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
                            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Buy Me a Coffee</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                        Amount (SOL)
                                    </label>
                                    <input
                                        type="number"
                                        id="amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="0.1"
                                        step="0.1"
                                        min="0.1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="receiverAddress" className="block text-sm font-medium text-gray-700">
                                        Receiver's Wallet Address
                                    </label>
                                    <input
                                        type="text"
                                        id="receiverAddress"
                                        value={receiverAddress}
                                        onChange={(e) => setReceiverAddress(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="Enter Solana wallet address"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Buy Coffee
                                </button>
                            </form>

                            {blinkUrl && (
                                <div className="mt-4">
                                    <Link to={blinkUrl}>
                                        <p className="text-indigo-600 hover:underline">{blinkUrl}</p>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
};

export default BuyMeCoffeeForm;
