import { Connection, PublicKey } from '@solana/web3.js';
import { programs } from '@metaplex/js';

const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=4c4a4f43-145d-4406-b89c-36ad977bb738');
const { metadata: { Metadata } } = programs;

export interface NFTMetadata {
  image: string;
  name: string;
  symbol: string;
  mintAddress: string;
}

export async function getNFTsForWallet(walletAddress: string): Promise<NFTMetadata[]> {
  try {
    const publicKey = new PublicKey(walletAddress);

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
    });

    const nftAddresses = tokenAccounts.value
      .filter(tokenAccount => tokenAccount.account.data.parsed.info.tokenAmount.amount === '1')
      .map(tokenAccount => tokenAccount.account.data.parsed.info.mint);

    const nftDataPromises = nftAddresses.map(async (mint) => {
      try {
        const pda = await Metadata.getPDA(new PublicKey(mint));
        const metadata = await Metadata.load(connection, pda);
        
        // Log the URI to check if it's correct
        console.log(`Fetching metadata from URI: ${metadata.data.data.uri}`);

        // Fetch the actual metadata
        const metadataResponse = await fetchMetadata(metadata.data.data.uri);
        
        if (metadataResponse) {
          return {
            ...metadataResponse,
            mintAddress: mint
          };
        } else {
          console.error('Error fetching NFT metadata:', metadata.data.data.uri);
          return null;
        }
      } catch (error) {
        console.error('Non-Metaplex NFT or error:', error);
        return null;
      }
    });

    const nfts = await Promise.all(nftDataPromises);
    return nfts.filter((nft): nft is NFTMetadata => nft !== null);
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return [];
  }
}

export async function fetchMetadata(uri: string): Promise<NFTMetadata | null> {
  try {
    const response = await fetch(uri);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const metadata = await response.json();
    return {
      image: metadata.image,
      name: metadata.name,
      symbol: metadata.symbol,
      mintAddress: '' // This will be populated later
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return null;
  }
}
