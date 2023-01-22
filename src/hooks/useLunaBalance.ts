import { useQuery } from '@tanstack/react-query';
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { z } from 'zod';
import { queryKeys } from '~/hooks/queryKeys';

export function useLunaBalance() {
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();

	if (!connectedWallet) {
		throw new Error("Can't get balance without connected wallet");
	}

	return useQuery({
		queryKey: queryKeys.balanceLuna(connectedWallet.walletAddress),
		queryFn: async () => {
			const [coins] = await lcd.bank.balance(connectedWallet.walletAddress);

			return { balance: coins.get('uluna')?.amount.toString() };
		},
	});
}
