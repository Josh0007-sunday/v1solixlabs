import React, { useState, useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import QRCodeStyling from "qr-code-styling";
import { FaCopy, FaPaperPlane, FaQrcode } from "react-icons/fa";
import MainLayout from "../../utils/mainlayout"; // Adjust this import as needed

interface SendReceiveProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}



const SendReceive: React.FC<SendReceiveProps> = ({ isDarkTheme }) => {
  const [isReceive, setIsReceive] = useState(true);
  const [amount, setAmount] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const { publicKey } = useWallet();
  const qrCodeRef = useRef<HTMLDivElement | null>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);

  const toggleMode = () => {
    setIsReceive(!isReceive);
  };

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      alert("Address copied to clipboard!");
    }
  };

  useEffect(() => {
    // Initialize QRCodeStyling instance
    if (qrCodeRef.current && publicKey) {
      if (!qrCodeInstance.current) {
        qrCodeInstance.current = new QRCodeStyling({
          width: 200,
          height: 200,
          data: publicKey.toBase58(),
          dotsOptions: {
            color: isDarkTheme ? "#ffffff" : "#000000",
            type: "rounded",
          },
          backgroundOptions: {
            color: isDarkTheme ? "#000000" : "#ffffff",
          },
        });
        qrCodeInstance.current.append(qrCodeRef.current);
      } else {
        qrCodeInstance.current.update({
          data: publicKey.toBase58(),
        });
      }
    }

    return () => {
      qrCodeInstance.current?.update({ data: "" }); // Clear the QR code
    };
  }, [publicKey, isDarkTheme]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle send functionality here
    console.log("Sending", amount, "SOL to", receiverAddress);
  };

  return (
    <MainLayout isDarkTheme={isDarkTheme} toggleTheme={() => {}}>
      <div
        className={`max-w-md mx-auto mt-10 p-6 rounded-lg shadow-xl ${
          isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="flex justify-between mb-6">
          <button
            onClick={toggleMode}
            className={`flex items-center px-4 py-2 rounded-md ${
              isReceive
                ? "bg-blue-500 text-white"
                : isDarkTheme
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <FaQrcode className="mr-2" />
            Receive
          </button>
          <button
            onClick={toggleMode}
            className={`flex items-center px-4 py-2 rounded-md ${
              !isReceive
                ? "bg-blue-500 text-white"
                : isDarkTheme
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <FaPaperPlane className="mr-2" />
            Send
          </button>
        </div>

        {/* Receive Mode */}
        {isReceive && (
          <div className="transition-opacity duration-300 opacity-100">
            <h2 className="text-2xl font-bold mb-4">Receive SOL</h2>
            {publicKey ? (
              <div className="flex flex-col items-center">
                {/* QR Code */}
                <div ref={qrCodeRef} className="mb-4"></div>

                {/* Public Key Display and Copy Button */}
                <div className="flex items-center p-4 border border-dashed border-gray-500 rounded-md">
                  <p className="text-sm font-mono break-all mr-2">
                    {publicKey.toBase58()}
                  </p>
                  <button
                    onClick={handleCopy}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaCopy />
                  </button>
                </div>
                <p className="mt-4 text-sm">
                  Scan the QR code or copy the address
                </p>
              </div>
            ) : (
              <p>Please connect your wallet to receive SOL</p>
            )}
          </div>
        )}

        {/* Send Mode */}
        {!isReceive && (
          <div className="transition-opacity duration-300 opacity-100">
            <h2 className="text-2xl font-bold mb-4">Send SOL</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="amount"
                  className={`block text-sm font-medium ${
                    isDarkTheme ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Amount (SOL)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 rounded-md ${
                    isDarkTheme
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-black border-gray-300"
                  } shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200`}
                  placeholder="0.1"
                  step="0.1"
                  min="0.1"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="receiverAddress"
                  className={`block text-sm font-medium ${
                    isDarkTheme ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Receiver's Wallet Address
                </label>
                <input
                  type="text"
                  id="receiverAddress"
                  value={receiverAddress}
                  onChange={(e) => setReceiverAddress(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 rounded-md ${
                    isDarkTheme
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-black border-gray-300"
                  } shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200`}
                  placeholder="Enter Solana wallet address"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
              >
                Send SOL
              </button>
            </form>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SendReceive;
