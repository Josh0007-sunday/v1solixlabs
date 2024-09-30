// import React, { useState, useMemo } from 'react';
// import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// import * as anchor from '@project-serum/anchor';
// import { PublicKey, SystemProgram } from '@solana/web3.js';
// import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token';
// import idl from '../web3/idl.json';

// // USDC Mint address (Devnet USDC Mint)
// const USDC_MINT = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

// // Program ID of your deployed program
// const programId = new PublicKey("21oqKA3dG8G2aLgRZyZvpJYDA3VXaJNvPSKwftHkhwQr");

// const USDCVaultComponent: React.FC = () => {
//   const { connection } = useConnection();
//   const { publicKey, sendTransaction } = useWallet();
//   const anchorWallet = useAnchorWallet();
//   const [depositAmount, setDepositAmount] = useState<string>('10');
//   const [status, setStatus] = useState<string>('');

//   const program = useMemo(() => {
//     if (anchorWallet) {
//       const provider = new anchor.AnchorProvider(
//         connection,
//         anchorWallet,
//         { preflightCommitment: 'confirmed' }
//       );
//       return new anchor.Program(idl as anchor.Idl, programId, provider);
//     }
//   }, [connection, anchorWallet]);

//   const initializeVault = async () => {
//     if (!publicKey || !program) return;

//     try {
//       const [vaultPda] = await PublicKey.findProgramAddress(
//         [Buffer.from("vault"), publicKey.toBuffer()],
//         program.programId
//       );

//       const tx = await program.methods.initializeVault()
//         .accounts({
//           owner: publicKey,
//           vault: vaultPda,
//           systemProgram: SystemProgram.programId,
//         })
//         .transaction();

//       const signature = await sendTransaction(tx, connection);
//       await connection.confirmTransaction(signature, 'confirmed');

//       setStatus(`Vault initialized with PDA: ${vaultPda.toBase58()}`);
//     } catch (error) {
//       console.error("Error initializing vault:", error);
//       setStatus(`Error initializing vault: ${error as Error}`);
//     }
//   };

//   const deposit = async () => {
//     if (!publicKey || !program) return;

//     try {
//       const [vaultPda] = await PublicKey.findProgramAddress(
//         [Buffer.from("vault"), publicKey.toBuffer()],
//         program.programId
//       );

//       const userTokenAccount = await getAssociatedTokenAddress(
//         USDC_MINT,
//         publicKey
//       );

//       const [vaultTokenAccount] = await PublicKey.findProgramAddress(
//         [Buffer.from("token_account"), vaultPda.toBuffer()],
//         program.programId
//       );

//       const amount = new anchor.BN(parseFloat(depositAmount) * 1e6); // Convert to USDC decimals

//       const tx = await program.methods.deposit(amount)
//         .accounts({
//           owner: publicKey,
//           vault: vaultPda,
//           userTokenAccount,
//           vaultTokenAccount,
//           usdcMint: USDC_MINT,
//           tokenProgram: TOKEN_PROGRAM_ID,
//           associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
//           systemProgram: SystemProgram.programId,
//           rent: anchor.web3.SYSVAR_RENT_PUBKEY,
//         })
//         .transaction();

//       const signature = await sendTransaction(tx, connection);
//       await connection.confirmTransaction(signature, 'confirmed');

//       setStatus(`Deposited ${depositAmount} USDC into the vault.`);
//     } catch (error) {
//       console.error("Error depositing:", error);
//       setStatus(`Error depositing: ${error as Error}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
//       <h1 className="text-3xl font-bold mb-6">USDC Vault</h1>
//       <WalletMultiButton className="mb-6" />
//       {publicKey && (
//         <div className="space-y-4">
//           <button 
//             onClick={initializeVault}
//             className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
//           >
//             Initialize Vault
//           </button>
//           <div className="flex space-x-4">
//             <input
//               type="number"
//               value={depositAmount}
//               onChange={(e) => setDepositAmount(e.target.value)}
//               placeholder="Amount to deposit"
//               className="bg-gray-800 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//             />
//             <button 
//               onClick={deposit}
//               className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
//             >
//               Deposit USDC
//             </button>
//           </div>
//         </div>
//       )}
//       <p className="mt-4 text-sm">{status}</p>
//     </div>
//   );
// };

