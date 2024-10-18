import { Connection, PublicKey, ParsedAccountData, LAMPORTS_PER_SOL } from '@solana/web3.js';
import valdemologo from "../utils/images/vallogo.jpg";

const STAKE_PROGRAM_PK = new PublicKey('Stake11111111111111111111111111111111111111');

const WALLET_OFFSET = 44;
const DATA_SIZE = 200;

export interface ValidatorMetadata {
    name: string;
    image: string;
    apy: number | null;
}

export interface StakeAccountInfo {
    pubkey: string;
    balance: number;
    delegation: string | null;
    validatorMetadata: ValidatorMetadata | null;
}

const fetchValidatorMetadata = async (voterAddress: string): Promise<ValidatorMetadata> => {
    console.log(`Fetching metadata for validator: ${voterAddress}`);
    try {
        const response = await fetch(`https://api.stakingmetadata.com/validators/${voterAddress}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch validator metadata for ${voterAddress}, status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Received data for validator ${voterAddress}:`, data);

        return {
            name: data.name || 'Validator',
            image: data.image || valdemologo,
            apy: data.apy ?? null,
        };
    } catch (error) {
        console.error(`Error fetching metadata for validator ${voterAddress}:`, error);
        return {
            name: 'Validaror',
            image: valdemologo,
            apy: null,
        };
    }
};


export const getStakeAccounts = async (connection: Connection, walletPubkey: string): Promise<StakeAccountInfo[]> => {
    const accounts = await connection.getParsedProgramAccounts(
        STAKE_PROGRAM_PK,
        {
            filters: [
                { dataSize: DATA_SIZE },
                { memcmp: { offset: WALLET_OFFSET, bytes: walletPubkey } },
            ]
        }
    );

    console.log(`Found ${accounts.length} stake accounts for wallet ${walletPubkey}`);

    const stakeAccounts = await Promise.all(accounts.map(async ({ pubkey, account }) => {
        const delegation = (account.data as ParsedAccountData).parsed?.info?.stake?.delegation?.voter || null;
        console.log(`Stake account ${pubkey.toString()} delegation:`, delegation);

        let validatorMetadata: ValidatorMetadata | null = null;

        if (delegation) {
            validatorMetadata = await fetchValidatorMetadata(delegation);
            console.log(`Validator metadata for ${delegation}:`, validatorMetadata);
        } else {
            console.log(`No delegation found for stake account ${pubkey.toString()}`);
        }

        return {
            pubkey: pubkey.toString(),
            balance: account.lamports / LAMPORTS_PER_SOL,
            delegation,
            validatorMetadata,
        };
    }));

    console.log('Processed stake accounts:', stakeAccounts);
    return stakeAccounts;
};