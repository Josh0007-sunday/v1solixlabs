import React, { useState, useEffect } from 'react';
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
import MainLayout from '../../utils/mainlayout';

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

interface DashboardLayoutProps {
    isDarkTheme: boolean;
    toggleTheme: () => void;
}


const DashboardLayout: React.FC<DashboardLayoutProps> = ({ isDarkTheme, toggleTheme }) => {
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
         <MainLayout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
            <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
                <main className="p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="space-y-6">
                            {/* Net Worth, NFTs, and Stakes */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Net Worth */}
                                <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-6`}>
                                    <div className="flex items-center justify-between">
                                        <h3 className={`text-lg font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>Net Worth</h3>
                                        <button onClick={toggleBalance} className={`text-sm ${isDarkTheme ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'}`}>
                                            {showBalance ? <FaEyeSlash className="inline mr-1" /> : <FaEye className="inline mr-1" />}
                                            {showBalance ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    {solBalance !== null && solPrice !== null && (
                                        <>
                                            <div className={`mt-2 text-3xl font-semibold ${isDarkTheme ? 'text-gray-100' : 'text-gray-900'}`}>
                                                ${showBalance ? (solBalance * solPrice).toFixed(2) : obfuscateValue("1000")}
                                            </div>
                                            <div className="mt-1">
                                                <span className={`text-2xl font-semibold ${isDarkTheme ? 'text-gray-100' : 'text-gray-900'}`}>
                                                    {showBalance ? solBalance.toFixed(2) : obfuscateValue("0.82456098")}
                                                </span>
                                                <span className={`text-xl ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}> SOL</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {/* NFTs */}
                                <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-6`}>
                                    <h3 className={`text-lg font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>NFTs</h3>
                                    <div className={`mt-2 text-3xl font-semibold ${isDarkTheme ? 'text-gray-100' : 'text-gray-900'}`}>
                                        {showBalance ? tokenAccounts.length : obfuscateValue("10")}
                                    </div>
                                </div>
                                {/* Stakes */}
                                <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-6`}>
                                    <h3 className={`text-lg font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>Stakes</h3>
                                    <div className={`mt-2 text-3xl font-semibold ${isDarkTheme ? 'text-gray-100' : 'text-gray-900'}`}>
                                        {showBalance ? stakeAccounts.length : obfuscateValue("10")}
                                    </div>
                                </div>
                            </div>

                            {/* Recent Transactions and Portfolio Distribution */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Recent Transactions */}
                                <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-6`}>
                                    <h3 className={`text-lg font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'} mb-4`}>Recent Transactions</h3>
                                    <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
                                        <ul className={`divide-y ${isDarkTheme ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                            {transactions.map((tx) => (
                                                <li key={tx.signature} className="py-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className={`text-sm font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>{tx.message}</div>
                                                        <div className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{tx.date}</div>
                                                    </div>
                                                    <div className={`mt-1 text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        Status: {tx.status}
                                                    </div>
                                                    <div className="mt-1 text-sm text-blue-500">
                                                        <a
                                                            href={`https://explorer.solana.com/tx/${tx.signature}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={isDarkTheme ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'}
                                                        >
                                                            {tx.signature.slice(0, 8)}...
                                                        </a>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                {/* Portfolio Distribution */}
                                <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-6`}>
                                    <h3 className={`text-lg font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'} mb-4`}>Portfolio Distribution</h3>
                                    <PieChart data={data} />
                                </div>
                            </div>

                            {/* Token Accounts Section */}
                            <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-6`}>
                                <h3 className={`text-lg font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'} mb-4`}>Token Accounts</h3>
                                <div className="mt-1 text-3xl font-semibold text-gray-900">
                                    <div className="max-h-64 overflow-y-auto overflow-x-auto">
                                        <table className={`min-w-full divide-y ${isDarkTheme ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                            <thead className={isDarkTheme ? 'bg-gray-700' : 'bg-gray-50'}>
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className={`px-6 py-3 text-left text-xs font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}
                                                    >
                                                        Token Address
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className={`px-6 py-3 text-left text-xs font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}
                                                    >
                                                        Balance (SOL)
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} divide-y ${isDarkTheme ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                                {tokenAccounts.length > 0 ? (
                                                    tokenAccounts.map((account) => (
                                                        <tr key={account.address}>
                                                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>
                                                                {account.address}
                                                            </td>
                                                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
                                                                {account.balance.toFixed(6)} SOL
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan={2}
                                                            className={`px-6 py-4 text-sm font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} text-center`}
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

                            {/* Discriminated Value Section */}
                            <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-6`}>
                                <h3 className={`text-lg font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>Discriminated Value</h3>
                                <div className={`mt-2 text-3xl font-semibold ${isDarkTheme ? 'text-gray-100' : 'text-gray-900'}`}>
                                    {discriminatedValue}
                                </div>
                            </div>

                            {/* DashboardWithLulo */}
                            <div>
                                <DashboardWithLulo isDarkTheme={isDarkTheme} />
                            </div>

                            {/* Marginfi */}
                            <div>
                                <Marginfi isDarkTheme={isDarkTheme} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
};

export default DashboardLayout;