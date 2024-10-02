import React, { useState, useMemo } from 'react';
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import * as anchor from '@project-serum/anchor';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID} from '@solana/spl-token';
import {  getAssociatedTokenAddress } from "@solana/spl-token";
import idl from '../web3/idl.json';
import Sidebar from '../../utils/sidebar/page';
import Header from '../../utils/header/page';
import Footer from '../../utils/footer/page';

import { AnchorProvider, Program, Idl } from '@project-serum/anchor';

// USDC Mint address (Devnet USDC Mint)
const USDC_MINT = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

// Program ID of your deployed program
const programId = new PublicKey("21oqKA3dG8G2aLgRZyZvpJYDA3VXaJNvPSKwftHkhwQr");

const USDCVaultComponent: React.FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const anchorWallet = useAnchorWallet();
  const [depositAmount, setDepositAmount] = useState<string>('10');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('10');
  const [status, setStatus] = useState<string>('');
  const [isDepositing, setIsDepositing] = useState<boolean>(true); // Track mode


  const toggleMode = () => {
    setIsDepositing(!isDepositing);
    setDepositAmount(''); // Clear deposit amount on toggle
    setWithdrawAmount(''); // Clear withdraw amount on toggle
  };

  // Set percentage function for quick inputs
  const setPercentage = (percent: number) => {
    const amount = isDepositing ? depositAmount : withdrawAmount;
    const value = (parseFloat(amount) * (percent / 100)).toFixed(2);
    if (isDepositing) {
      setDepositAmount(value);
    } else {
      setWithdrawAmount(value);
    }
  };

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new AnchorProvider(
        connection,
        anchorWallet,
        { preflightCommitment: 'confirmed' }
      );
      return new Program(idl as Idl, programId, provider);
    }
  }, [connection, anchorWallet]);

  const initializeVault = async () => {
    if (!publicKey || !program) return;

    try {
      const [vaultPda] = await PublicKey.findProgramAddress(
        [Buffer.from("vault"), publicKey.toBuffer()],
        program.programId
      );

      const tx = await (program as any).methods.initializeVault()
        .accounts({
          owner: publicKey,
          vault: vaultPda,
          systemProgram: SystemProgram.programId,
        })
        .transaction();

      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      setStatus(`Vault initialized with PDA: ${vaultPda.toBase58()}`);
    } catch (error) {
      console.error("Error initializing vault:", error);
      setStatus(`Error initializing vault: ${error as Error}`);
    }
  };

  const deposit = async () => {
    if (!publicKey || !program) return;

    try {
      const [vaultPda] = await PublicKey.findProgramAddress(
        [Buffer.from("vault"), publicKey.toBuffer()],
        program.programId
      );

      const userTokenAccount = await getAssociatedTokenAddress(
        USDC_MINT, // Mint address (the token)
        publicKey, // Wallet's public key (owner of the token account)
        false, // Is it a multisig? Usually false.
        TOKEN_PROGRAM_ID, // Token program ID
        ASSOCIATED_TOKEN_PROGRAM_ID //
      );

      const [vaultTokenAccount] = await PublicKey.findProgramAddress(
        [Buffer.from("token_account"), vaultPda.toBuffer()],
        program.programId
      );

      const amount = new anchor.BN(parseFloat(depositAmount) * 1e6); // Convert to USDC decimals

      const tx = await (program as any).methods.deposit(amount)
        .accounts({
          owner: publicKey,
          vault: vaultPda,
          userTokenAccount,
          vaultTokenAccount,
          usdcMint: USDC_MINT,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .transaction();

      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      setStatus(`Deposited ${depositAmount} USDC into the vault.`);
    } catch (error) {
      console.error("Error depositing:", error);
      setStatus(`Error depositing: ${error as Error}`);
    }
  };

  const withdraw = async () => {
    if (!publicKey || !program) return;

    let signature: string | undefined; // Declare signature in this scope

    try {
      const [vaultPda] = await PublicKey.findProgramAddress(
        [Buffer.from("vault"), publicKey.toBuffer()],
        program.programId
      );

      const userTokenAccount = await getAssociatedTokenAddress(
        USDC_MINT, // Mint address (the token)
        publicKey, // Wallet's public key (owner of the token account)
        false, // Is it a multisig? Usually false.
        TOKEN_PROGRAM_ID, // Token program ID
        ASSOCIATED_TOKEN_PROGRAM_ID //
      );

      const [vaultTokenAccount] = await PublicKey.findProgramAddress(
        [Buffer.from("token_account"), vaultPda.toBuffer()],
        program.programId
      );

      const amount = new anchor.BN(parseFloat(withdrawAmount) * 1e6); // Convert to USDC decimals

      const instruction = await (program as any).methods.withdraw(amount)
        .accounts({
          owner: publicKey,
          vault: vaultPda,
          userTokenAccount,
          vaultTokenAccount,
          usdcMint: USDC_MINT,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .instruction();

      const transaction = new Transaction().add(instruction);
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      transaction.feePayer = publicKey;

      const signature = await sendTransaction(transaction, connection);
      console.log(`Transaction sent: ${signature}`);

      const confirmation = await connection.confirmTransaction(signature, 'confirmed');
      console.log(`Confirmation:`, confirmation);

      if (confirmation.value.err) {
        throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
      }

      setStatus(`Successfully withdrawn ${withdrawAmount} USDC from the vault. Transaction: ${signature}`);
    } catch (error) {
      console.error("Error withdrawing:", error);

      // If signature is defined, log the transaction details
      if (signature) {
        const logs = await connection.getConfirmedTransaction(signature, 'confirmed'); // Use appropriate finality
        if (logs && logs.meta) {
          console.log(logs.meta.logMessages);
        }
      }

      if (error instanceof anchor.ProgramError) {
        setStatus(`Program error during withdrawal: ${error.msg} (Code: ${error.code})`);
      } else if (error instanceof Error) {
        setStatus(`Error withdrawing: ${error.message}`);
      } else {
        setStatus(`Unknown error during withdrawal`);
      }
    }
  };



  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-4 lg:px-6">
            <div className="px-4 py-6 sm:px-2">
              <div>
                <div className="text-center">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">USDC Vault</h1>
                </div>
                {publicKey && (
                  <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-sm md:max-w-md lg:max-w-lg text-center mx-auto">
                    <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                      {isDepositing ? "Deposit" : "Withdraw"}
                    </h2>
                    <button
                      onClick={toggleMode}
                      className="text-blue-500 hover:underline mb-3 md:mb-4"
                    >
                      {isDepositing ? "Switch to Withdraw" : "Switch to Deposit"}
                    </button>
                    <div className="flex flex-col space-y-3 md:space-y-4">
                      {/* Initialize Vault Button */}
                      <button
                        onClick={initializeVault}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                      >
                        Initialize Vault
                      </button>

                      {/* Deposit Input Field */}
                      {isDepositing && (
                        <>
                          <input
                            type="number"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            placeholder="Amount to deposit"
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                          />
                          <div className="flex space-x-2 justify-center">
                            <button
                              onClick={() => setPercentage(25)}
                              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md"
                            >
                              25%
                            </button>
                            <button
                              onClick={() => setPercentage(50)}
                              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md"
                            >
                              50%
                            </button>
                            <button
                              onClick={() => setPercentage(100)}
                              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md"
                            >
                              100%
                            </button>
                          </div>
                          <button
                            onClick={deposit}
                            className={`bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ${!depositAmount ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!depositAmount}
                          >
                            Deposit USDC
                          </button>
                        </>
                      )}

                      {/* Withdraw Input Field */}
                      {!isDepositing && (
                        <>
                          <input
                            type="number"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            placeholder="Amount to withdraw"
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                          />
                          <div className="flex space-x-2 justify-center">
                            <button
                              onClick={() => setPercentage(25)}
                              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md"
                            >
                              25%
                            </button>
                            <button
                              onClick={() => setPercentage(50)}
                              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md"
                            >
                              50%
                            </button>
                            <button
                              onClick={() => setPercentage(100)}
                              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md"
                            >
                              100%
                            </button>
                          </div>
                          <button
                            onClick={withdraw}
                            className={`bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ${!withdrawAmount ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!withdrawAmount}
                          >
                            Withdraw USDC
                          </button>
                        </>
                      )}
                    </div>
                    <p className="mt-4 text-sm">{status}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>


  );
};

export default USDCVaultComponent;