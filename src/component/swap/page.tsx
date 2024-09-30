import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Sidebar from '../../utils/sidebar/page';
import Header from '../../utils/header/page';
import Footer from '../../utils/footer/page';

function Terminal() {
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    if (connected) {
      // Dynamically load the Jupiter script
      const script = document.createElement('script');
      script.src = "https://terminal.jup.ag/main-v2.js";
      script.onload = () => launchJupiter(); // Initialize Jupiter after the script loads
      document.head.appendChild(script);

      // Cleanup the script on component unmount
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
        initialAmount: "888888880000", // BONK token
        initialInputMint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", // BONK Mint Address
        initialOutputMint: "AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR", // Output Mint Address
      },
    }) : console.error("Jupiter script not loaded or wallet not connected");
  }

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
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-80 flex items-center justify-center">
                {/* Jupiter Terminal */}
                <div className="w-full max-w-md h-80">
                  <div
                    id="integrated-terminal"
                    className="w-full h-full"
                    style={{
                      color: "black", // Force black text color
                    }}
                  ></div>
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
}

export default Terminal;
