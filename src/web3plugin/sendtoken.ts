// import { Connection, PublicKey, Transaction } from '@solana/web3.js';
// import {
//   getOrCreateAssociatedTokenAccount,
//   createTransferInstruction,
//   TOKEN_PROGRAM_ID,
//   getAssociatedTokenAddress,
//   createAssociatedTokenAccountInstruction
// } from '@solana/spl-token';

// export interface Token {
//   address: string;
//   name: string;
//   mint: string;
// }

// export const tokenList: Tokenlist[] = [
//   { address: 'address1', name: 'USDC', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
//   { address: 'address2', name: 'USDT', mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB' },
//   { address: 'address3', name: 'pyUSDC', mint: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU' },
// ];

// export const connection = new Connection('https://devnet.helius-rpc.com/?api-key=4c4a4f43-145d-4406-b89c-36ad977bb738', 'confirmed');

// export async function sendSplToken(
//   wallet: any,
//   selectedToken: Token,
//   receiverAddress: string,
//   amount: string
// ): Promise<string> {
//   if (!wallet.publicKey || !wallet.signTransaction) {
//     throw new Error('Wallet not connected');
//   }

//   const mintPublicKey = new PublicKey(selectedToken.mint);
//   const receiverPublicKey = new PublicKey(receiverAddress);

//   const senderATA = await getAssociatedTokenAddress(mintPublicKey, wallet.publicKey);
//   const receiverATA = await getAssociatedTokenAddress(mintPublicKey, receiverPublicKey);

//   const transaction = new Transaction();

//   // Check if receiver's token account exists, if not, create it
//   const receiverAccount = await connection.getAccountInfo(receiverATA);
//   if (!receiverAccount) {
//     transaction.add(
//       createAssociatedTokenAccountInstruction(
//         wallet.publicKey, // payer
//         receiverATA, // associatedToken
//         receiverPublicKey, // owner
//         mintPublicKey // mint
//       )
//     );
//   }

//   // Add transfer instruction
//   transaction.add(
//     createTransferInstruction(
//       senderATA,
//       receiverATA,
//       wallet.publicKey,
//       BigInt(parseFloat(amount) * 1e6), // Convert to token's decimal places (assuming 6 decimals)
//       [],
//       TOKEN_PROGRAM_ID
//     )
//   );

//   // Sign and send transaction
//   const signedTransaction = await wallet.signTransaction(transaction);
//   const signature = await connection.sendRawTransaction(signedTransaction.serialize());
//   await connection.confirmTransaction(signature, 'confirmed');

//   return signature;
// }