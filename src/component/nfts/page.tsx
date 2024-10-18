import React, { useEffect, useState } from "react";
import { getNFTsForWallet, NFTMetadata } from "../../web3plugin/fetchallnfts";
import { useWallet } from "@solana/wallet-adapter-react";
import MainLayout from "../../utils/mainlayout";
import Disconnected from "../../disconnected/page"; // Import the Disconnected component

interface NFTDisplayProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const NFTDisplay: React.FC<NFTDisplayProps> = ({
  isDarkTheme,
  toggleTheme,
}) => {
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
        console.error("Error loading NFTs:", error);
        alert("Failed to load NFTs");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadNFTs();
  }, [wallet.publicKey]);

  // Check if the wallet is disconnected
  if (!wallet.publicKey) {
    return <Disconnected isDarkTheme={isDarkTheme} />;
  }

  return (
    <MainLayout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
      <div
        className={`flex h-screen ${
          isDarkTheme ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="flex-1 flex flex-col">
          <main
            className={`flex-1 ${isDarkTheme ? "bg-gray-900" : "bg-gray-100"}`}
          >
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-full">
              <div className="px-4 py-6 sm:px-0 h-full">
                {isLoading ? (
                  <div className="flex justify-center items-center h-96">
                    <p
                      className={`${
                        isDarkTheme ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Loading NFTs...
                    </p>
                  </div>
                ) : nfts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {nfts.map((nft, index) => (
                      <div
                        key={index}
                        className={`nft-card shadow-lg rounded-lg p-4 ${
                          isDarkTheme
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-900"
                        }`}
                      >
                        {nft.image ? (
                          <img
                            src={nft.image}
                            alt={nft.name}
                            className="w-full h-48 object-cover rounded-lg"
                            width={300}
                            height={192}
                          />
                        ) : (
                          <div
                            className={`w-full h-48 ${
                              isDarkTheme ? "bg-gray-700" : "bg-gray-200"
                            } rounded-lg flex items-center justify-center`}
                          >
                            <p>No Image Available</p>
                          </div>
                        )}
                        <div className="mt-4">
                          <h3 className="text-lg font-bold text-center">
                            {nft.name}
                          </h3>
                          <p
                            className={`text-center ${
                              isDarkTheme ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {nft.symbol}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-96">
                    <p
                      className={`${
                        isDarkTheme ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      No NFTs found for this wallet.
                    </p>
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

export default NFTDisplay;