// export default USDCVaultComponent;




// import React, { useState, useMemo } from 'react';
// import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// import * as anchor from '@project-serum/anchor';
// import { PublicKey, SystemProgram } from '@solana/web3.js';
// import {
//     TOKEN_PROGRAM_ID,
//     ASSOCIATED_TOKEN_PROGRAM_ID,
//     getAssociatedTokenAddress
// } from '@solana/spl-token';
// import idl from '../web3/idl.json';

// const USDC_MINT = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");
// const programId = new PublicKey("21oqKA3dG8G2aLgRZyZvpJYDA3VXaJNvPSKwftHkhwQr");

// const USDCVaultComponent: React.FC = () => {
//   const { connection } = useConnection();
//   const { publicKey, sendTransaction } = useWallet();
//   const anchorWallet = useAnchorWallet();
//   const [depositAmount, setDepositAmount] = useState<string>('10');
//   const [withdrawAmount, setWithdrawAmount] = useState<string>('10');
//   const [status, setStatus] = useState<string>('');

//   const program = useMemo(() => {
//     if (anchorWallet) {
//       const provider = new anchor.AnchorProvider(
//         connection,
//         anchorWallet,
//         { preflightCommitment: 'confirmed' }
//       );
//       return new anchor.Program(idl as anchor.Idl, programId, provider);
//     }
//   }, [connection, anchorWallet]);

//   const verifyVaultInitialized = async () => {
//     if (!publicKey || !program) return false;

//     const [vaultPda] = await PublicKey.findProgramAddress(
//       [Buffer.from("vault"), publicKey.toBuffer()],
//       program.programId
//     );

//     try {
//       const vaultAccount = await program.account.vault.fetch(vaultPda);
//       return vaultAccount.owner.equals(publicKey);
//     } catch (error) {
//       console.error("Error verifying vault initialization:", error);
//       return false;
//     }
//   };

//   const checkVaultBalance = async (vaultTokenAccount: PublicKey) => {
//     try {
//       const tokenAccountInfo = await connection.getTokenAccountBalance(vaultTokenAccount);
//       console.log("Vault Token Account Balance:", tokenAccountInfo.value.uiAmount);
//       return tokenAccountInfo.value.uiAmount;
//     } catch (error) {
//       console.error("Error checking vault balance:", error);
//       return null;
//     }
//   };

//   const initializeVault = async () => {
//     if (!publicKey || !program) return;

//     try {
//       const [vaultPda] = await PublicKey.findProgramAddress(
//         [Buffer.from("vault"), publicKey.toBuffer()],
//         program.programId
//       );

//       const tx = await program.methods.initializeVault()
//         .accounts({
//           owner: publicKey,
//           vault: vaultPda,
//           systemProgram: SystemProgram.programId,
//         })
//         .transaction();

//       const signature = await sendTransaction(tx, connection);
//       await connection.confirmTransaction(signature, 'confirmed');

//       setStatus(`Vault initialized with PDA: ${vaultPda.toBase58()}`);
//     } catch (error) {
//       console.error("Error initializing vault:", error);
//       setStatus(`Error initializing vault: ${error instanceof Error ? error.message : String(error)}`);
//     }
//   };

//   const deposit = async () => {
//     if (!publicKey || !program) return;

//     try {
//       const [vaultPda] = await PublicKey.findProgramAddress(
//         [Buffer.from("vault"), publicKey.toBuffer()],
//         program.programId
//       );

//       const userTokenAccount = await getAssociatedTokenAddress(
//         USDC_MINT,
//         publicKey
//       );

//       const [vaultTokenAccount] = await PublicKey.findProgramAddress(
//         [Buffer.from("token_account"), vaultPda.toBuffer()],
//         program.programId
//       );

//       const amount = new anchor.BN(parseFloat(depositAmount) * 1e6);

//       const tx = await program.methods.deposit(amount)
//         .accounts({
//           owner: publicKey,
//           vault: vaultPda,
//           userTokenAccount,
//           vaultTokenAccount,
//           usdcMint: USDC_MINT,
//           tokenProgram: TOKEN_PROGRAM_ID,
//           associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
//           systemProgram: SystemProgram.programId,
//           rent: anchor.web3.SYSVAR_RENT_PUBKEY,
//         })
//         .transaction();

