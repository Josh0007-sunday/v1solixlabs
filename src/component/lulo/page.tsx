// import React from 'react';
// import { useWallet } from '@solana/wallet-adapter-react';
// import useDepositInfo from '../../web3plugin/getlulo';


// const DashboardWithLulo: React.FC = () => {
//     const { publicKey } = useWallet();
//     const { depositInfo, isLoading, error } = useDepositInfo(publicKey?.toString() || null);

//     return (
//            <div className="px-4 py-6 w-full sm:px-0">
//             <div className="grid grid-cols-1 gap-6">
//                 <h2 className="text-2xl font-bold text-black mb-1">Lulo</h2>
//                 <div className="bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col p-6 w-full">
//                     <div className="flex-1 pr-6">
//                         <h2 className="text-2xl font-bold mb-4">Deposit Information</h2>
//                         {!publicKey ? (
//                             <p className="text-gray-500">Connect your wallet to view deposit information.</p>
//                         ) : isLoading ? (
//                             <p className="text-gray-500">Loading...</p>
//                         ) : error ? (
//                             <p className="text-red-500">{error}</p>
//                         ) : depositInfo ? (
//                             <div className="flex justify-center items-center">
//                                 <ul className="flex flex-wrap gap-6 list-none">
//                                     <li className="bg-gray-100 rounded-lg p-4 w-full md:w-auto text-gray-700">
//                                         <span className="font-bold">Current Orders:</span> {depositInfo.currentOrders}
//                                     </li>
//                                     <li className="bg-gray-100 rounded-lg p-4 w-full md:w-auto text-gray-700">
//                                         <span className="font-bold">Total Value:</span> {depositInfo.totalValue}
//                                     </li>
//                                     <li className="bg-gray-100 rounded-lg p-4 w-full md:w-auto text-gray-700">
//                                         <span className="font-bold">Interest Earned:</span> {depositInfo.interestEarned}
//                                     </li>
//                                     <li className="bg-gray-100 rounded-lg p-4 w-full md:w-auto text-gray-700">
//                                         <span className="font-bold">Real-time APY:</span> {depositInfo.realtimeAPY}%
//                                     </li>
//                                     <li className="bg-gray-100 rounded-lg p-4 w-full md:w-auto text-gray-700">
//                                         <span className="font-bold">Balance:</span> {depositInfo.balances}
//                                     </li>
//                                 </ul>
//                             </div>
//                         ) : (
//                             <p className="text-gray-500">No deposit information available.</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardWithLulo;

import React from 'react';

interface DashboardWithLuloProps {
  isDarkTheme: boolean;
}

const DashboardWithLulo: React.FC<DashboardWithLuloProps> = ({ isDarkTheme }) => {
  return (
    <div className={`px-4 py-6 w-full sm:px-0 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="grid grid-cols-1 gap-6">
        <h2 className={`text-2xl font-bold mb-1 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Lulo</h2>
        <div className={`shadow-lg rounded-lg border ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} flex flex-col p-6 w-full`}>
          <div className="flex-1 pr-6">
            <h2 className={`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Deposit Information</h2>
            <div className="flex justify-center">
              <p className={isDarkTheme ? 'text-gray-300' : 'text-gray-700'}>coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardWithLulo;