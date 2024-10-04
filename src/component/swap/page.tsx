import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import MainLayout from '../../utils/mainlayout';

interface TerminalProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ isDarkTheme, toggleTheme }) => {
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    if (connected) {
      const script = document.createElement('script');
      script.src = "https://terminal.jup.ag/main-v2.js";
      script.onload = () => launchJupiter();
      document.head.appendChild(script);

      return () => {
        if (script) {
          document.head.removeChild(script);
        }
      };
    }
  }, [connected]);

  function launchJupiter() {
    (window as any).Jupiter && publicKey ? (window as any).Jupiter.init({
      displayMode: "integrated",
      integratedTargetId: "integrated-terminal",
      endpoint: "https://mainnet.helius-rpc.com/?api-key=4c4a4f43-145d-4406-b89c-36ad977bb738",
      strictTokenList: false,
      defaultExplorer: "SolanaFM",
      formProps: {
        initialAmount: "888888880000",
        initialInputMint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
        initialOutputMint: "AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR",
      },
    }) : console.error("Jupiter script not loaded or wallet not connected");
  }

  return (
    <MainLayout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
      <div className={`flex h-full ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="flex-1 flex flex-col">
          <main className={`flex-1 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-full">
              <div className="px-4 py-6 sm:px-0 h-full">
                <div className={`border-4 border-dashed ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'} rounded-lg h-full flex items-center justify-center`}>
                  <div className="w-full max-w-md h-full flex items-center justify-center">
                    <div
                      id="integrated-terminal"
                      className="w-full h-full"
                      style={{
                        color: isDarkTheme ? 'white' : 'black',
                      }}
                    >
                      Jupiter Terminal
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
}

export default Terminal;