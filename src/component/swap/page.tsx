import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import MainLayout from "../../utils/mainlayout";
import Disconnected from "../../disconnected/page"; // Import Disconnected component

interface SwapTerminalProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const SwapTerminal: React.FC<SwapTerminalProps> = ({
  isDarkTheme,
  toggleTheme,
}) => {
  const { publicKey } = useWallet(); // Destructure publicKey from useWallet
  const [isLoading, setIsLoading] = useState(false);

  const initializeJupiter = async () => {
    if (publicKey) {
      setIsLoading(true);
      try {
        const script = document.createElement("script");
        script.src = "https://terminal.jup.ag/main-v2.js";
        script.onload = () => launchJupiter();
        document.head.appendChild(script);

        return () => document.head.removeChild(script);
      } catch (error) {
        console.error("Error loading Jupiter Terminal:", error);
        alert("Failed to load swap terminal");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    initializeJupiter();
  }, [publicKey]);

  const launchJupiter = () => {
    if ((window as any).Jupiter && publicKey) {
      (window as any).Jupiter.init({
        displayMode: "integrated",
        integratedTargetId: "integrated-swap-terminal",
        endpoint:
          "https://mainnet.helius-rpc.com/?api-key=4c4a4f43-145d-4406-b89c-36ad977bb738",
        strictTokenList: false,
        defaultExplorer: "SolanaFM",
        formProps: {
          initialAmount: "1000000",
          initialInputMint: "So11111111111111111111111111111111111111112", // Example: SOL
          initialOutputMint: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E", // Example: USDC
        },
      });
    } else {
      console.error("Jupiter not loaded or wallet not connected");
    }
  };

  const renderSwapContent = () =>
    isLoading ? (
      <div className="flex justify-center items-center h-96">
        <p className={`${isDarkTheme ? "text-gray-300" : "text-gray-500"}`}>
          Loading Swap Terminal...
        </p>
      </div>
    ) : (
      <div
        id="integrated-swap-terminal"
        className="w-full h-full"
        style={{ minHeight: "500px" }}
      >
        {/* Jupiter Terminal will render here */}
      </div>
    );

  return (
    <MainLayout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
      <div
        className={`min-h-screen ${
          isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {publicKey ? (
              renderSwapContent()
            ) : (
              <Disconnected isDarkTheme={isDarkTheme} />
            )}
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

export default SwapTerminal;