//       const signature = await sendTransaction(tx, connection);
//       await connection.confirmTransaction(signature, 'confirmed');

//       const vaultBalance = await checkVaultBalance(vaultTokenAccount);
//       setStatus(`Deposited ${depositAmount} USDC into the vault. Current Vault Balance: ${vaultBalance}`);
//     } catch (error) {
//       console.error("Error depositing:", error);
//       setStatus(`Error depositing: ${error instanceof Error ? error.message : String(error)}`);
//     }
//   };

//   const withdraw = async () => {
//     if (!publicKey || !program) {
//       console.error("Wallet not connected or program not initialized");
//       setStatus("Wallet not connected or program not initialized");
//       return;
//     }

//     try {
//       const isVaultInitialized = await verifyVaultInitialized();
//       if (!isVaultInitialized) {
//         setStatus("Error: Vault not initialized. Please initialize the vault first.");
//         return;
//       }

//       const [vaultPda] = await PublicKey.findProgramAddress(
//         [Buffer.from("vault"), publicKey.toBuffer()],
//         program.programId
//       );

//       // Correctly fetch the token account associated with the vault
//       const vaultTokenAccount = await getAssociatedTokenAddress(USDC_MINT, vaultPda, true);

//       console.log("Vault Token Account Address: ", vaultTokenAccount.toBase58());

//       const vaultBalanceBefore = await checkVaultBalance(vaultTokenAccount);
//       console.log("Vault Balance Before Withdrawal: ", vaultBalanceBefore);

//       if (vaultBalanceBefore === null || vaultBalanceBefore < parseFloat(withdrawAmount)) {
//         setStatus(`Error: Insufficient balance in vault. Available: ${vaultBalanceBefore} USDC`);
//         return;
//       }

//       const userTokenAccount = await getAssociatedTokenAddress(USDC_MINT, publicKey);

//       const amount = new anchor.BN(parseFloat(withdrawAmount) * 1_000_000);

//       const tx = await program.methods.withdraw(amount)
//         .accounts({
//           owner: publicKey,
//           vault: vaultPda,
//           userTokenAccount,
//           vaultTokenAccount,
//           usdcMint: USDC_MINT,
//           tokenProgram: TOKEN_PROGRAM_ID,
//           associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
//           systemProgram: SystemProgram.programId,
//           rent: anchor.web3.SYSVAR_RENT_PUBKEY,
//         })
//         .transaction();

//       const signature = await sendTransaction(tx, connection, { skipPreflight: true });
//       await connection.confirmTransaction(signature, 'confirmed');

//       const vaultBalanceAfter = await checkVaultBalance(vaultTokenAccount);
//       setStatus(`Withdrew ${withdrawAmount} USDC from the vault. Current Vault Balance: ${vaultBalanceAfter}`);
//     } catch (error) {
//       console.error("Detailed error:", error);
//       setStatus(`Error withdrawing: ${error instanceof Error ? error.message : String(error)}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
//       <h1 className="text-3xl font-bold mb-6">USDC Vault</h1>
//       <WalletMultiButton className="mb-6" />
//       {publicKey && (
//         <div className="space-y-4">
//           <button
//             onClick={initializeVault}
//             className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
//           >
//             Initialize Vault
//           </button>
//           <div className="flex space-x-4">
//             <input
//               type="number"
//               value={depositAmount}
//               onChange={(e) => setDepositAmount(e.target.value)}
//               placeholder="Amount to deposit"
//               className="bg-gray-800 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//             />
//             <button
//               onClick={deposit}
//               className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
//             >
//               Deposit USDC
//             </button>
//           </div>
//           <div className="flex space-x-4">
//             <input
//               type="number"
//               value={withdrawAmount}
//               onChange={(e) => setWithdrawAmount(e.target.value)}
//               placeholder="Amount to withdraw"
//               className="bg-gray-800 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//             />
//             <button
//               onClick={withdraw}
//               className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
//             >
//               Withdraw USDC
//             </button>
//           </div>
//         </div>
//       )}
//       {status && <p className="mt-4 text-yellow-300">{status}</p>}
//     </div>
//   );
// };

// export default USDCVaultComponent;
