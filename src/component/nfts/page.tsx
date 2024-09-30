
import React, { useEffect, useState } from 'react';
import { getNFTsForWallet, NFTMetadata } from '../../web3plugin/fetchallnfts';
import { useWallet } from '@solana/wallet-adapter-react';
import Sidebar from '../../utils/sidebar/page';
import Header from '../../utils/header/page';
import Footer from '../../utils/footer/page';

const NFTDisplay: React.FC = () => {
    const [nfts, setNfts] = useState<NFTMetadata[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const wallet = useWallet();

    const loadNFTs = async () => {
        if (wallet.publicKey) {
            setIsLoading(true);
            try {
                const nftData = await getNFTsForWallet(wallet.publicKey.toBase58());
                setNfts(nftData);
            } catch (error) {
                console.error('Error loading NFTs:', error);
                alert('Failed to load NFTs');
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        loadNFTs();
    }, [wallet.publicKey]);

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
                            {isLoading ? (
                                <div className="flex justify-center items-center h-96">
                                    <p className="text-gray-500">Loading NFTs...</p>
                                </div>
                            ) : nfts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {nfts.map((nft, index) => (
                                        <div key={index} className="nft-card shadow-lg rounded-lg p-4 bg-gray-800 text-white">
                                            {nft.image ? (
                                                <img
                                                    src={nft.image}
                                                    alt={nft.name}
                                                    className="w-full h-48 object-cover rounded-lg"
                                                    width={300}
                                                    height={192}
                                                />
                                            ) : (
                                                <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                                                    <p>No Image Available</p>
                                                </div>
                                            )}
                                            <div className="mt-4">
                                                <h3 className="text-lg font-bold text-center">{nft.name}</h3>
                                                <p className="text-center text-gray-400">{nft.symbol}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-center items-center h-96">
                                    <p className="text-gray-500">No NFTs found for this wallet.</p>
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

export default NFTDisplay;
