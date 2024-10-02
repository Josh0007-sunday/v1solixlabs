import React, { useState, useEffect } from 'react';
import Sidebar from '../../utils/sidebar/page';
import Header from '../../utils/header/page';
import Footer from '../../utils/footer/page';
import { SimplifiedTransactionDetail, useFetchTransactions } from '../../web3plugin/fetchtransaction';
import { getSolBalance, getSolPriceInUSD, getStakeAccounts } from '../../web3plugin/portfolio';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import DashboardWithLulo from '../lulo/page';
import PieChart from '../chart/page';
import Marginfi from '../marginfi/page';
// UPDATE: Import splDiscriminate function
import { splDiscriminate } from '../../util';
import { getTokenAccounts } from '../../web3plugin/portfolio';

// Update the environment variable prefix for Vite
const RPC_ENDPOINTS = [
    import.meta.env.VITE_SOLANA_RPC_ENDPOINT,
    'https://mainnet.helius-rpc.com/?api-key=4c4a4f43-145d-4406-b89c-36ad977bb738',
    clusterApiUrl('mainnet-beta'),
];

interface StakeAccount {
    address: string;
    balance: number;
}

interface TokenAccount {
    address: string;
    balance: number;
}

const DashboardLayout: React.FC = () => {
    const { publicKey, connected } = useWallet();
    useConnection();
    const [solBalance, setSolBalance] = useState<number | null>(null);
    const [solPrice, setSolPrice] = useState<number | null>(null);
    const [tokenAccounts, setTokenAccounts] = useState<TokenAccount[]>([]);
    const [stakeAccounts, setStakeAccounts] = useState<StakeAccount[]>([]);
    const [, setLoading] = useState<boolean>(false);
    const [, setError] = useState<string | null>(null);
    const [showBalance, setShowBalance] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<SimplifiedTransactionDetail[]>([]);
    // UPDATE: Add state for discriminated value
    const [discriminatedValue, setDiscriminatedValue] = useState<string>('');

    const fetchTransactions = useFetchTransactions();

    const tryRPCEndpoints = async (fetchFunction: (connection: Connection) => Promise<any>) => {
        for (const endpoint of RPC_ENDPOINTS) {
            if (endpoint) {
                try {
                    const tempConnection = new Connection(endpoint);
                    const result = await fetchFunction(tempConnection);
                    return result;
                } catch (error) {
                    console.error(`Error with endpoint ${endpoint}:`, error);
                }
            }
        }
        throw new Error("All RPC endpoints failed");
    };

    const toggleBalance = () => {
        setShowBalance((prevShowBalance) => !prevShowBalance);
    };

    const obfuscateValue = (value: string): string => "*".repeat(value.length);

    useEffect(() => {
        if (connected && publicKey) {
            fetchAllData();
            // UPDATE: Use splDiscriminate with the public key
            const discriminated = splDiscriminate(publicKey.toString());
            setDiscriminatedValue(discriminated);
        } else {
            resetState();
        }
    }, [connected, publicKey]);

    const resetState = () => {
        setSolBalance(null);
        setSolPrice(null);
        setTokenAccounts([]);
        setStakeAccounts([]);
        setTransactions([]);
        setError(null);
        setLoading(false);
        // UPDATE: Reset discriminated value
        setDiscriminatedValue('');
    };

    const fetchAllData = async () => {
        if (!publicKey) return;

        setLoading(true);
        setError(null);

        try {
            const [balance, price, tokenData, stakeData] = await Promise.all([
                tryRPCEndpoints((conn) => getSolBalance(publicKey, conn)),
                getSolPriceInUSD(),
                tryRPCEndpoints((conn) => getTokenAccounts(publicKey, conn)),
                tryRPCEndpoints((conn) => getStakeAccounts(publicKey, conn)),
            ]);

            setSolBalance(balance);
            setSolPrice(price);
            setTokenAccounts(tokenData);
            setStakeAccounts(stakeData);

            const txData = await tryRPCEndpoints((conn) => fetchTransactions(conn));
            setTransactions(txData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fetchTokenAccounts = async () => {
        if (!publicKey) {
            setError('Wallet not connected');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const connection = new Connection(clusterApiUrl('mainnet-beta')); // Or use your custom RPC endpoint
            const accounts = await getTokenAccounts(publicKey, connection);
            setTokenAccounts(accounts);
        } catch (err) {
            console.error('Error fetching token accounts:', err);
            setError('Failed to fetch token accounts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (connected) {
            fetchTokenAccounts();
        }
    }, [connected, publicKey]);

    const data = [
        { label: 'A', value: 30, color: '#FF6384' },
        { label: 'B', value: 20, color: '#36A2EB' },
        { label: 'C', value: 50, color: '#FFCE56' },
    ];

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
                        <div className="px-4 py-6 sm:px-0">
                            <div className="flex flex-col space-y-6">



                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white overflow-hidden shadow rounded-lg">
                                        <div className="px-4 py-5 sm:p-6">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">Net Worth</h3>
                                                <button onClick={toggleBalance} className="text-sm text-blue-500 hover:text-blue-700">
                                                    {showBalance ? <FaEyeSlash className="inline mr-1" /> : <FaEye className="inline mr-1" />}
                                                    {showBalance ? "Hide" : "Show"}
                                                </button>
                                            </div>
                                            {solBalance !== null && solPrice !== null && (
                                                <>
                                                    <div className="mt-1 text-3xl font-semibold text-gray-900">
                                                        ${showBalance ? (solBalance * solPrice).toFixed(2) : obfuscateValue("1000")}
                                                    </div>
                                                    <div className="mt-1">
                                                        <span className="text-2xl font-semibold text-gray-900">
                                                            {showBalance ? solBalance.toFixed(2) : obfuscateValue("0.82456098")}
                                                        </span>
                                                        <span className="text-xl text-gray-500"> SOL</span>
                                                    </div>
                                                </>
                                            )}

                                           


                                        </div>
                                    </div>
                                    <div className="bg-white overflow-hidden shadow rounded-lg">
                                        <div className="px-4 py-5 sm:p-6">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">NFTs</h3>
                                            <div className="mt-1 text-3xl font-semibold text-gray-900">
                                                {showBalance ? tokenAccounts.length : obfuscateValue("10")}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white overflow-hidden shadow rounded-lg">
                                        <div className="px-4 py-5 sm:p-6">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Stakes</h3>
                                            <div className="mt-1 text-3xl font-semibold text-gray-900">
                                                {showBalance ? stakeAccounts.length : obfuscateValue("10")}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-white overflow-hidden shadow rounded-lg">
                                        <div className="px-4 py-5 sm:p-6">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Transactions</h3>
                                            <div className="h-64 overflow-y-auto">
                                                <ul className="divide-y divide-gray-200">
                                                    {transactions.map((tx) => (
                                                        <li key={tx.signature} className="py-4">
                                                            <div className="flex items-center justify-between">
                                                                <div className="text-sm font-medium text-gray-900">{tx.message}</div>
                                                                <div className="text-sm text-gray-500">{tx.date}</div>
                                                            </div>
                                                            <div className="mt-1 text-sm text-gray-500">
                                                                Status: {tx.status}
                                                            </div>
                                                            <div className="mt-1 text-sm text-blue-500">
                                                                <a href={`https://explorer.solana.com/tx/${tx.signature}`} target="_blank" rel="noopener noreferrer">
                                                                    {tx.signature.slice(0, 8)}...
                                                                </a>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white overflow-hidden shadow rounded-lg">
                                        <div className="px-4 py-5 sm:p-6">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Portfolio Distribution</h3>
                                            <PieChart data={data} />
                                        </div>
                                    </div>
                                </div>

                                {/*Place for token account*/}
                                <div className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Token Accounts</h3>
                                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                                            {/* Scrollable Table for Token Accounts */}
                                            <div className="max-h-64 overflow-y-auto overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50 sticky top-0">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                Token Address
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                Balance (SOL)
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {tokenAccounts.length > 0 ? (
                                                            tokenAccounts.map((account) => (
                                                                <tr key={account.address}>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                        {account.address}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                        {account.balance.toFixed(6)} SOL
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td
                                                                    colSpan={2}
                                                                    className="px-6 py-4 text-sm font-medium text-gray-500 text-center"
                                                                >
                                                                    No token accounts found
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* UPDATE: Add new section for discriminated value */}
                                <div className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Discriminated Value</h3>
                                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                                            {discriminatedValue}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <DashboardWithLulo />
                                </div>

                                <div>
                                    <Marginfi />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <Footer />
            </div>

        </div>


    );
};

export default DashboardLayout;