// import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import { Connection, PublicKey } from '@solana/web3.js';
// import { useEffect, useState } from 'react';
// import { getConfig, MarginfiClient } from '@mrgnlabs/marginfi-client-v2';

// type Balance = {
//   bankAddress: string;
//   mintAddress: string;
//   name: string;
//   symbol: string;
//   logo: string;
//   assets: { quantity: number; usd: number };
//   liabilities: { quantity: number; usd: number };
// };

// type Account = {
//   assets: number;
//   liabilities: number;
//   address: string;
//   healthFactor: number;
//   balances: { lending: Balance[]; borrowing: Balance[] };
// };

// const Marginfi = () => {
//   const { connection } = useConnection();
//   const { publicKey, connected } = useWallet();
//   const [accounts, setAccounts] = useState<Account[]>([]);
//   const [errorMsg, setErrorMsg] = useState<string>('');

//   // Function to fetch marginfi positions
//   const fetchPositions = async (publicKey: PublicKey) => {
//     try {
//       const AlchemyUrl = "https://mainnet.helius-rpc.com/?api-key=4c4a4f43-145d-4406-b89c-36ad977bb738"; // Replace with your actual API key
//       const connection = new Connection(AlchemyUrl, 'confirmed');

//       const config = await getConfig('production');
//       const marginfiClient = await MarginfiClient.fetch(config, {} as any, connection);
//       const accountsRaw = await marginfiClient.getMarginfiAccountsForAuthority(publicKey);

//       // Ensure accountsRaw is an array before mapping
//       if (!Array.isArray(accountsRaw)) {
//         throw new Error('Unexpected response format for accounts');
//       }

//       const fetchedAccounts = accountsRaw.map((account) => {
//         const { assets, liabilities } = account.computeHealthComponents(2);
//         const maintenanceComponentsWithBiasAndWeighted = account.computeHealthComponents(1);

//         const healthFactor =
//           maintenanceComponentsWithBiasAndWeighted.assets.isZero()
//             ? 1
//             : maintenanceComponentsWithBiasAndWeighted.assets
//               .minus(maintenanceComponentsWithBiasAndWeighted.liabilities)
//               .dividedBy(maintenanceComponentsWithBiasAndWeighted.assets)
//               .toNumber();

//         return {
//           assets: assets.toNumber(),
//           liabilities: liabilities.toNumber(),
//           address: account.address.toBase58(),
//           healthFactor: parseFloat((healthFactor * 100).toFixed(2)), // Convert to percentage
//           balances: {
//             lending: [],  // Example, fill in with actual data
//             borrowing: [],  // Example, fill in with actual data
//           }
//         };
//       });

//       setAccounts(fetchedAccounts);  // Update state with fetched accounts
//     } catch (error) {
//       console.error('Error fetching accounts:', error); // Log error details
//       setErrorMsg('Error fetching accounts');
//     }
//   };

//   // Fetch data when wallet is connected
//   useEffect(() => {
//     if (connected && publicKey) {
//       fetchPositions(publicKey);
//     }
//   }, [connected, publicKey]);

//   if (!connected) {
//     return <p className="text-center">Connect your wallet to view positions</p>;
//   }

//   return (
//     <div className="p-4">
//       {errorMsg && <p className="text-red-500">{errorMsg}</p>}
//       {accounts.length > 0 ? (
//         accounts.map((account, index) => (
//           <div key={index} className="border p-4 my-2 rounded-md">
//             <p><strong>Account Address:</strong> {account.address}</p>
//             <p><strong>Health Factor:</strong> {account.healthFactor}%</p>
//             {/* Render balances (lending/borrowing) */}
//             <div className="mt-2">
//               <h4 className="font-semibold">Lending Positions:</h4>
//               {account.balances.lending.length === 0 ? (
//                 <p>No open lending positions</p>
//               ) : (
//                 account.balances.lending.map((balance, idx) => (
//                   <div key={idx} className="border-t py-2">
//                     <img src={balance.logo} alt={balance.name} className="w-8 h-8 inline mr-2" />
//                     <span>{balance.name} - {balance.assets.quantity} {balance.symbol}</span>
//                   </div>
//                 ))
//               )}
//             </div>
//             <div className="mt-2">
//               <h4 className="font-semibold">Borrowing Positions:</h4>
//               {account.balances.borrowing.length === 0 ? (
//                 <p>No open borrowing positions</p>
//               ) : (
//                 account.balances.borrowing.map((balance, idx) => (
//                   <div key={idx} className="border-t py-2">
//                     <img src={balance.logo} alt={balance.name} className="w-8 h-8 inline mr-2" />
//                     <span>{balance.name} - {balance.liabilities.quantity} {balance.symbol}</span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No accounts found</p>
//       )}
//     </div>
//   );
// };

// export default Marginfi;

const Marginfi= () => {
  return (
    <div className="px-4 py-6 w-full sm:px-0">
      <div className="grid grid-cols-1 gap-6">
        <h2 className="text-2xl font-bold text-black mb-1">Marginfi</h2>
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col p-6 w-full">
          <div className="flex-1 pr-6">
            <h2 className="text-2xl font-bold mb-4">Deposit Information</h2>
            <div className="flex justify-center">
              <p>coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Marginfi;
