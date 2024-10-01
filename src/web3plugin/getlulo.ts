import { useState, useEffect } from 'react';

interface Balance {
  currency: string;
  amount: number;
}

interface DepositInfo {
  currentOrders: number;
  totalValue: number;
  interestEarned: number;
  realtimeAPY: number;
  balances: number;
}

const useDepositInfo = (wallet: string | null) => {
  const [depositInfo, setDepositInfo] = useState<DepositInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepositInfo = async () => {
      if (!wallet) {
        setDepositInfo(null);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const apiKey =  '47133b70-e9ee-4ebf-af1c-c08f92217055';
        
        console.log('Fetching data for wallet:', wallet);
        console.log('API Key:', apiKey);

        const response = await fetch('/api/account', {
          method: 'GET',
          headers: {
            'x-wallet-pubkey': wallet,
            'x-api-key': apiKey,
          },
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API response error:', errorText);
          throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }

        const data: Partial<DepositInfo> = await response.json();
        console.log('Fetched data:', data);

        // Set default values for missing fields
        setDepositInfo({
          currentOrders: data.currentOrders || 0,
          totalValue: data.totalValue || 0,
          interestEarned: data.interestEarned || 0,
          realtimeAPY: data.realtimeAPY || 0,
          balances: data.balances || 0,
        });
      } catch (error) {
        console.error('Error details:', error);
        if (error instanceof Error) {
          console.error('Error message:', error.message);
          console.error('Error stack:', error.stack);
        }
        setError('Failed to fetch deposit information. Please check the console for more details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepositInfo();
  }, [wallet]);

  return { depositInfo, isLoading, error };
};

export default useDepositInfo;
export type { DepositInfo, Balance };
